import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. REMOVE react-hot-toast and IMPORT YOUR CUSTOM TOAST ---
// Make sure the path to your Toast component is correct
import Toast from '@/components/toast'; // Assuming you place it in a common components folder

import Sidebar from '@/components/admin/Dashboard/Sidebar';
import ProductView from '@/components/admin/Dashboard/ProductView';
import ContactView from '@/components/admin/Dashboard/ContactView';
import OrderView from '@/components/admin/Dashboard/OrderView';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'product' | 'orders' | 'contacts'>('product');

  // --- 2. ADD STATE TO MANAGE THE TOAST ---
  const [toastState, setToastState] = useState({
    show: false,
    message: '',
    success: true,
  });

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // NOTE: A success toast here won't be visible because the component
      // unmounts immediately when `isAuthenticated` becomes true.
    } else {
      // --- 3. TRIGGER THE TOAST ON FAILED LOGIN ---
      setToastState({
        show: true,
        message: 'Invalid credentials. Please try again.',
        success: false, // This will make the toast red
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };
  
  // A handler to close the toast, which will be passed as a prop
  const handleCloseToast = () => {
    setToastState(prev => ({ ...prev, show: false }));
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* --- 4. RENDER YOUR CUSTOM TOAST COMPONENT --- */}
        <Toast
          show={toastState.show}
          message={toastState.message}
          success={toastState.success}
          onClose={handleCloseToast}
        />

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-6" placeholder="Password" required />
            <button type="submit" className="w-full bg-olive text-white py-2 rounded hover:bg-olive-dark">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // The rest of your authenticated view remains the same
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-lg md:text-2xl font-bold text-black">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="relative pt-32 md:pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
           {activeTab === 'product' && <ProductView />}
           {activeTab === 'orders' && <OrderView />}
           {activeTab === 'contacts' && <ContactView />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;