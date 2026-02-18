'use client';

import { Download, Share2, Heart, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultActionsProps {
  onReset: () => void;
  onSave: () => void;
  isSaved: boolean;
  onShare: () => void;
  onDownload: () => void;
}

export default function ResultActions({ onReset, onSave, isSaved, onShare, onDownload }: ResultActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all active:scale-95"
      >
        <RotateCcw className="w-5 h-5" />
        Start Over
      </button>

      <button
        onClick={onSave}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all active:scale-95 shadow-lg",
          isSaved 
            ? "bg-rose-50 text-rose-600 shadow-rose-100" 
            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        )}
      >
        <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
        {isSaved ? 'Saved to Gallery' : 'Save Design'}
      </button>

      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-8 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20"
      >
        <Download className="w-5 h-5" />
        Download
      </button>

      <button
        onClick={onShare}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all active:scale-95"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
    </div>
  );
}
