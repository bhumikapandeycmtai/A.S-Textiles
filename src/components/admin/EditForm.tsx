import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ItemType = {
  id: string;
  imageUrl: string | File;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
};

const EditForm = ({
  editItem,
  setIsEdit,
}: {
  editItem: ItemType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newItem, setNewItem] = useState<ItemType | null>(null);

  useEffect(() => {
    if (editItem) {
      let parsedFeatures: string[] = [];

      // This logic for parsing features is good.
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

      setNewItem({
        ...editItem,
        features: parsedFeatures,
      });
    }
  }, [editItem]);

  const handleEdit = async () => {
    if (!newItem) return;

    const formData = new FormData();
    const now = new Date().toISOString();

    // This logic is fine
    if (newItem.title !== editItem.title) formData.append('title', newItem.title);
    if (newItem.category !== editItem.category) formData.append('category', newItem.category);
    if (newItem.price !== editItem.price) formData.append('price', String(newItem.price));
    if (newItem.shortDescription !== editItem.shortDescription)
      formData.append('shortDescription', newItem.shortDescription);
    if (newItem.longDescription !== editItem.longDescription)
      formData.append('longDescription', newItem.longDescription);

    if (JSON.stringify(newItem.features) !== JSON.stringify(editItem.features)) {
      formData.append('features', JSON.stringify(newItem.features));
    }

    if (newItem.imageUrl instanceof File) {
      formData.append('imageUrl', newItem.imageUrl);
    }

    try {
      formData.append('updatedAt', now)
      await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/updateProduct/${newItem.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product updated successfully!');
      setIsEdit(false);
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Update failed!');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'price' ? Number(value) : value,
      };
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    setNewItem((prev) => {
      if (!prev) return null;
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const handleFeatureDelete = (index: number) => {
    setNewItem((prev) => {
      if (!prev) return null;
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewItem((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          imageUrl: file,
        };
      });
    }
  };

  if (!newItem) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">Edit Form</h1>
          <button
            type="button"
            className="bg-olive text-sm text-white px-3 py-2 rounded hover:bg-olive-dark flex items-center gap-1"
            onClick={() => setIsEdit(false)}
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

        {/* --- Form fields are unchanged --- */}
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
        </div>

        <div className="mt-4">
          <label className="font-medium text-black">Features</label>
          {newItem.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 px-4 py-2 border rounded" placeholder={`Feature ${index + 1}`} />
              <button type="button" onClick={() => handleFeatureDelete(index)} className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* --- End of unchanged form fields --- */}

        {/* ======================= FIX STARTS HERE ======================= */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
          <div>
            <h2 className="text-black text-xl mb-2">Current Image</h2>
            {/* 
              FIX 1: Display the original image URL directly.
              `editItem.imageUrl` is always a string from the server.
            */}
            {typeof editItem.imageUrl === 'string' && (
              <img
                src={editItem.imageUrl}
                className="w-48 border rounded"
                alt="Current"
              />
            )}
          </div>
          <div>
            <h2 className="text-black text-xl mb-2">Upload New Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded w-full" />
            
            {/* 
              FIX 2: Add a preview for the newly selected image.
              This logic correctly uses `URL.createObjectURL` only when `newItem.imageUrl` is a File.
            */}
            {newItem.imageUrl instanceof File && (
              <div className="mt-2">
                <h3 className="text-black text-lg mb-1">New Image Preview</h3>
                <img
                  src={URL.createObjectURL(newItem.imageUrl)}
                  className="w-48 border rounded"
                  alt="New preview"
                />
              </div>
            )}
          </div>
        </div>
        {/* ======================== FIX ENDS HERE ======================== */}

        <button
          type="submit"
          className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditForm;