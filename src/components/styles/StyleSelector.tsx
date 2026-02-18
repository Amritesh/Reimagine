'use client';

import { StyleOption } from '@/entities/RoomDesign';
import StyleCard from './StyleCard';

export const STYLES: StyleOption[] = [
  {
    id: 'modern',
    label: 'Modern',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    prompt: 'Transform this room into a sleek, modern space with clean lines, neutral colors, and contemporary furniture.'
  },
  {
    id: 'scandinavian',
    label: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    prompt: 'Redesign this room in Scandinavian style: light wood, white walls, cozy textures, and functional minimalism.'
  },
  {
    id: 'industrial',
    label: 'Industrial',
    image: 'https://images.unsplash.com/photo-1551133990-7220078021f1?auto=format&fit=crop&q=80&w=800',
    prompt: 'Apply industrial aesthetic: exposed brick, metal accents, dark tones, and raw materials.'
  },
  {
    id: 'bohemian',
    label: 'Bohemian',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    prompt: 'Transform to Bohemian style: eclectic patterns, many plants, vibrant textiles, and relaxed atmosphere.'
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    prompt: 'Convert to minimalist design: essential furniture only, decluttered space, and a monochrome palette.'
  },
  {
    id: 'mid-century',
    label: 'Mid-Century',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=800',
    prompt: 'Redesign with mid-century modern influence: organic shapes, tapered legs, and retro-inspired colors.'
  },
  {
    id: 'coastal',
    label: 'Coastal',
    image: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&q=80&w=800',
    prompt: 'Apply coastal style: airy feel, blue and white color scheme, natural fibers, and light-filled space.'
  },
  {
    id: 'rustic',
    label: 'Rustic',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
    prompt: 'Transform to rustic style: weathered wood, stone elements, warm earthy tones, and a farmhouse feel.'
  },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (id: string) => void;
}

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <section className="py-12">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
        <p className="text-gray-500 max-w-lg text-center">
          Select an interior design style that matches your vision. Our AI will reimagine your room based on this choice.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STYLES.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            isSelected={selectedStyle === style.id}
            onSelect={onStyleSelect}
          />
        ))}
      </div>
    </section>
  );
}
