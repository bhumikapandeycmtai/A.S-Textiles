import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="md:w-64 bg-white border rounded p-4 flex md:flex-col gap-2">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Dashboard</h2>
      <button
        onClick={() => setActiveTab('product')}
        className={`w-full py-2 rounded ${
          activeTab === 'product' ? 'bg-olive text-white' : 'hover:bg-gray-100'
        }`}
      >
        Products
      </button>
      <button
        onClick={() => setActiveTab('orders')}
        className={`w-full py-2 rounded ${
          activeTab === 'orders' ? 'bg-olive text-white' : 'hover:bg-gray-100'
        }`}
      >
        Orders
      </button>
      <button
        onClick={() => setActiveTab('contacts')}
        className={`w-full py-2 rounded ${
          activeTab === 'contacts' ? 'bg-olive text-white' : 'hover:bg-gray-100'
        }`}
      >
        Contact
      </button>
    </aside>
  );
};

export default Sidebar;