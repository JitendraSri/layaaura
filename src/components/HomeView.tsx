import React, { useState, useEffect } from 'react';
import { Product, Banner, Review } from '../types';
import { ArrowRight, Star, Heart, ShoppingBag, Eye, Clock, Sparkles } from 'lucide-react';

interface HomeViewProps {
  banners: Banner[];
  products: Product[];
  reviews: Review[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  banners,
  products,
  reviews,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  setCurrentView,
  setSelectedCategory
}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const defaultBanner = {
    id: 'default',
    title: 'Exquisite Fine Jewellery & Gold-Look Masterpieces',
    subtitle: 'Crafted with precision, anti-tarnish protection, and timeless elegance.',
    buttonText: 'Explore Collection',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
    isActive: true
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const activeBanner = banners[currentBannerIndex] || banners[0] || defaultBanner;

  const categories = [
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Necklaces').length },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Earrings').length },
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Rings').length },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591472092-28e4e758a0b0?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Bracelets').length },
    { name: 'Bangles', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Bangles').length },
    { name: 'Jewellery Sets', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', count: products.filter(p => p.category === 'Jewellery Sets').length }
  ];

  const occasions = [
    { name: 'Wedding & Bridal', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', occasion: 'Wedding' },
    { name: 'Daily Chic', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80', occasion: 'Daily Wear' },
    { name: 'Festive & Celebration', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', occasion: 'Festive' },
    { name: 'Party & Evening', image: 'https://images.unsplash.com/photo-1611591472092-28e4e758a0b0?auto=format&fit=crop&w=600&q=80', occasion: 'Party' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden bg-[#3A2924]">
        <div className="absolute inset-0 z-0">
          <img 
            src={activeBanner.imageUrl} 
            alt={activeBanner.title}
            className="w-full h-full object-cover opacity-60 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#C9A46A]/20 backdrop-blur-md border border-[#C9A46A]/40 text-[#F8F3EA] px-3.5 py-1 rounded-full text-xs uppercase tracking-widest mb-4 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A46A]" />
            <span>Quiet Luxury & Fine Gold Plating</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F8F3EA] leading-tight mb-4">
            {activeBanner.title}
          </h1>
          <p className="text-base sm:text-lg text-[#EFE4D3]/90 font-light mb-8 leading-relaxed">
            {activeBanner.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                if (activeBanner.linkCategory) {
                  setSelectedCategory(activeBanner.linkCategory);
                }
                setCurrentView('shop');
              }}
              className="bg-[#C9A46A] hover:bg-[#D8B982] text-[#3A2924] font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>{activeBanner.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentBannerIndex === idx ? 'bg-[#C9A46A] w-8' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Curated Categories</span>
          <h2 className="text-3xl font-serif text-[#3A2924] mt-1">Explore Our Masterpieces</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentView('shop');
              }}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EFE4D3] shadow-xs hover:shadow-md transition-all text-center p-4"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden mb-3 border-2 border-[#C9A46A]/30 group-hover:border-[#C9A46A] transition-all">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-serif text-base font-semibold text-[#3A2924] group-hover:text-[#C9A46A] transition-colors">{cat.name}</h3>
              <p className="text-xs text-[#8A7568] mt-0.5">{cat.count} Designs</p>
            </div>
          ))}
        </div>
      </section>



      {/* New Arrivals & Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Handcrafted Masterpieces</span>
            <h2 className="text-3xl font-serif text-[#3A2924] mt-1">New Arrivals & Best Sellers</h2>
          </div>
          <button 
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#3A2924] hover:text-[#C9A46A] flex items-center space-x-1"
          >
            <span>View All Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-[#EFE4D3] shadow-xs hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F8F3EA]">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />
                  
                  {/* Discount badge */}
                  {product.discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-[#3A2924] text-[#C9A46A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.discountPercentage}% Off
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      isWishlisted ? 'bg-[#C9A46A] text-white' : 'bg-white/80 text-[#3A2924] hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8A7568]">{product.category}</span>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-base font-semibold text-[#3A2924] hover:text-[#C9A46A] cursor-pointer mt-1 line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1 text-xs text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-[#8A7568]">({product.reviewCount})</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EFE4D3] flex items-center justify-between">
                    <div>
                      <span className="text-base font-serif font-bold text-[#3A2924]">₹{product.sellingPrice.toLocaleString()}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xs text-[#8A7568] line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Lifestyle & Moments</span>
          <h2 className="text-3xl font-serif text-[#3A2924] mt-1">Shop By Occasion</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div 
              key={occ.name}
              onClick={() => {
                setSelectedCategory('All');
                setCurrentView('shop');
              }}
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-md"
            >
              <img src={occ.image} alt={occ.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-1">{occ.name}</h3>
                <p className="text-xs text-[#C9A46A] uppercase tracking-widest flex items-center space-x-1">
                  <span>Explore Edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story / About Section */}
      <section className="bg-[#EFE4D3]/40 py-16 border-y border-[#EFE4D3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">The LAYA AURA Maison</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3A2924]">Beauty in Every Detail</h2>
          <p className="text-base text-[#8A7568] leading-relaxed max-w-3xl mx-auto">
            At LAYA AURA, we believe jewellery is not merely adornment, but an intimate reflection of grace and timeless stories. Every piece undergoes rigorous microscopic crafting, utilizing 18K micro-gold plating and anti-tarnish protective barriers to ensure lasting radiance.
          </p>
          <div className="pt-4 flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-[#3A2924]">100%</p>
              <p className="text-xs text-[#8A7568] uppercase tracking-wider mt-1">Anti-Tarnish</p>
            </div>
            <div className="w-px bg-[#C9A46A]/30"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-[#3A2924]">18K</p>
              <p className="text-xs text-[#8A7568] uppercase tracking-wider mt-1">Gold Plating</p>
            </div>
            <div className="w-px bg-[#C9A46A]/30"></div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-[#3A2924]">50K+</p>
              <p className="text-xs text-[#8A7568] uppercase tracking-wider mt-1">Delighted Patrons</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Verified Patron Love</span>
          <h2 className="text-3xl font-serif text-[#3A2924] mt-1">Words From Our Patrons</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-600 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#3A2924] italic mb-4">"{rev.comment}"</p>
              </div>
              <div className="pt-4 border-t border-[#EFE4D3] flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[#3A2924]">{rev.customerName}</p>
                  <p className="text-[#8A7568]">{rev.productName}</p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="bg-[#EFE4D3] text-[#3A2924] px-2 py-0.5 rounded font-semibold text-[10px]">Verified Buyer</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
