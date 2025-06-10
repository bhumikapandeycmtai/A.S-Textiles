import React, { useState, DragEvent } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const MAX_SIZE_MB = 5;

  const validateFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size should not exceed ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
      setFileName(file.name);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } else {
      onFileSelect(null);
      setFileName('');
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white text-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border border-dashed border-gray-300 rounded-lg p-6 transition hover:border-blue-400 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <p className="text-sm">
            <strong>Choose a file</strong> or drag & drop it here
          </p>
          <p className="text-xs text-gray-400">JPEG, PNG only, max 5MB</p>
          <label
            htmlFor="image-upload"
            className="mt-3 inline-block bg-white border border-gray-400 text-gray-700 px-4 py-1 rounded cursor-pointer hover:bg-gray-100"
          >
            Browse Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover border rounded shadow mx-auto"
          />
          <p className="text-xs mt-1 text-gray-600">{fileName}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
