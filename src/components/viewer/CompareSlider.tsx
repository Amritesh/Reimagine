'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CompareSliderProps {
  before: string;
  after: string;
}

export default function CompareSlider({ before, after }: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(x, 0), 100));
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isResizing) handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (isResizing) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-col-resize select-none"
      onMouseDown={() => setIsResizing(true)}
      onTouchStart={() => setIsResizing(true)}
    >
      {/* After Image */}
      <img 
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img 
          src={before} 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-col-resize"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-teal-600">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-teal-600 rounded-full" />
            <div className="w-0.5 h-4 bg-teal-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-none">
        Original
      </div>
      <div className="absolute bottom-6 right-6 bg-teal-600 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-none">
        Reimagined
      </div>
    </div>
  );
}
