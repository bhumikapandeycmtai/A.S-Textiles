import React from 'react';

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

interface OrderListProps {
  orders: Order[];
  onDeleteOrder: (id: string) => void; // Assuming you'll add this functionality
}

const OrderList: React.FC<OrderListProps> = ({ orders, onDeleteOrder }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phno</th>
            <th className="p-3">Message</th>
            <th className="p-3">Category</th>
            <th className="p-3">Title</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((form) => (
            <tr key={form.id} className="border-b">
              <td className="p-3">{form.name}</td>
              <td className="p-3">{form.email}</td>
              <td className="p-3">{form.phno}</td>
              <td className="p-3">{form.message}</td>
              <td className="p-3">{form.category}</td>
              <td className="p-3">{form.title}</td>
              <td className="p-3">{form.quantity}</td>
              <td className='flex items-center justify-center p-3'>
                <button
                  className='bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700'
                  onClick={() => onDeleteOrder(form.id)} // Implement this in AdminDashboard
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={8} className="p-3 text-center text-gray-600">No orders to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;