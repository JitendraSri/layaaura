import React from 'react';
import { Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsViewProps {
  products: Product[];
  onSelectCollection: (categoryName: string) => void;
  setCurrentView: (view: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  products,
  onSelectCollection,
  setCurrentView
}) => {
  const collections = [
    {
      title: 'Polki & Kundan Royal Edit',
      subtitle: 'Uncut polki masterpieces crafted for royal weddings and gala evenings.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      category: 'Jewellery Sets'
    },
    {
      title: 'Solitaire & Diamond-Cut Rings',
      subtitle: 'Brilliant stones set in 14K champagne gold finish for daily elegance.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      category: 'Rings'
    },
    {
      title: 'Pearl Symphony Drops',
      subtitle: 'Freshwater baroque pearls suspended from geometric gold studs.',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      category: 'Earrings'
    },
    {
      title: 'Antique Temple Heritage',
      subtitle: 'South Indian temple architecture inspired gold necklaces and chokers.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      category: 'Necklaces'
    },
    {
      title: 'Dual-Tone Cuffs & Kadas',
      subtitle: 'Sleek modern bracelets and openable kadas with anti-tarnish layering.',
      image: 'https://images.unsplash.com/photo-1611591472092-28e4e758a0b0?auto=format&fit=crop&w=800&q=80',
      category: 'Bracelets'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Curated Maison Edits</span>
        <h1 className="text-4xl font-serif text-[#3A2924]">LAYA AURA Collections</h1>
        <p className="text-xs text-[#8A7568] max-w-xl mx-auto">
          Explore our meticulously thematic fine jewellery collections, designed to resonate with quiet luxury and timeless femininity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col, idx) => (
          <div 
            key={idx}
            onClick={() => {
              onSelectCollection(col.category);
              setCurrentView('shop');
            }}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-[#EFE4D3]"
          >
            <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A46A] font-semibold">Curated Edit</span>
              <h3 className="text-2xl font-serif font-bold">{col.title}</h3>
              <p className="text-xs text-[#EFE4D3]/90">{col.subtitle}</p>
              <div className="pt-2 flex items-center space-x-1 text-xs text-[#C9A46A] font-semibold uppercase tracking-wider group-hover:underline">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
