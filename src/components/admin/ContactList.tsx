import React from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phno: number;
  message: string;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b">
              <td className="p-3">{contact.name}</td>
              <td className="p-3">{contact.email}</td>
              <td className="p-3">{contact.phno}</td>
              <td className="p-3">{contact.message}</td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-600">No contact messages.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;