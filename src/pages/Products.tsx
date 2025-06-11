import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import { Badge } from "@/components/ui/badge";
import React, { useState } from 'react';

// 1. TypeScript Type Definition for a Product (No changes)
interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

// 2. Dummy Product Array with Handloom Products (No changes)
const dummyProducts: Product[] = [
    {
    id: 'prod_h01',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Hand-Woven Jute Storage Basket',
    price: 45.00,
    category: 'Storage & Organization',
    shortDescription: 'Eco-friendly and stylish, this jute basket is perfect for organizing magazines, toys, or blankets. A touch of rustic charm for any room.',
    longDescription: 'Each basket is meticulously hand-woven by skilled artisans using natural, sustainable jute fibers. Its sturdy construction ensures it holds its shape, while the soft texture is safe for kids and pets. A perfect blend of functionality and natural beauty.',
    features: ['100% Natural Jute', 'Hand-Woven by Artisans', 'Sturdy & Durable', 'Eco-Friendly'],
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'prod_h02',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Bohemian Macrame Wall Art',
    price: 79.99,
    category: 'Wall Decor',
    shortDescription: 'Add a touch of bohemian elegance to your walls with this handcrafted macrame piece. Made from 100% natural cotton rope.',
    longDescription: 'This beautiful macrame wall hanging is designed to be a centerpiece. Its intricate knots and flowing tassels create a sense of calm and artistry, making it an ideal addition to a living room, bedroom, or nursery.',
    features: ['100% Natural Cotton', 'Intricate Knotting Detail', 'Includes Wooden Dowel', 'Adds Textural Interest'],
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'prod_h03',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Artisan\'s Touch Wool Carpet',
    price: 399.50,
    category: 'Rugs & Carpets',
    shortDescription: 'A luxurious, hand-knotted wool carpet featuring traditional motifs. Its plush texture and rich, vegetable-dyed colors will anchor any living space.',
    longDescription: 'Experience true luxury underfoot with this hand-knotted carpet. Made from high-quality New Zealand wool, it is naturally stain-resistant and incredibly durable. The timeless design ensures it will be a cherished part of your home for generations.',
    features: ['Hand-Knotted New Zealand Wool', 'Vegetable-Dyed Colors', 'Plush 1-inch Pile', 'Naturally Stain-Resistant'],
    createdAt: '2023-10-24T09:00:00Z',
    updatedAt: '2023-10-24T09:00:00Z',
  },
  {
    id: 'prod_h04',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Jaipuri Geometric Durrie',
    price: 125.00,
    category: 'Rugs & Carpets',
    shortDescription: 'A vibrant, flat-woven durrie from Jaipur, known for its bold geometric patterns and durability. This is a very long description that is specifically designed to test the line-clamp functionality to ensure it properly truncates the text with an ellipsis.',
    longDescription: 'This cotton durrie is a masterpiece of flat-weave design, making it lightweight, reversible, and easy to clean. Perfect for high-traffic areas, it brings a pop of color and modern design inspired by the architecture of Jaipur.',
    features: ['100% Cotton Flat-Weave', 'Reversible Design', 'Easy to Clean', 'Bold Geometric Pattern'],
    createdAt: '2023-10-23T18:00:00Z',
    updatedAt: '2023-10-23T18:00:00Z',
  },
  {
    id: 'prod_h05',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Acacia Wood Serving Tray',
    price: 65.00,
    category: 'Home Goods',
    shortDescription: 'A beautifully crafted serving tray made from solid acacia wood, featuring a rich grain and natural finish. Perfect for serving drinks or as a decorative piece.',
    longDescription: 'Entertain in style with this elegant and durable serving tray. The natural variations in the acacia wood grain make each piece unique. Polished brass handles provide a comfortable grip and a touch of modern sophistication.',
    features: ['Solid Acacia Wood', 'Polished Brass Handles', 'Food-Safe Finish', 'Unique Wood Grain'],
    createdAt: '2023-10-22T11:45:00Z',
    updatedAt: '2023-10-22T11:45:00Z',
  },
];


// 4. Main Products Page Component (UPDATED)
const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');

  const categories = ['All', ...new Set(dummyProducts.map((p) => p.category))];

  // Combined filtering logic remains the same
  const filteredProducts = dummyProducts
    .filter(product => {
      return selectedCategory === 'All' || product.category === selectedCategory;
    })
    .filter(product => {
      return product.title.toLowerCase().includes(activeSearchTerm.toLowerCase());
    });
      
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  
  // --- NEW: Helper function to apply the search ---
  const applySearchFilter = () => {
    setActiveSearchTerm(searchInput.trim());
  };
  
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applySearchFilter();
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2074&auto=format&fit=crop"
            alt="Our Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        <div className="container mt-10 mx-auto px-4 z-10 text-center">
          <Badge variant="outline" className="mb-6 text-gold border-gold/50 bg-black/20 backdrop-blur-sm">
            Explore Our Collection
          </Badge>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
            Discover Premium Products
          </h1>
          <p className="text-xl text-cream/90 max-w-3xl mx-auto">
            Dive into our curated selection of high-quality products, crafted to elevate your lifestyle.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="section-title">All Products</h2>
              <p className="section-subtitle">Premium Solutions for Every Space</p>
            </div>
            
            {/* --- MODIFIED FILTERS SECTION --- */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search input and button group */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full sm:w-52 px-3 border border-gray-300 rounded-lg bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
                <button
                  onClick={applySearchFilter}
                  className="bg-gray-800 text-white font-semibold px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                  Search
                </button>
              </div>

              {/* Category Dropdown */}
              <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg bg-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;