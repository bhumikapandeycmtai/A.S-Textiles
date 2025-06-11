import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from '@/components/toast';
import DeleteModal from './DeleteModal';

interface Contact {
  id: string;
  name: string;
  email: string;
  phno: number;
  message: string;
}

const ContactView = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContent, setSelectedContent] = useState<Contact | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const response = await axios.get('https://a-s-textiles.vercel.app/v1/contacts/getallContacts');
      const data = response.data.data;
      setContacts(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  const openDeleteModal = (id: string) => {
    setDeleteContactId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteContactId('');
    setDeleteModalOpen(false);
  };

  async function confirmDeleteItem() {
    if (!deleteContactId) return;
    try {
      await axios.delete(`https://a-s-textiles.vercel.app/v1/contacts/deleteContact/${deleteContactId}`);
      setToastMessage('Contact deleted successfully.');
      setToastSuccess(true);
      setShowToast(true);
      closeDeleteModal();
      await fetchContacts();
    } catch (error) {
      console.error('Failed to delete contact:', error);
      setToastMessage('Failed to delete contact.');
      setToastSuccess(false);
      setShowToast(true);
    }
  }

  if (selectedContent) {
    return <ViewContact contact={selectedContent} onBack={() => setSelectedContent(null)} />;
  }

  return (
    <div className="overflow-x-auto">
      <Toast
        message={toastMessage}
        show={showToast}
        success={toastSuccess}
        onClose={() => setShowToast(false)}
      />

      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Message</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.email}</td>
                <td className="p-3">{contact.phno}</td>
                <td className="p-3">{contact.message}</td>
                <td>
                  <button
                    className="text-green-600 hover:text-green-700 mr-2"
                    onClick={() => setSelectedContent(contact)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => openDeleteModal(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteItem}
        itemName={contacts.find((c) => c.id === deleteContactId)?.name || 'this contact'}
      />
    </div>
  );
};

const ViewContact = ({ contact, onBack }: { contact: Contact; onBack: () => void }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Details</h2>
        <button
          className="mt-4 sm:mt-0 px-4 py-2 bg-olive text-white rounded-lg transition flex gap-2 items-center justify-center"
          onClick={onBack}
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
            <div className="text-lg font-medium">{contact.phno}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Message</label>
            <div className="text-lg text-gray-800">{contact.message}</div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-50 border rounded-xl p-6 shadow-sm w-full">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
            {contact.name[0].toUpperCase()}
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
