import React, { useState } from 'react';
import axios from 'axios';
import ImageUploader from './ImageUploader';

type newItemType = {
  id: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
};

interface AddItemFormProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  setIsAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setToastSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProducts: ()=>void // <-- Added this line

}


const AddItemForm = ({
  handleFileChange,
  loading,
  setIsAddItem,
  setToastMessage,
  setToastSuccess,
  setShowToast,
  refreshProducts
}: AddItemFormProps) => {
  const [newItem, setNewItem] = useState<newItemType>({
    id: '',
    title: '',
    price: 0,
    category: '',
    shortDescription: '',
    longDescription: '',
    features: [],
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
    setNewItem((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleRemoveFeature = (index: number) => {
    const updated = [...newItem.features];
    updated.splice(index, 1);
    setNewItem((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const now = new Date().toISOString();

      // Append fields
      formData.append('title', newItem.title);
      formData.append('price', newItem.price.toString());
      formData.append('category', newItem.category);
      formData.append('shortDescription', newItem.shortDescription);
      formData.append('longDescription', newItem.longDescription);

      // Append features as JSON string (if backend expects this way)
      formData.append('features', JSON.stringify(newItem.features));
       formData.append('createdAt', now);
      formData.append('updatedAt', now);

      // Append image
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/v1/products/newProduct`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Product added successfully:', response.data);

      // Reset form
      setNewItem({
        id: '',
        title: '',
        price: 0,
        category: '',
        shortDescription: '',
        longDescription: '',
        features: [],
      });
      setNewFeature('');
      setSelectedImage(null);
      setToastMessage('New Product is added.');
      setToastSuccess(true);
      setShowToast(true);
      setIsAddItem(false)
      refreshProducts()
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
        <h1 className="text-xl font-bold text-black">Add New Product</h1>
        <button
          className="bg-olive text-white px-2 py-1 rounded text-sm hover:bg-olive-dark flex items-center justify-center gap-1"
          onClick={() => setIsAddItem(false)}
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
          Go Back
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={newItem.title} onChange={handleChange} className="px-6 py-2 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={newItem.category} onChange={handleChange} className="px-6 py-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={newItem.price} onChange={handleChange} className="px-6 py-2 border rounded" required />
        <input type="text" name="shortDescription" placeholder="Short Description" value={newItem.shortDescription} onChange={handleChange} className="px-6 py-2 border rounded" required />
        <input type="text" name="longDescription" placeholder="Long Description" value={newItem.longDescription} onChange={handleChange} className="px-6 py-2 border rounded" required />

        <div className="flex gap-2">
          <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add Feature" className="flex-1 px-4 py-2 border rounded" />
          <button type="button" onClick={handleAddFeature} className="bg-olive text-white text-sm p-2 rounded-sm hover:bg-olive-dark">+</button>
        </div>

        {newItem.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 px-4 py-2 border rounded" />
            <button type="button" onClick={() => handleRemoveFeature(index)} className="text-olive p-2 text-lg">×</button>
          </div>
        ))}

        <div className="flex flex-col items-center gap-4">
          <ImageUploader onFileSelect={setSelectedImage} />
        </div>

        <button type="submit" disabled={isSubmitting || loading} className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark">
          {isSubmitting || loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
