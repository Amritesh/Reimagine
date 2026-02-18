'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Layout from '@/components/common/Layout';
import UploadZone from '@/components/upload/UploadZone';
import StyleSelector, { STYLES } from '@/components/styles/StyleSelector';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import CompareSlider from '@/components/viewer/CompareSlider';
import ResultActions from '@/components/viewer/ResultActions';
import { RoomDesign } from '@/entities/RoomDesign';

export default function Home() {
  const [step, setStep] = useState<'upload' | 'style' | 'result'>('upload');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RoomDesign | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setStep('style');
    };
    reader.readAsDataURL(file);
  };

  const handleTransform = async () => {
    setIsProcessing(true);
    
    const selectedStyleConfig = STYLES.find(s => s.id === selectedStyle) || STYLES[0];
    
    // Log the prompt being used for the transformation
    console.log(`Transforming image using prompt: "${selectedStyleConfig.prompt}"`);
    
    // Simulate AI transformation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const styleImages: Record<string, string> = {
      'modern': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'scandinavian': 'https://images.unsplash.com/photo-1594894235439-6b89d8ffbb11?auto=format&fit=crop&q=80&w=1200',
      'industrial': 'https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?auto=format&fit=crop&q=80&w=1200',
      'bohemian': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      'minimalist': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      'mid-century': 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=1200',
      'coastal': 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&q=80&w=1200',
      'rustic': 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1200',
    };
    
    const newDesign: RoomDesign = {
      id: Math.random().toString(36).substr(2, 9),
      originalImage: originalImage!,
      styledImage: styleImages[selectedStyle] || styleImages['modern'],
      style: selectedStyle,
      createdAt: Date.now(),
      isFavorite: false,
    };
    
    setResult(newDesign);
    setIsProcessing(false);
    setStep('result');
  };

  const handleSave = () => {
    if (!result) return;
    const gallery = JSON.parse(localStorage.getItem('roomai-gallery') || '[]');
    localStorage.setItem('roomai-gallery', JSON.stringify([result, ...gallery]));
    setIsSaved(true);
  };

  const handleReset = () => {
    setStep('upload');
    setOriginalImage(null);
    setResult(null);
    setIsSaved(false);
  };

  return (
    <Layout>
      <LoadingOverlay isVisible={isProcessing} />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              AI-POWERED INTERIOR DESIGN
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Reimagine your <span className="text-teal-600">space</span> in seconds.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
              Upload a photo of your room and let our AI transform it into your dream style. 
              Professional interior design, powered by artificial intelligence.
            </p>
            <UploadZone 
              onUpload={handleUpload} 
              previewUrl={originalImage}
              onClear={() => setOriginalImage(null)}
            />
          </motion.div>
        )}

        {step === 'style' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <div className="sticky top-32">
                  <h2 className="text-2xl font-bold mb-6">Original Room</h2>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    <img src={originalImage!} alt="Original" className="w-full aspect-video object-cover" />
                  </div>
                  <button 
                    onClick={() => setStep('upload')}
                    className="mt-6 text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors flex items-center gap-2"
                  >
                    Change photo
                  </button>
                </div>
              </div>
              
              <div className="flex-[1.5]">
                <StyleSelector 
                  selectedStyle={selectedStyle}
                  onStyleSelect={setSelectedStyle}
                />
                
                <div className="mt-12 flex justify-end">
                  <button
                    onClick={handleTransform}
                    className="group flex items-center gap-3 bg-teal-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95"
                  >
                    Generate Design
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3">Transformation Complete</h2>
              <p className="text-gray-500 capitalize">Style Applied: {result.style}</p>
            </div>

            <CompareSlider 
              before={result.originalImage}
              after={result.styledImage}
            />

            <ResultActions 
              onReset={handleReset}
              onSave={handleSave}
              isSaved={isSaved}
              onShare={() => {}}
              onDownload={() => {}}
            />
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
