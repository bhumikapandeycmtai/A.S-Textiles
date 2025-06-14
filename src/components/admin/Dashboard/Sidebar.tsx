import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'product' | 'orders' | 'contacts') => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    // This <aside> is now ALWAYS fixed, but its position and shape change.
    <aside
      className={`
        left-0 right-0 z-20
        bg-white/95 backdrop-blur-sm border-b md:border-b-0 md:border-r
        
        // --- MOBILE STYLES: A horizontal bar fixed below the header (top-16 = 4rem, header height)
        top-16
        p-2 flex flex-row gap-2 overflow-x-auto

        // --- DESKTOP STYLES (md: prefix overrides mobile styles)
        md:top-0
        md:w-64
        md:right-auto
        md:h-screen
        md:flex-col
        md:p-4
        md:pt-20 // Push content below the header
      `}
    >
      <h2 className="text-lg font-semibold shrink-0 mb-0 md:mb-2 text-gray-700 whitespace-nowrap self-center">
        Dashboard
      </h2>

      <button
        onClick={() => setActiveTab('product')}
        className={`md:w-full text-sm md:text-base text-left p-2 rounded whitespace-nowrap shrink-0 ${
          activeTab === 'product'
            ? 'bg-olive text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Products
      </button>

      <button
        onClick={() => setActiveTab('orders')}
        className={`md:w-full text-sm md:text-base text-left p-2 rounded whitespace-nowrap shrink-0 ${
          activeTab === 'orders'
            ? 'bg-olive text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Orders
      </button>

      <button
        onClick={() => setActiveTab('contacts')}
        className={`md:w-full text-sm md:text-base text-left p-2 rounded whitespace-nowrap shrink-0 ${
          activeTab === 'contacts'
            ? 'bg-olive text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Contact
      </button>
    </aside>
  );
};

export default Sidebar;