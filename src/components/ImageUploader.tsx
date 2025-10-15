import React, { ChangeEvent, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label 
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
          isDragging 
            ? 'border-purple-500 bg-purple-50 scale-[1.02]' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-purple-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className={`p-4 rounded-full mb-3 transition-all ${
            isDragging ? 'bg-purple-100' : 'bg-gray-200'
          }`}>
            {isDragging ? (
              <ImageIcon className="w-8 h-8 text-purple-600" />
            ) : (
              <Upload className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <p className="mb-2 text-sm text-gray-600">
            <span className="font-semibold text-purple-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x600px)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          aria-label="Upload image file"
        />
      </label>
    </div>
  );
};

export default ImageUploader;
