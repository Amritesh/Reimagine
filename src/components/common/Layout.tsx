import Link from 'next/link';
import { Palette, Heart } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-900 font-sans">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-teal-600 p-2 rounded-xl group-hover:bg-teal-700 transition-colors">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-800 to-teal-600 bg-clip-text text-transparent">
              RoomAI
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Design Space
            </Link>
            <Link 
              href="/gallery" 
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Gallery
            </Link>
            <button className="bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-gray-900">RoomAI</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 RoomAI. Reimagining spaces with AI.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-teal-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
