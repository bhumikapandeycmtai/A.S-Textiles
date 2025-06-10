import React, { useEffect, useState } from 'react';
import items from '@/db';

type ItemType = {
  id: string;
  imageUrl: string;
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

    //check features should be array and can be mapped
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

    const updatedItems = items.map((item) => {
      if (item.id === newItem.id) {
        const isDifferent = Object.keys(item).some(
          (key) => item[key as keyof ItemType] !== newItem[key as keyof ItemType]
        );

        if (isDifferent) {
          return { ...item, ...newItem };
        }
      }
      return item;
    });

    console.log('Updated items:', updatedItems);
    // Save to DB or state if needed
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
            className="bg-olive text-sm text-white px-2 py-1 rounded hover:bg-olive-dark flex items-center gap-1"
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

        {/* Form Fields with Labels */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium text-black">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleChange}
            className="px-6 py-2 border rounded"
          />

          <label htmlFor="category" className="font-medium text-black">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="px-6 py-2 border rounded"
          />

          <label htmlFor="price" className="font-medium text-black">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            className="px-6 py-2 border rounded"
          />

          <label htmlFor="shortDescription" className="font-medium text-black">
            Short Description
          </label>
          <input
            id="shortDescription"
            type="text"
            name="shortDescription"
            value={newItem.shortDescription}
            onChange={handleChange}
            className="px-6 py-2 border rounded"
          />

          <label htmlFor="longDescription" className="font-medium text-black">
            Long Description
          </label>
          <input
            id="longDescription"
            type="text"
            name="longDescription"
            value={newItem.longDescription}
            onChange={handleChange}
            className="px-6 py-2 border rounded"
          />
        </div>

        {/* Features Section */}
        <div className="mt-4">
          <label className="font-medium text-black">Features</label>
          {newItem.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded"
                placeholder={`Feature ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleFeatureDelete(index)}
                className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="flex gap-4 justify-between mt-4">
          <div>
            <h2 className="text-black text-xl mb-2">Previous Image</h2>
            <img src={editItem.imageUrl} className="w-48 border rounded" alt="Previous" />
          </div>
          <div>
            <h2 className="text-black text-xl mb-2">Upload New Image</h2>
            <input type="file" className="p-2 border rounded" />
          </div>
        </div>

        <button
          type="submit"
          className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark mt-4"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
