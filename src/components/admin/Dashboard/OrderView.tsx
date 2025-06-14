import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp, Edit, Save, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type LeadStatus = 'new' | 'contacted' | 'completed';

// Replaced 'area' with optional 'height' and 'width' fields
interface AddOnProduct {
  id: string;
  category: string;
  quantity: number;
  title: string;
  height?: string;
  width?: string;
  dimension?: string;
}

interface LeadDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ProductLead {
  id: string;
  leadDetails?: LeadDetails; 
  addOnProducts: AddOnProduct[];
  timestamp: string;
  status: LeadStatus;
}
// --- END: Type Definitions ---

const StatusBadge = ({ status }: { status?: LeadStatus }) => {
  const currentStatus = status || 'new'; 
  const statusStyles: Record<LeadStatus, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };
  return (<span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize whitespace-nowrap ${statusStyles[currentStatus]}`}>{currentStatus}</span>);
};

// --- ADDED: Helper function to format dimensions ---
const formatDimensions = (height?: string, width?: string, unit?: string) => {
    if (!height || !width || height === '0' || width === '0') return '—';
    const unitLabel = unit === 'sqfeet' ? 'sq. ft.' : (unit === 'sqmeter' ? 'sq. m.' : (unit || ''));
    return `${height} x ${width} ${unitLabel}`.trim();
};

const OrderView = () => {
  const [orders, setOrders] = useState<ProductLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ProductLead | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [currentEditStatus, setCurrentEditStatus] = useState<LeadStatus>('new');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const sortOrders = (leads: ProductLead[]): ProductLead[] => {
    const statusOrder: Record<LeadStatus, number> = { new: 0, contacted: 1, completed: 2 };
    return leads.sort((a, b) => {
      const statusA = a.status || 'new';
      const statusB = b.status || 'new';
      if (statusOrder[statusA] < statusOrder[statusB]) return -1;
      if (statusOrder[statusA] > statusOrder[statusB]) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/product-leads/getallProductLeads`);
      const data = response.data.data;
      if (Array.isArray(data)) {
        const validData = data.filter(order => order && order.id);
        const sortedData = sortOrders(validData);
        setOrders(sortedData);
      } else { setError('Unexpected response format from the server.'); }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError('Failed to fetch orders.');
    } finally { setLoading(false); }
  };

  const handleToggleExpand = (orderId: string) => setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  const handleEditClick = (order: ProductLead) => { setEditingOrderId(order.id); setCurrentEditStatus(order.status || 'new'); };
  const handleCancelEdit = () => setEditingOrderId(null);

  const handleSaveStatus = async (orderId: string) => {
    try {
      const orderToUpdate = orders.find(order => order.id === orderId);
      await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/v1/product-leads/updateProductLead/${orderId}`, { ...orderToUpdate, status: currentEditStatus });
      const updatedOrders = orders.map(order => order.id === orderId ? { ...order, status: currentEditStatus } : order);
      setOrders(sortOrders(updatedOrders));
      setEditingOrderId(null);
      toast({ title: "Status Updated", description: "The lead status has been successfully changed." });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({ title: "Update Failed", description: "Could not update the lead status.", variant: "destructive" });
    }
  };

  // --- START: DETAILED VIEW (MODIFIED) ---
  if (selectedOrder) {
    return (
      <div className=" mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg animate-fade-in">
        <div className="flex justify-between items-center border-b pb-3 mb-4"><h2 className="text-xl sm:text-2xl font-bold text-gray-800">Lead Details</h2><button type="button" className="bg-gray-700 text-sm text-white px-3 py-1.5 rounded-md hover:bg-gray-800 flex items-center gap-1 transition-colors" onClick={() => setSelectedOrder(null)}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>Back</button></div>
        <div className="space-y-4 mb-6"><h3 className="text-lg font-semibold text-gray-700">Contact Information</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4 border rounded-lg bg-gray-50"><div><p className="text-xs text-gray-500">Name</p><p className="font-medium text-gray-900">{selectedOrder.leadDetails?.name ?? 'N/A'}</p></div><div><p className="text-xs text-gray-500">Email</p><p className="font-medium text-gray-900">{selectedOrder.leadDetails?.email ?? 'N/A'}</p></div><div><p className="text-xs text-gray-500">Phone</p><p className="font-medium text-gray-900">{selectedOrder.leadDetails?.phone ?? 'N/A'}</p></div></div><div><p className="text-xs text-gray-500">Message</p><p className="text-gray-800 mt-1 whitespace-pre-wrap">{selectedOrder.leadDetails?.message || '—'}</p></div></div>
        <div className="space-y-3"><h3 className="text-lg font-semibold text-gray-700">Products in this Lead</h3>
          {selectedOrder.addOnProducts?.length > 0 ? (
            selectedOrder.addOnProducts.map((product) => (
              <div key={product.id} className="border p-3 rounded-lg flex justify-between items-center">
                <div><p className="font-bold text-gray-900">{product.title}</p><p className="text-sm text-gray-600">{product.category}</p>
                  {(product.height && product.width) && <p className="text-sm text-gray-500 mt-1">Dimensions: {formatDimensions(product.height, product.width, product.dimension)}</p>}
                </div>
                <div className="text-right"><p className="text-sm text-gray-500">Quantity</p><p className="font-bold text-lg text-gray-900">{product.quantity}</p></div>
              </div>
            ))
          ) : (<p className="text-gray-500">No additional products were included in this lead.</p>)}
        </div>
      </div>
    );
  }
  // --- END: DETAILED VIEW ---

  // Main Table View
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl text-black font-bold mb-4">Product Leads</h2>
      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center py-4 text-red-600 bg-red-100 border border-red-400 rounded-md">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border shadow-sm"><table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr className="text-left"><th className="p-3 font-semibold text-gray-600">Customer</th><th className="p-3 font-semibold text-gray-600 hidden md:table-cell">Contact</th><th className="p-3 font-semibold text-gray-600 hidden lg:table-cell">Message</th><th className="p-3 font-semibold text-gray-600 text-center">Products</th><th className="p-3 font-semibold text-gray-600 text-center">Status</th><th className="p-3 font-semibold text-gray-600 text-center">Actions</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">{orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 align-middle"><p className="font-bold text-gray-900">{order.leadDetails?.name ?? 'Data Missing'}</p><p className="text-gray-500 md:hidden">{order.leadDetails?.email ?? 'N/A'}</p></td>
                    <td className="p-3 hidden md:table-cell align-middle"><p className="text-gray-800">{order.leadDetails?.email ?? 'N/A'}</p><p className="text-gray-500">{order.leadDetails?.phone ?? 'N/A'}</p></td>
                    <td className="p-3 hidden lg:table-cell align-middle"><p className="text-gray-600 truncate max-w-xs">{order.leadDetails?.message || '—'}</p></td>
                    <td className="p-3 text-center align-middle"><span className="bg-gray-200 text-gray-800 font-bold py-1 px-2.5 rounded-full">{order.addOnProducts?.length ?? 0}</span></td>
                    <td className="p-3 text-center align-middle">{editingOrderId === order.id ? (<select value={currentEditStatus} onChange={(e) => setCurrentEditStatus(e.target.value as LeadStatus)} className="w-full min-w-[120px] p-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"><option value="new">New</option><option value="contacted">Contacted</option><option value="completed">Completed</option></select>) : ( <StatusBadge status={order.status} /> )}</td>
                    <td className="p-3 text-center align-middle">{editingOrderId === order.id ? (<div className="flex justify-center items-center gap-2"><button onClick={() => handleSaveStatus(order.id)} className="p-1.5 rounded-md text-green-600 hover:bg-green-100"><Save size={18} /></button><button onClick={handleCancelEdit} className="p-1.5 rounded-md text-red-600 hover:bg-red-100"><X size={18} /></button></div>) : (<div className="flex justify-center items-center gap-2"><button onClick={() => setSelectedOrder(order)} className="bg-olive text-white text-xs py-1 px-3 rounded-md whitespace-nowrap">View</button><button onClick={() => handleEditClick(order)} className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200"><Edit size={16} /></button>{order.addOnProducts?.length > 0 && (<button onClick={() => handleToggleExpand(order.id)} className="p-1.5 rounded-md hover:bg-gray-200">{expandedOrderId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>)}</div>)}</td>
                  </tr>
                  {/* --- START: EXPANDED VIEW TABLE (MODIFIED) --- */}
                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50"><td colSpan={6} className="p-4"><div className='animate-fade-in'><h4 className="font-semibold mb-2 text-gray-700">Products in this Order:</h4><table className="min-w-full text-sm bg-white rounded-md shadow-inner">
                        <thead className='bg-gray-100'><tr className='text-left'><th className='p-2 font-medium text-gray-600'>Title</th><th className='p-2 font-medium text-gray-600'>Category</th><th className='p-2 font-medium text-gray-600 text-center'>Quantity</th><th className='p-2 font-medium text-gray-600'>Dimensions</th></tr></thead>
                        <tbody>{order.addOnProducts?.map(product => (
                            <tr key={product.id} className='border-t'><td className='p-2'>{product.title}</td><td className='p-2'>{product.category}</td><td className='p-2 text-center font-semibold'>{product.quantity}</td><td className='p-2'>{formatDimensions(product.height, product.width, product.dimension)}</td></tr>
                        ))}</tbody>
                    </table></div></td></tr>
                  )}
                  {/* --- END: EXPANDED VIEW TABLE --- */}
                </React.Fragment>
              ))}</tbody>
          </table></div>
      )}
      {!loading && !error && orders.length === 0 && (<p className="text-center py-10 text-gray-500">No product leads found.</p>)}
    </div>
  );
};

export default OrderView;