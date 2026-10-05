import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Star, Heart, ShoppingBag, SlidersHorizontal, Search, X } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Earrings', 'Necklaces', 'Rings', 'Bracelets', 'Bangles', 'Jewellery Sets'];
  const styles = ['All', 'Minimal', 'Traditional', 'Pearl', 'Gold-Look', 'Contemporary'];
  const occasions = ['All', 'Wedding', 'Daily Wear', 'Party', 'Office Wear', 'Gifting', 'Festive'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStyle = selectedStyle === 'All' || p.style === selectedStyle;
      const matchesOccasion = selectedOccasion === 'All' || (p.occasions && p.occasions.includes(selectedOccasion));
      const matchesPrice = p.sellingPrice <= maxPrice;
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStyle && matchesOccasion && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-high') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1;
      return 0; // featured
    });
  }, [products, selectedCategory, selectedStyle, selectedOccasion, maxPrice, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#EFE4D3] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Exquisite Catalogue</span>
          <h1 className="text-3xl font-serif text-[#3A2924] mt-1">
            {selectedCategory === 'All' ? 'All Jewellery Collections' : selectedCategory}
          </h1>
          <p className="text-xs text-[#8A7568] mt-1">Showing {filteredProducts.length} handcrafted pieces</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          {/* Sort selector */}
          <div className="flex items-center space-x-2 bg-white border border-[#EFE4D3] rounded-lg px-3 py-2 text-xs">
            <span className="text-[#8A7568]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-[#3A2924] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center space-x-1 bg-[#3A2924] text-[#F8F3EA] px-4 py-2 rounded-lg text-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-6 rounded-xl border border-[#EFE4D3] h-fit`}>
          <div className="flex justify-between items-center lg:hidden">
            <h3 className="font-serif font-bold text-lg">Filters</h3>
            <button onClick={() => setMobileFilterOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#3A2924] font-bold mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${
                    selectedCategory === cat ? 'bg-[#C9A46A]/20 text-[#3A2924] font-bold' : 'text-[#8A7568] hover:bg-[#F8F3EA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-[#EFE4D3]">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-bold text-[#3A2924]">Max Price</span>
              <span className="text-[#C9A46A] font-bold">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C9A46A]"
            />
          </div>

          {/* Styles */}
          <div className="pt-4 border-t border-[#EFE4D3]">
            <h4 className="text-xs uppercase tracking-wider text-[#3A2924] font-bold mb-3">Jewellery Style</h4>
            <div className="space-y-1.5">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`block w-full text-left text-xs py-1 px-2 rounded transition-colors ${
                    selectedStyle === style ? 'bg-[#C9A46A]/20 text-[#3A2924] font-bold' : 'text-[#8A7568] hover:bg-[#F8F3EA]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions */}
          <div className="pt-4 border-t border-[#EFE4D3]">
            <h4 className="text-xs uppercase tracking-wider text-[#3A2924] font-bold mb-3">Occasion</h4>
            <div className="space-y-1.5">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`block w-full text-left text-xs py-1 px-2 rounded transition-colors ${
                    selectedOccasion === occ ? 'bg-[#C9A46A]/20 text-[#3A2924] font-bold' : 'text-[#8A7568] hover:bg-[#F8F3EA]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStyle('All');
              setSelectedOccasion('All');
              setMaxPrice(20000);
              setSearchQuery('');
            }}
            className="w-full py-2 bg-[#F8F3EA] text-[#3A2924] text-xs font-semibold rounded hover:bg-[#EFE4D3] transition-colors"
          >
            Reset All Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#EFE4D3]">
              <p className="text-lg font-serif text-[#3A2924] mb-2">No jewellery found matching your criteria</p>
              <p className="text-xs text-[#8A7568] mb-6">Try broadening your search or resetting filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStyle('All');
                  setSelectedOccasion('All');
                  setMaxPrice(20000);
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
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
                      
                      {product.discountPercentage > 0 && (
                        <span className="absolute top-3 left-3 bg-[#3A2924] text-[#C9A46A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {product.discountPercentage}% Off
                        </span>
                      )}

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
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#8A7568]">
                          <span>{product.category}</span>
                          <span>{product.style}</span>
                        </div>
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
          )}
        </div>
      </div>
    </div>
  );
};
