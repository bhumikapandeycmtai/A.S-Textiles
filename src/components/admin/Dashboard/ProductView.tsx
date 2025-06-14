// src/components/admin/dashboard/ProductView.tsx

import React, { useState, useEffect, useRef } from 'react';
import Toast from '@/components/toast';
import axios from 'axios';
import AddItemForm from '@/components/admin/AddItemForm';
import EditForm from '@/components/admin/EditForm';
import DeleteModal from './DeleteModal';

// --- 1. UPDATE THE INTERFACE ---
interface ProductItem {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  size: { // Added size object
    length: number;
    width: number;
  };
  createdAt: string;
  updatedAt: string;  
}

const ITEMS_PER_PAGE = 9;

const ProductView = () => {
  // State management remains the same
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editItem, setEditItem] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProductItems(1, '', '');
    fetchAllDataForSuggestions();
  }, []);

  const fetchAllDataForSuggestions = async () => {
    try {
      const response = await axios.get(`https://a-s-textiles.vercel.app/v1/products/getallProducts?limit=1000`);
      const allProducts = response.data.data.products;
      if (Array.isArray(allProducts)) {
        const titles = allProducts.map(p => p.title);
        const categories = [...new Set<string>(allProducts.map(p => p.category))];
        setAllTitles(titles);
        setAllCategories(categories);
      }
    } catch (err) {
      console.error("Failed to fetch data for suggestions:", err);
    }
  }

  // --- 2. UPDATE THE FETCH FUNCTION TO PARSE SIZE ---
  const fetchProductItems = async (page: number, title: string, category: string) => {
    try {
      setLoading(true);
      setError('');
      
      let url = `https://a-s-textiles.vercel.app/v1/products/getallProducts?page=${page}&limit=${ITEMS_PER_PAGE}`;
      const isFilteringByText = title || category;

      if (!isFilteringByText) {
        url += `&sortBy=updatedAt&sortOrder=desc`;
      }
      if (title) url += `&title=${encodeURIComponent(title)}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      
      const response = await axios.get(url);
      const responseData = response.data.data;
      const result = responseData.products;
      const paginationData = responseData.pagination;
      
      if (Array.isArray(result)) {
        const cleanedData: ProductItem[] = result.map((item: any) => {
          // Parse features
          let featuresArray: string[] = [];
          if (typeof item.features === 'string' && item.features.startsWith('[')) {
            try { featuresArray = JSON.parse(item.features); } catch { featuresArray = []; }
          } else if (Array.isArray(item.features)) {
            featuresArray = item.features;
          }

          // Parse size, providing a default for older items
          let sizeObject = { length: 0, width: 0 };
          if (typeof item.size === 'string' && item.size.startsWith('{')) {
            try { sizeObject = JSON.parse(item.size); } catch { /* keep default */ }
          } else if (typeof item.size === 'object' && item.size !== null) {
            sizeObject = item.size;
          }

          return {
            id: item.id || '',
            imageUrl: item.imageUrl || '',
            title: item.title || '',
            category: item.category || '',
            shortDescription: item.shortDescription || '',
            longDescription: item.longDescription || '',
            createdAt: item.createdAt || '',
            updatedAt: item.updatedAt || '',
            price: parseFloat(item.price) || 0,
            features: featuresArray,
            size: sizeObject, // Assign the parsed or default size object
          };
        });
        
        setProductItems(cleanedData);
        
        let finalTotalPages = paginationData.totalPages || 1;
        if (page === 1 && cleanedData.length < ITEMS_PER_PAGE) {
          finalTotalPages = 1;
        }
        setTotalPages(finalTotalPages);

      } else {
        setError('Unexpected response format.');
        setProductItems([]);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      const apiErrorMessage = err.response?.data?.error || 'Please check filters and try again.';
      setError(`Failed to fetch product items. ${apiErrorMessage}`);
      setProductItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handlers remain the same...
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTitle(value);
    if (value) {
      const filtered = allTitles.filter(title => title.toLowerCase().includes(value.toLowerCase()));
      setTitleSuggestions(filtered.slice(0, 5));
      setShowTitleSuggestions(true);
    } else {
      setShowTitleSuggestions(false);
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterCategory(value);
    if (value) {
      const filtered = allCategories.filter(cat => cat.toLowerCase().includes(value.toLowerCase()));
      setCategorySuggestions(filtered.slice(0, 5));
      setShowCategorySuggestions(true);
    } else {
      setShowCategorySuggestions(false);
    }
  };
  const handleTitleSuggestionClick = (suggestion: string) => {
    setFilterTitle(suggestion);
    setShowTitleSuggestions(false);
    setCurrentPage(1);
    fetchProductItems(1, suggestion, filterCategory);
  };
  const handleCategorySuggestionClick = (suggestion: string) => {
    setFilterCategory(suggestion);
    setShowCategorySuggestions(false);
    setCurrentPage(1);
    fetchProductItems(1, filterTitle, suggestion);
  };
  const handleFilterItem = () => {
    setShowTitleSuggestions(false);
    setShowCategorySuggestions(false);
    setCurrentPage(1);
    fetchProductItems(1, filterTitle, filterCategory);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        setShowTitleSuggestions(false);
        setShowCategorySuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);
  const openDeleteModal = (id: string) => { setDeleteItemId(id); setDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeleteItemId(""); setDeleteModalOpen(false); };
  const confirmDeleteItem = async () => {
    if (!deleteItemId) return;
    try {
      await axios.delete(`https://a-s-textiles.vercel.app/v1/products/deleteProduct/${deleteItemId}`);
      setToastMessage("Item deleted successfully.");
      setToastSuccess(true);
      setShowToast(true);
      fetchProductItems(currentPage, filterTitle, filterCategory);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setToastMessage("Failed to delete item.");
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      closeDeleteModal();
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchProductItems(newPage, filterTitle, filterCategory);
  };

  // --- JSX (AddItemForm and EditForm handlers are updated) ---
  if (isAddItem) {
    return (
      <AddItemForm
        setIsAddItem={setIsAddItem}
        loading={loading}
        setToastMessage={setToastMessage}
        setToastSuccess={setToastSuccess}
        setShowToast={setShowToast}
        refreshProducts={() => {
            setCurrentPage(1);
            fetchProductItems(1, '', ''); // Fetch with no filters to see new item
            fetchAllDataForSuggestions();
        }}
      />
    );
  }

  if (isEdit && editItem) {
    return (
      <EditForm 
        editItem={editItem} 
        setToastMessage={setToastMessage} 
        setToastSuccess={setToastSuccess} 
        setShowToast={setShowToast} 
        refreshProducts={() => {
            setCurrentPage(1);
            setFilterTitle(''); // Clear filters to ensure sort works
            setFilterCategory('');
            fetchProductItems(1, '', ''); // Fetch with no filters to see edited item at top
            fetchAllDataForSuggestions();
        }} 
        setIsEdit={setIsEdit} 
      />
    );
  }

  // --- 3. UPDATE THE VIEWING UI TO DISPLAY SIZE ---
  if (isViewing && selectedProduct) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in">
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold text-gray-800'>Product Details</h2>
          <button className="px-4 py-2 bg-olive text-white rounded-lg transition flex gap-2 items-center justify-center" onClick={() => { setIsViewing(false); setSelectedProduct(null); }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        <div className="mt-6 md:flex md:space-x-8">
          <div className="md:w-1/2">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-auto object-contain rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <span className="text-sm border-olive-dark border-[1px] text-olive-dark font-semibold px-3 py-1 rounded-full">{selectedProduct.category}</span>
            <h1 className="text-3xl font-bold text-gray-900 my-2">{selectedProduct.title}</h1>
            <p className="text-2xl font-light text-gray-700 mb-4">${selectedProduct.price.toFixed(2)}</p>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800">Description</h3>
                <p>{selectedProduct.shortDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Details</h3>
                <p>{selectedProduct.longDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Features</h3>
                <ul className="list-disc list-inside pl-2">
                  {selectedProduct.features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
              </div>
              {/* Conditionally render the Dimensions section only if size data exists */}
              {selectedProduct.size && (selectedProduct.size.length > 0 || selectedProduct.size.width > 0) && (
                <div>
                  <h3 className="font-semibold text-gray-800">Dimensions</h3>
                  <p>{selectedProduct.size.length} in (L) × {selectedProduct.size.width} in (W)</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-xs text-gray-500 flex justify-between">
            <span>Created: {new Date(selectedProduct.createdAt).toLocaleString()}</span>
            <span>Last Updated: {new Date(selectedProduct.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    );
  }
  
  // The rest of the main return JSX remains the same
  return (
    <div className="p-4 sm:p-6 flex flex-col space-y-6">
      <Toast message={toastMessage} show={showToast} success={toastSuccess} onClose={() => setShowToast(false)} />
      <button onClick={() => setIsAddItem(true)} className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark place-self-end">
        Add New Item
      </button>

      {error && <div className="text-red-500 font-medium p-3 bg-red-50 rounded-lg">{error}</div>}

      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-black mb-4">Filter Products</h1>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4" ref={filterContainerRef}>
            <div className="relative flex-1 min-w-[200px]">
              <input type="text" placeholder="Title" value={filterTitle} onChange={handleTitleChange} onFocus={() => { if (filterTitle) setShowTitleSuggestions(true) }} className="w-full px-4 py-2 border rounded"/>
              {showTitleSuggestions && titleSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {titleSuggestions.map((suggestion, index) => ( <li key={index} onClick={() => handleTitleSuggestionClick(suggestion)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{suggestion}</li> ))}
                </ul>
              )}
            </div>
            <div className="relative flex-1 min-w-[200px]">
              <input type="text" placeholder="Category" value={filterCategory} onChange={handleCategoryChange} onFocus={() => { if (filterCategory) setShowCategorySuggestions(true) }} className="w-full px-4 py-2 border rounded" />
              {showCategorySuggestions && categorySuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {categorySuggestions.map((suggestion, index) => ( <li key={index} onClick={() => handleCategorySuggestionClick(suggestion)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{suggestion}</li> ))}
                </ul>
              )}
            </div>
            <button onClick={handleFilterItem} className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark">Filter</button>
          </div>
        </div>
        
        {loading ? ( <p className="text-center py-10 text-gray-500">Loading products...</p> ) : productItems.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="relative flex-grow cursor-pointer" onClick={() => { setSelectedProduct(item); setIsViewing(true); }}>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-contain" />
                  <div className="p-4">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.category}</span>
                    <h3 className="font-semibold text-gray-800 mt-2 truncate">{item.title}</h3>
                  </div>
                </div>
                <div className="p-4 pt-0 border-t mt-auto flex justify-between">
                  <button onClick={(e) => { e.stopPropagation(); openDeleteModal(item.id); }} className="text-red-500 hover:text-red-700 text-sm p-2 font-medium">Delete</button>
                  <button onClick={(e) => { e.stopPropagation(); setEditItem(item); setIsEdit(true); }} className="text-green-500 hover:text-green-700 text-sm p-2 font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
        ) : ( <p className="text-center py-10 text-gray-500">No products found for the current filter.</p> )}
      </div>

      {totalPages > 1 && !loading && productItems.length > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className="px-4 py-2 bg-olive text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
          <span className="font-medium">Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="px-4 py-2 bg-olive text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
        </div>
      )}

      <DeleteModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDeleteItem} itemName={productItems.find(p => p.id === deleteItemId)?.title} />
    </div>
  );
};

export default ProductView;