import React, { useState } from 'react';
import axios from 'axios';
import ImageUploader from './ImageUploader';

// The type definition remains the same
type newItemType = {
  id: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  size: {
    length: number;
    width: number;
  };
};

interface AddItemFormProps {
  loading: boolean;
  setIsAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setToastSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProducts: () => void;
}

// A consistent style for all labels
const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

const AddItemForm = ({
  loading,
  setIsAddItem,
  setToastMessage,
  setToastSuccess,
  setShowToast,
  refreshProducts
}: AddItemFormProps) => {
  // State management and handlers remain the same
  const [newItem, setNewItem] = useState<newItemType>({
    id: '',
    title: '',
    price: 0,
    category: '',
    shortDescription: '',
    longDescription: '',
    features: [],
    size: { length: 0, width: 0 },
  });

  const [newFeature, setNewFeature] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      size: { ...prev.size, [name]: parseFloat(value) || 0 },
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() === '') return;
    setNewItem((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature('');
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newItem.features];
    updatedFeatures[index] = value;
    setNewItem((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleRemoveFeature = (index: number) => {
    const updated = [...newItem.features];
    updated.splice(index, 1);
    setNewItem((prev) => ({ ...prev, features: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const now = new Date().toISOString();
      formData.append('title', newItem.title);
      formData.append('price', newItem.price.toString());
      formData.append('category', newItem.category);
      formData.append('shortDescription', newItem.shortDescription);
      formData.append('longDescription', newItem.longDescription);
      formData.append('features', JSON.stringify(newItem.features));
      formData.append('size', JSON.stringify(newItem.size));
      formData.append('createdAt', now);
      formData.append('updatedAt', now);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/newProduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewItem({ id: '', title: '', price: 0, category: '', shortDescription: '', longDescription: '', features: [], size: { length: 0, width: 0 } });
      setNewFeature('');
      setSelectedImage(null);
      setToastMessage('New Product is added.');
      setToastSuccess(true);
      setShowToast(true);
      setIsAddItem(false);
      refreshProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setToastMessage('Failed to add product.');
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 shadow-md rounded-md max-w-[600px] mx-auto bg-white">
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-base md:text-xl font-bold text-black">Add New Product</h1>
        <button className="bg-olive text-white px-2 py-1 rounded text-sm hover:bg-olive-dark flex items-center justify-center gap-1" onClick={() => setIsAddItem(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>
      </div>

      {/* --- START: UPDATED FORM WITH LABELS --- */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className={labelStyle}>Product Title</label>
          <input id="title" type="text" name="title" placeholder="e.g., Premium Cotton Bedsheet" value={newItem.title} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        </div>
        
        <div>
          <label htmlFor="category" className={labelStyle}>Category</label>
          <input id="category" type="text" name="category" placeholder="e.g., Home Textiles" value={newItem.category} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        </div>
        
        <div>
          <label htmlFor="price" className={labelStyle}>Price</label>
          <input id="price" type="number" name="price" placeholder="e.g., 49.99" value={newItem.price} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        </div>
        
        <div>
          <label htmlFor="shortDescription" className={labelStyle}>Short Description</label>
          <input id="shortDescription" type="text" name="shortDescription" placeholder="A brief, catchy description" value={newItem.shortDescription} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        </div>

        <div>
          <label htmlFor="longDescription" className={labelStyle}>Long Description</label>
          <input id="longDescription" type="text" name="longDescription" placeholder="Detailed product information" value={newItem.longDescription} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="length" className={labelStyle}>Length (in inches)</label>
            <input id="length" type="number" name="length" placeholder="e.g., 90" value={newItem.size.length} onChange={handleSizeChange} className="w-full px-4 py-2 border rounded" required />
          </div>
          <div className="w-1/2">
            <label htmlFor="width" className={labelStyle}>Width (in inches)</label>
            <input id="width" type="number" name="width" placeholder="e.g., 108" value={newItem.size.width} onChange={handleSizeChange} className="w-full px-4 py-2 border rounded" required />
          </div>
        </div>
        
        <div>
          <label htmlFor="newFeature" className={labelStyle}>Product Features</label>
          <div className="flex gap-2">
            <input id="newFeature" type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add a feature and click '+'" className="flex-1 px-4 py-2 border rounded" />
            <button type="button" onClick={handleAddFeature} className="bg-olive text-white text-sm p-2 rounded-sm hover:bg-olive-dark" aria-label="Add Feature">+</button>
          </div>
        </div>

        {newItem.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 px-4 py-2 border rounded" aria-label={`Feature ${index + 1}`} />
            <button type="button" onClick={() => handleRemoveFeature(index)} className="text-olive p-2 text-lg" aria-label={`Remove Feature ${index + 1}`}>×</button>
          </div>
        ))}
        
        <div>
          <label className={labelStyle}>Product Image</label>
          <ImageUploader onFileSelect={setSelectedImage} />
        </div>

        <button type="submit" disabled={isSubmitting || loading} className="mt-4 bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark disabled:bg-gray-400">
          {isSubmitting || loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
      {/* --- END: UPDATED FORM WITH LABELS --- */}
    </div>
  );
};

export default AddItemForm;