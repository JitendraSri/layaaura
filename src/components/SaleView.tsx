import React from 'react';
import { Product, Sale } from '../types';
import { Star, Heart, ShoppingBag, Tag, Sparkles } from 'lucide-react';

interface SaleViewProps {
  products: Product[];
  sales: Sale[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const SaleView: React.FC<SaleViewProps> = ({
  products,
  sales,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const activeSales = sales.filter(s => s.isActive);
  const saleProductIds = activeSales.flatMap(s => s.productIds);
  const saleProducts = products.filter(p => saleProductIds.includes(p.id) || p.discountPercentage > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#3A2924] to-[#4E3832] rounded-2xl p-8 sm:p-12 text-[#F8F3EA] shadow-xl relative overflow-hidden border border-[#C9A46A]/30 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A46A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center space-x-1.5 bg-[#C9A46A] text-[#3A2924] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5" />
            <span>Festive & Seasonal Reductions</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold">Exclusive Sale Events</h1>
          <p className="text-sm text-[#EFE4D3]/90 leading-relaxed">
            Discover handcrafted 18K gold-plated masterpieces at privileged pricing. Limited time celebratory reductions across our artisanal catalogue.
          </p>
        </div>
      </div>

      {/* Active Sales List */}
      {activeSales.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-[#3A2924]">Active Festive Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSales.map((sale) => (
              <div key={sale.id} className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#3A2924]">{sale.saleName}</h3>
                  <p className="text-xs text-[#8A7568] mt-1">Valid until {new Date(sale.endDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-[#C9A46A] text-[#3A2924] px-4 py-2 rounded-lg font-serif font-bold text-sm">
                  {sale.discountPercentage}% OFF
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products on Sale */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-[#EFE4D3] pb-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-[#3A2924]">Sale Collection ({saleProducts.length})</h2>
            <p className="text-xs text-[#8A7568]">Handcrafted gold-look jewellery currently on special reduction</p>
          </div>
        </div>

        {saleProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#EFE4D3] space-y-3">
            <Sparkles className="w-12 h-12 text-[#C9A46A] mx-auto animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-[#3A2924]">No Sale Events Active Right Now</h3>
            <p className="text-xs text-[#8A7568] max-w-sm mx-auto">
              Please check back soon, or visit the Admin Portal to create a new Sale Event and apply special discounts to your products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => {
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
                        {product.discountPercentage}% OFF
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
        )}
      </div>
    </div>
  );
};
