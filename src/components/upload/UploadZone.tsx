'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  previewUrl: string | null;
  onClear: () => void;
}

export default function UploadZone({ onUpload, previewUrl, onClear }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        {previewUrl ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={onClear}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "relative border-3 border-dashed rounded-3xl p-12 transition-all cursor-pointer group",
              isDragging 
                ? "border-teal-500 bg-teal-50/50" 
                : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/20"
            )}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 mb-1">Upload room photo</p>
                <p className="text-gray-500">Drag & drop or click to browse</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-400">
                <ImageIcon className="w-3.5 h-3.5" />
                Supports PNG, JPG, JPEG
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
