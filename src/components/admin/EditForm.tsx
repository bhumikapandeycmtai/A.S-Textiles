import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- 1. THE ONLY CHANGE IS HERE: UPDATE THE INTERFACE ---
type ItemType = {
  id: string;
  imageUrl: string | File;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  // Allow size to be either the final object OR the string from the API
  size: {
    length: number;
    width: number;
  } | string; // <-- THIS LINE IS THE FIX
};

interface EditFormProps {
  editItem: ItemType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: (message: string) => void;
  setToastSuccess: (success: boolean) => void;
  setShowToast: (show: boolean) => void;
  refreshProducts: () => void;
}

const EditForm = ({
  editItem,
  setIsEdit,
  setToastMessage,
  setToastSuccess,
  setShowToast,
  refreshProducts,
}: EditFormProps) => {

  const [newItem, setNewItem] = useState<ItemType | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (editItem) {
      // Parse features (no change here)
      let parsedFeatures: string[] = [];
      if (Array.isArray(editItem.features)) {
        parsedFeatures = editItem.features;
      } else if (typeof editItem.features === 'string') {
        try {
          const maybeParsed = JSON.parse(editItem.features);
          parsedFeatures = Array.isArray(maybeParsed) ? maybeParsed : [];
        } catch {
          parsedFeatures = [];
        }
      }

      // Parse size (this code is now valid because of the type change)
      let parsedSize: { length: number, width: number } = { length: 0, width: 0 };
      if (typeof editItem.size === 'string' && editItem.size.startsWith('{')) {
        try { parsedSize = JSON.parse(editItem.size); } catch { /* keep default */ }
      } else if (typeof editItem.size === 'object' && editItem.size !== null) {
        parsedSize = editItem.size;
      }

      setNewItem({
        ...editItem,
        features: parsedFeatures,
        size: parsedSize, // Set the parsed size (which is now guaranteed to be an object)
      });
    }
  }, [editItem]);

  const handleEdit = async () => {
    if (!newItem || isUpdating) return;
    setIsUpdating(true);

    const formData = new FormData();
    const now = new Date().toISOString();

    formData.append('title', newItem.title);
    formData.append('category', newItem.category);
    formData.append('price', String(newItem.price));
    formData.append('shortDescription', newItem.shortDescription);
    formData.append('longDescription', newItem.longDescription);
    formData.append('features', JSON.stringify(newItem.features));
    
    // Ensure size is stringified before sending
    if (typeof newItem.size !== 'string') {
      formData.append('size', JSON.stringify(newItem.size));
    }

    if (newItem.imageUrl instanceof File) {
      formData.append('image', newItem.imageUrl);
    }

    try {
      formData.append('updatedAt', now)
      await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/updateProduct/${newItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setToastMessage('Product updated successfully.');
      setToastSuccess(true);
      setShowToast(true);
      refreshProducts();
      setIsEdit(false);
    } catch (error) {
      console.error('Failed to update:', error);
      setToastMessage('Update failed! Please try again.');
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: name === 'price' ? parseFloat(value) : value };
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => {
      if (!prev || typeof prev.size === 'string') return prev; // Safety check
      return {
        ...prev,
        size: {
          ...prev.size,
          [name]: parseFloat(value) || 0,
        },
      };
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    setNewItem((prev) => {
      if (!prev) return null;
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };
  const handleFeatureDelete = (index: number) => {
    setNewItem((prev) => {
      if (!prev) return null;
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updatedFeatures };
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewItem((prev) => {
        if (!prev) return null;
        return { ...prev, imageUrl: file };
      });
    }
  };

  if (!newItem || typeof newItem.size === 'string') return <div>Loading...</div>; // Add safety check for rendering

  return (
    <div className="p-5">
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">Edit Form</h1>
          <button type="button" className="bg-olive text-sm text-white px-3 py-2 rounded hover:bg-olive-dark flex items-center gap-1" onClick={() => setIsEdit(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-black">Title</label>
          <input name="title" value={newItem.title} onChange={handleChange} className="px-6 py-2 border rounded" />
          
          <label className="font-medium text-black">Category</label>
          <input name="category" value={newItem.category} onChange={handleChange} className="px-6 py-2 border rounded" />
          
          <label className="font-medium text-black">Price</label>
          <input name="price" type="number" value={newItem.price} onChange={handleChange} className="px-6 py-2 border rounded" />
          
          <label className="font-medium text-black">Short Description</label>
          <input name="shortDescription" value={newItem.shortDescription} onChange={handleChange} className="px-6 py-2 border rounded" />
          
          <label className="font-medium text-black">Long Description</label>
          <input name="longDescription" value={newItem.longDescription} onChange={handleChange} className="px-6 py-2 border rounded" />

          <label className="font-medium text-black mt-2">Dimensions</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="length" className="text-sm text-gray-600">Length (in)</label>
              <input id="length" type="number" name="length" value={newItem.size.length} onChange={handleSizeChange} className="w-full px-4 py-2 border rounded" />
            </div>
            <div className="w-1/2">
              <label htmlFor="width" className="text-sm text-gray-600">Width (in)</label>
              <input id="width" type="number" name="width" value={newItem.size.width} onChange={handleSizeChange} className="w-full px-4 py-2 border rounded" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="font-medium text-black">Features</label>
          {newItem.features.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
              <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 px-4 py-2 border rounded" placeholder={`Feature ${index + 1}`} />
              <button type="button" onClick={() => handleFeatureDelete(index)} className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
          <div>
            <h2 className="text-black text-xl mb-2">Current Image</h2>
            {typeof editItem.imageUrl === 'string' && (
              <img src={editItem.imageUrl} className="w-48 border rounded" alt="Current"/>
            )}
          </div>
          <div>
            <h2 className="text-black text-xl mb-2">Upload New Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded w-full" />
            
            {newItem.imageUrl instanceof File && (
              <div className="mt-2">
                <h3 className="text-black text-lg mb-1">New Image Preview</h3>
                <img src={URL.createObjectURL(newItem.imageUrl)} className="w-48 border rounded" alt="New preview"/>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark mt-4 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isUpdating}>
          {isUpdating ? 'Updating product...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditForm;