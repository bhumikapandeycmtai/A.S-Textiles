// src/pages/Products.tsx

import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Interfaces remain the same
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

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Products: React.FC = () => {
  // State management remains the same
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

  const filterContainerRef = useRef<HTMLDivElement>(null);

  // Data fetching logic
  const fetchProducts = async (page: number, title: string, category: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '9');

      const isFiltering = title || category;

      if (!isFiltering) {
        params.append('sortBy', 'updatedAt');
        params.append('sortOrder', 'desc');
      }

      if (title) params.append('title', title);
      if (category) params.append('category', category);

      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/getallProducts?${params.toString()}`);
      
      const responseData = response.data.data;
      
      if (responseData && Array.isArray(responseData.products)) {
        setProducts(responseData.products);

        // This is our defensive check to fix the totalPages count.
        const finalPaginationData = { ...responseData.pagination }; // Make a mutable copy

        // If we are on the first page AND we received fewer items than a full page,
        // we can confidently say there is only one total page.
        if (page === 1 && responseData.products.length < 9) {
          finalPaginationData.totalPages = 1;
          finalPaginationData.hasNextPage = false; // Also correct this for consistency
        }

        setPaginationData(finalPaginationData); // Set the corrected pagination data

      } else {
        throw new Error('Invalid data structure received from API.');
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to load products. Please try a different filter.`);
      } else {
        setError('An unknown error occurred while fetching products.');
      }
      setProducts([]);
      setPaginationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // This useEffect now ONLY runs on the initial component mount.
  useEffect(() => {
    fetchProducts(1, '', ''); // Initial fetch
    
    const fetchAllDataForSuggestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/getallProducts?limit=1000`);
        const allProducts = response.data.data.products;

        if (Array.isArray(allProducts)) {
          const titles = allProducts.map(p => p.title);
          const categories = [...new Set<string>(allProducts.map(p => p.category))];
          setAllTitles(titles);
          setAllCategories(categories); // Used for the <select> dropdown
        }
      } catch (err) {
        console.error("Failed to fetch data for suggestions:", err);
      }
    };
    fetchAllDataForSuggestions();
  }, []);

  
  // Filter handlers remain the same
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTitle(value);
    if (value) {
      const filtered = allTitles.filter(title => title.toLowerCase().includes(value.toLowerCase()));
      setTitleSuggestions(filtered.slice(0, 5));
      setShowTitleSuggestions(true);
    } else {
      setShowTitleSuggestions(false);
      setCurrentPage(1);
      fetchProducts(1, '', filterCategory);
    }
  };

  const handleCategorySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value === 'All' ? '' : event.target.value;
    setFilterCategory(newCategory);
    setCurrentPage(1);
    fetchProducts(1, filterTitle, newCategory);
  };
  
  const handleTitleSuggestionClick = (suggestion: string) => {
    setFilterTitle(suggestion);
    setShowTitleSuggestions(false);
    setCurrentPage(1);
    fetchProducts(1, suggestion, filterCategory);
  };
  
  const applyFilters = () => {
    setShowTitleSuggestions(false);
    setCurrentPage(1);
    fetchProducts(1, filterTitle, filterCategory);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        setShowTitleSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (paginationData && newPage > paginationData.totalPages)) return;
    setCurrentPage(newPage);
    fetchProducts(newPage, filterTitle, filterCategory);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // JSX rendering remains the same
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2074&auto=format&fit=crop" alt="Our Products" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        <div className="container mt-10 mx-auto px-4 z-10 text-center">
          <Badge variant="outline" className="mb-6 text-gold border-gold/50 bg-black/20 backdrop-blur-sm">
            Explore Our Collection
          </Badge>
          <h1 className="text-3xl md:text-6xl font-playfair font-bold text-white mb-6">Discover Premium Products</h1>
          <p className="text-base md:text-xl text-cream/90 max-w-3xl mx-auto">Dive into our curated selection of high-quality products, crafted to elevate your lifestyle.</p>
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
            
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full md:w-auto" ref={filterContainerRef}>
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text" placeholder="Search by title..." value={filterTitle}
                  onChange={handleTitleChange}
                  onFocus={() => { if (filterTitle) setShowTitleSuggestions(true) }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                {showTitleSuggestions && titleSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {titleSuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleTitleSuggestionClick(suggestion)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <select 
                id="category-select" 
                value={filterCategory || 'All'}
                onChange={handleCategorySelectChange} 
                className="w-full sm:w-auto p-[9px] border border-gray-300 rounded-lg bg-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="All">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button onClick={applyFilters} className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                Search
              </button>
            </div>
          </div>
          
          {isLoading && <p className="text-center text-gray-500 py-10">Loading products...</p>}
          {error && <p className="text-center text-red-500 py-10">{error}</p>}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 py-10">No products match your criteria.</p>
                )}
              </div>

              {paginationData && paginationData.totalPages > 1 && (
                <div className="flex justify-between items-center mt-12 border-t pt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!paginationData.hasPrevPage}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {paginationData.page} of {paginationData.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!paginationData.hasNextPage}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;