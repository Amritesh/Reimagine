'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Filter, Trash2, X } from 'lucide-react';
import Layout from '@/components/common/Layout';
import DesignCard from '@/components/gallery/DesignCard';
import CompareSlider from '@/components/viewer/CompareSlider';
import { RoomDesign } from '@/entities/RoomDesign';

export default function GalleryPage() {
  const [designs, setDesigns] = useState<RoomDesign[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [selectedDesign, setSelectedDesign] = useState<RoomDesign | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('roomai-gallery') || '[]');
    setDesigns(saved);
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = designs.map(d => 
      d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
    );
    setDesigns(updated);
    localStorage.setItem('roomai-gallery', JSON.stringify(updated));
  };

  const deleteDesign = (id: string) => {
    const updated = designs.filter(d => d.id !== id);
    setDesigns(updated);
    localStorage.setItem('roomai-gallery', JSON.stringify(updated));
  };

  const filteredDesigns = designs.filter(d => 
    filter === 'all' ? true : d.isFavorite
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Design Gallery</h1>
            <p className="text-gray-500">View and manage your AI-reimagined spaces.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === 'all' 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                  : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              All Designs
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                filter === 'favorites' 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                  : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${filter === 'favorites' ? 'fill-current' : ''}`} />
              Favorites
            </button>
          </div>
        </header>

        {filteredDesigns.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteDesign}
                  onView={setSelectedDesign}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No designs found</h3>
            <p className="text-gray-500 max-w-sm">
              {filter === 'favorites' 
                ? "You haven't favorited any designs yet." 
                : "You haven't generated any designs yet. Go to the Design Space to start."}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col">
                <div className="p-2">
                  <CompareSlider 
                    before={selectedDesign.originalImage}
                    after={selectedDesign.styledImage}
                  />
                </div>
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold capitalize">{selectedDesign.style} Style</h2>
                    <p className="text-gray-500">Generated on {new Date(selectedDesign.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleFavorite(selectedDesign.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                        selectedDesign.isFavorite 
                          ? 'bg-rose-50 text-rose-600' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${selectedDesign.isFavorite ? 'fill-current' : ''}`} />
                      {selectedDesign.isFavorite ? 'Favorited' : 'Add to Favorites'}
                    </button>
                    <button
                      onClick={() => deleteDesign(selectedDesign.id)}
                      className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
