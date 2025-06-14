// src/components/admin/dashboard/DeleteModal.tsx

import React from 'react';
import { createPortal } from 'react-dom';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName = 'this item' }: DeleteModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Item</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete {itemName}?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;