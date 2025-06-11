// src/components/admin/dashboard/ProductView.tsx

import React, { useState, useEffect, useRef } from 'react';
import Toast from '@/components/toast';
import axios from 'axios';
import AddItemForm from '@/components/admin/AddItemForm';
import EditForm from '@/components/admin/EditForm';
import DeleteModal from './DeleteModal';

interface ProductItem {
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

const ProductView = () => {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [showProductItems, setShowProductItems] = useState<ProductItem[]>([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editItem, setEditItem] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filterTitleRef = useRef<HTMLInputElement>(null);
  const filterCategoryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProductItems();
  }, []);

  const fetchProductItems = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://a-s-textiles.vercel.app/v1/products/getallProducts');
      const result = response.data.data;
      
      if (Array.isArray(result)) {
        // ========================================================================
        // --- ROBUST DATA SANITIZATION: This block prevents all data type errors ---
        // We are ensuring the data from the API matches our `ProductItem` interface.
        // ========================================================================
        const cleanedData: ProductItem[] = result.map((item: any) => {
          let featuresArray: string[] = [];
          // Ensure `features` is always an array
          if (Array.isArray(item.features)) {
            featuresArray = item.features;
          } else if (typeof item.features === 'string' && item.features.length > 0) {
            featuresArray = item.features.split(',').map(feature => feature.trim());
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
            // Ensure `price` is always a number
            price: parseFloat(item.price) || 0,
            // Use the safe `featuresArray`
            features: featuresArray,
          };
        });
        
        const sorted = cleanedData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        console.log(sorted)
        setProductItems(sorted);
        setShowProductItems(sorted);

      } else {
        setError('Unexpected response format from server');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch product items');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterItem = () => {
    const filterTitle = filterTitleRef.current?.value.toLowerCase() || '';
    const filterCategory = filterCategoryRef.current?.value.toLowerCase() || '';
    if (!filterTitle && !filterCategory) {
      setShowProductItems(productItems);
      return;
    }

    const filtered = productItems.filter(item => {
      const titleMatch = filterTitle ? item.title?.toLowerCase().includes(filterTitle) : true;
      const categoryMatch = filterCategory ? item.category?.toLowerCase().includes(filterCategory) : true;
      return titleMatch && categoryMatch;
    });

    setShowProductItems(filtered);
  };

  const openDeleteModal = (id: string) => {
    setDeleteItemId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteItemId("");
    setDeleteModalOpen(false);
  };

  const confirmDeleteItem = async () => {
    if (!deleteItemId) return;
    try {
      await axios.delete(`https://a-s-textiles.vercel.app/v1/products/deleteProduct/${deleteItemId}`);
      setProductItems(prev => prev.filter(item => item.id !== deleteItemId));
      setShowProductItems(prev => prev.filter(item => item.id !== deleteItemId));
      setToastMessage("Item deleted successfully.");
      setToastSuccess(true);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setToastMessage("Failed to delete item.");
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      closeDeleteModal();
    }
  };

  if (isAddItem) {
    return (
      <AddItemForm
        setIsAddItem={setIsAddItem}
        handleFileChange={() => {}}
        loading={loading}
        setToastMessage={setToastMessage}
        setToastSuccess={setToastSuccess}
        setShowToast={setShowToast}
        refreshProducts={fetchProductItems}
      />
    );
  }

  if (isEdit && editItem) {
    return <EditForm editItem={editItem} setIsEdit={setIsEdit} />;
  }

  if (isViewing && selectedProduct) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in">
        <div className='flex justify-between'>
          <h2 className='text-2xl font-semibold text-gray-800'>Product Details</h2>
          <button
            className="mt-4 sm:mt-0 px-4 py-2 bg-olive text-white rounded-lg transition flex gap-2 items-center justify-center"
            onClick={() => {
              setIsViewing(false);
              setSelectedProduct(null);
            }} 
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
  
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <img 
              src={selectedProduct.imageUrl} 
              alt={selectedProduct.title} 
              className="w-full h-auto object-cover rounded-lg shadow-md" 
            />
          </div>
  
          <div className="md:w-1/2 mt-6 md:mt-0">
            <span className="text-sm border-olive-dark border-[1px] text-olive-dark font-semibold px-3 py-1 rounded-full">{selectedProduct.category}</span>
            <h1 className="text-3xl font-bold text-gray-900 my-2">{selectedProduct.title}</h1>
            {/* This will now always work */}
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
                 {/* This will now always work */}
                <ul className="list-disc list-inside pl-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
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
  
  return (
    <div className="flex flex-col space-y-6">
      <Toast
        message={toastMessage}
        show={showToast}
        success={toastSuccess}
        onClose={() => setShowToast(false)}
      />
      <button
        onClick={() => setIsAddItem(true)}
        className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark place-self-end"
      >
        Add New Item
      </button>

      {error && <div className="text-red-500 font-medium">{error}</div>}

      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-black mb-4">Filter Products</h1>
          <div className="flex flex-wrap gap-4">
            <input type="text" placeholder="Title" ref={filterTitleRef} className="flex-1 min-w-[120px] px-4 py-2 border rounded" />
            <input type="text" placeholder="Category" ref={filterCategoryRef} className="flex-1 min-w-[120px] px-4 py-2 border rounded" />
            <button onClick={handleFilterItem} className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark">Filter</button>
          </div>
        </div>

        {loading ? <p>Loading products...</p> : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showProductItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(item);
                  setIsViewing(true);
                }}
              >
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.category}</span>
                  <h3 className="font-semibold text-gray-800 mt-2 truncate">{item.title}</h3>
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openDeleteModal(item.id); }} 
                      className="text-red-500 hover:text-red-700 text-sm font-medium z-10 relative"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditItem(item); setIsEdit(true); }} 
                      className="text-green-500 hover:text-green-700 text-sm font-medium z-10 relative"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteItem}
        itemName={productItems.find(p => p.id === deleteItemId)?.title}
      />
    </div>
  );
};

export default ProductView;