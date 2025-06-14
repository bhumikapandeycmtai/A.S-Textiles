import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { Edit, Save, X } from 'lucide-react';
// import DeleteModal from './DeleteModal'; // Kept for future use if needed

// --- START: Updated Type Definitions ---
type ContactStatus = 'new' | 'contacted';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: number | string; // Using string is safer for different formats
  message: string;
  timestamp: string; // Required for sorting
  status?: ContactStatus; // Make optional to handle old data gracefully
}
// --- END: Updated Type Definitions ---


// --- Reusable Helper Component for the status badge ---
const StatusBadge = ({ status }: { status?: ContactStatus }) => {
  const currentStatus = status || 'new'; 
  
  const statusStyles: Record<ContactStatus, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span 
      className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize whitespace-nowrap ${statusStyles[currentStatus]}`}
    >
      {currentStatus}
    </span>
  );
};


const ContactView = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContent, setSelectedContent] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- START: New state for editing and toasts (like OrderView) ---
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [currentEditStatus, setCurrentEditStatus] = useState<ContactStatus>('new');
  const { toast } = useToast();
  // --- END: New state ---

  useEffect(() => {
    fetchContacts();
  }, []);

  // --- Custom sorting function ---
  const sortContacts = (data: Contact[]): Contact[] => {
    const statusOrder: Record<ContactStatus, number> = { new: 0, contacted: 1 };
    
    return data.sort((a, b) => {
      const statusA = a.status || 'new';
      const statusB = b.status || 'new';
      
      if (statusOrder[statusA] < statusOrder[statusB]) return -1;
      if (statusOrder[statusA] > statusOrder[statusB]) return 1;

      // If statuses are the same, sort by newest timestamp
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  };

  async function fetchContacts() {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/contacts/getallContacts`);
      const data = response.data.data;
      if (Array.isArray(data)) {
        // Filter out any bad data and then sort
        const validData = data.filter(contact => contact && contact.id && contact.timestamp);
        const sortedData = sortContacts(validData);
        setContacts(sortedData);
      } else {
        console.error('API did not return an array:', data);
        setError('Unexpected response format from the server.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch contacts.');
    } finally {
      setLoading(false);
    }
  }

  // --- START: Handlers for editing status ---
  const handleEditClick = (contact: Contact) => {
    setEditingContactId(contact.id);
    setCurrentEditStatus(contact.status || 'new');
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
  };

  const handleSaveStatus = async (contactId: string) => {
    try {
      // Best practice: Use PATCH for partial updates.
      // Assumes an endpoint like PATCH /v1/contacts/updateContact/:id
      const contactToUpdate = contacts.find((contact)=>contact.id ===contactId)
      const updatedData = {
        ...contactToUpdate,
        status: currentEditStatus
      }
      await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/v1/contacts/updateContact/${contactId}`, updatedData);

      // Update local state for immediate feedback
      const updatedContacts = contacts.map(contact => 
        contact.id === contactId ? { ...contact, status: currentEditStatus } : contact
      );

      setContacts(sortContacts(updatedContacts)); // Re-sort the list
      setEditingContactId(null); // Exit editing mode

      toast({
        title: "Status Updated",
        description: "The contact status has been changed successfully.",
      });

    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update the contact status. Please try again.",
        variant: "destructive",
      });
    }
  };
  // --- END: Handlers for editing status ---


  if (selectedContent) {
    return <ViewContact contact={selectedContent} onBack={() => setSelectedContent(null)} />;
  }

  return (
    <div className="p-4 sm:p-6">
       <h2 className="text-2xl text-black font-bold mb-4">Contact Messages</h2>
      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center py-4 text-red-600 bg-red-100 border border-red-400 rounded-md">{error}</p>}
      
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3 font-semibold text-gray-600">Name</th>
                <th className="p-3 font-semibold text-gray-600 hidden md:table-cell">Contact Info</th>
                <th className="p-3 font-semibold text-gray-600 hidden lg:table-cell">Message</th>
                <th className="p-3 font-semibold text-gray-600 text-center">Status</th>
                <th className="p-3 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="p-3 align-middle">
                      <p className="font-bold text-gray-900">{contact.name}</p>
                      <p className="text-gray-500 md:hidden">{contact.email}</p>
                    </td>
                    <td className="p-3 hidden md:table-cell align-middle">
                        <p className="text-gray-800">{contact.email}</p>
                        <p className="text-gray-500">{contact.phone}</p>
                    </td>
                    <td className="p-3 hidden lg:table-cell align-middle">
                      <p className="text-gray-600 truncate max-w-xs">{contact.message || '—'}</p>
                    </td>
                    <td className="p-3 text-center align-middle">
                      {editingContactId === contact.id ? (
                        <select
                          value={currentEditStatus}
                          onChange={(e) => setCurrentEditStatus(e.target.value as ContactStatus)}
                          className="w-full min-w-[120px] p-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                        </select>
                      ) : (
                        <StatusBadge status={contact.status} />
                      )}
                    </td>
                    <td className="p-3 text-center align-middle">
                      {editingContactId === contact.id ? (
                        <div className="flex justify-center items-center gap-2">
                          <button onClick={() => handleSaveStatus(contact.id)} className="p-1.5 rounded-md text-green-600 hover:bg-green-100"><Save size={18} /></button>
                          <button onClick={handleCancelEdit} className="p-1.5 rounded-md text-red-600 hover:bg-red-100"><X size={18} /></button>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => setSelectedContent(contact)}
                            className="bg-olive text-white text-xs py-1 px-3 rounded-md whitespace-nowrap"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditClick(contact)}
                            className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200"
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- ViewContact Sub-component (No changes needed) ---
const ViewContact = ({ contact, onBack }: { contact: Contact; onBack: () => void }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Details</h2>
        <button
          className="mt-4 sm:mt-0 px-4 py-2 bg-olive text-white rounded-lg transition flex gap-2 items-center justify-center"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name</label>
            <div className="text-lg font-medium">{contact.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <div className="text-lg font-medium">{contact.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <div className="text-lg font-medium">{contact.phone}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Message</label>
            <div className="text-lg text-gray-800 whitespace-pre-wrap">{contact.message}</div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-50 border rounded-xl p-6 shadow-sm w-full">
          <div className="w-24 h-24 bg-gray-200 text-olive rounded-full flex items-center justify-center text-3xl font-bold mb-4">
            {contact.name?.[0]?.toUpperCase() ?? 'C'}
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">{contact.name}</p>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;