'use client';

import { motion } from 'framer-motion';
import { Heart, Trash2, Maximize2 } from 'lucide-react';
import { RoomDesign } from '@/entities/RoomDesign';
import { cn } from '@/lib/utils';

interface DesignCardProps {
  design: RoomDesign;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (design: RoomDesign) => void;
}

export default function DesignCard({ design, onToggleFavorite, onDelete, onView }: DesignCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={design.styledImage} 
          alt={design.style}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={() => onToggleFavorite(design.id)}
            className={cn(
              "p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg",
              design.isFavorite 
                ? "bg-rose-500 text-white" 
                : "bg-white/20 text-white hover:bg-white/40"
            )}
          >
            <Heart className={cn("w-5 h-5", design.isFavorite && "fill-current")} />
          </button>
          <button
            onClick={() => onDelete(design.id)}
            className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all shadow-lg"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => onView(design)}
          className="absolute bottom-4 left-4 right-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/30"
        >
          <Maximize2 className="w-4 h-4" />
          View Design
        </button>
      </div>

      <div className="p-5 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900 capitalize">{design.style} Style</h3>
          <p className="text-xs text-gray-400 font-medium">
            {new Date(design.createdAt).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <div className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
          AI Generated
        </div>
      </div>
    </motion.div>
  );
}
