// src/pages/AdminDashboard.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the new subcomponents
import Sidebar from '@/components/admin/Dashboard/Sidebar';
import ProductView from '@/components/admin/Dashboard/ProductView';
import ContactView from '@/components/admin/Dashboard/ContactView';
import OrderView from '@/components/admin/Dashboard/OrderView';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'product' | 'orders' | 'contacts'>('product');

  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  // Static data can remain here or be fetched from an API
  const contacts = [
    { id: '1', name: 'bhumika', email: 'bhumika@gmail.com', phno: 924525243, message: 'Hello I really liked the carpets I want to order 100 of these' },
    { id: '2', name: 'madhvi', email: 'madhvi@gmail.com', phno: 88675467, message: 'Hey want to colab with you for my new hotel' },
  ];


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // Login Form View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-6" placeholder="Password" required />
            <button className="w-full bg-olive text-white py-2 rounded hover:bg-olive-dark">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row gap-6">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 bg-white p-4 rounded shadow overflow-x-auto">
            {activeTab === 'product' && <ProductView />}
            {activeTab === 'orders' && <OrderView />}
            {activeTab === 'contacts' && <ContactView  />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;