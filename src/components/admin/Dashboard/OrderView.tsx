import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  id: string;
  name: string;
  email: string;
  phno: number;
  message: string;
  category: string;
  title: string;
  quantity: number;
}

const OrderView = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // ✅ Track selected order
  const [showOrder, setShowOrder] = useState(false)

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/product-leads/getallProductLeads`);
      const data = response.data.data;

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setError('Unexpected response format from server.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render detailed view of one product lead
  if (selectedOrder) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Product Lead Details</h2>
        <button
            type="button"
            className="bg-olive text-sm text-white px-2 py-1 rounded hover:bg-olive-dark flex items-center gap-1"
            onClick={()=>setSelectedOrder(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.phno}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.category}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Title</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Quantity</p>
          <p className="text-base font-medium text-gray-900">{selectedOrder.quantity}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Message</p>
        <p className="text-base text-gray-800">{selectedOrder.message || '—'}</p>
      </div>
    </div>
  );
}


  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl text-black font-bold mb-4">Product Leads</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Category</th>
            <th className="p-3">Title</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-3">{order.name}</td>
              <td className="p-3">{order.email}</td>
              <td className="p-3">{order.phno}</td>
              <td className="p-3">{order.category}</td>
              <td className="p-3">{order.title}</td>
              <td className="p-3">{order.quantity}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-olive text-white py-1 px-2 rounded-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;
