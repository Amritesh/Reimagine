'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyleOption } from '@/entities/RoomDesign';

interface StyleCardProps {
  style: StyleOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function StyleCard({ style, isSelected, onSelect }: StyleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(style.id)}
      className={cn(
        "relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300",
        isSelected 
          ? "border-teal-600 shadow-xl shadow-teal-600/10" 
          : "border-transparent hover:border-gray-200"
      )}
    >
      <div className="aspect-[4/3] w-full relative">
        <img 
          src={style.image} 
          alt={style.label}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity",
          isSelected ? "opacity-40" : "opacity-0 group-hover:opacity-20"
        )} />
        
        {isSelected && (
          <div className="absolute top-3 right-3 bg-teal-600 text-white p-1.5 rounded-full shadow-lg">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className={cn(
        "p-4 text-center transition-colors",
        isSelected ? "bg-teal-50" : "bg-white"
      )}>
        <span className={cn(
          "text-sm font-semibold uppercase tracking-wider",
          isSelected ? "text-teal-700" : "text-gray-600"
        )}>
          {style.label}
        </span>
      </div>
    </motion.div>
  );
}
