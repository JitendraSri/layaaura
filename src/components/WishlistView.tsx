import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistViewProps {
  wishlistIds: string[];
  products: Product[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistIds,
  products,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
  setCurrentView
}) => {
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-[#EFE4D3] pb-6 mb-8 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Personal Vault</span>
          <h1 className="text-3xl font-serif text-[#3A2924] mt-1">My Wishlist ({wishlistedProducts.length})</h1>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs uppercase font-bold tracking-wider text-[#3A2924] hover:text-[#C9A46A] flex items-center space-x-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-16 text-center border border-[#EFE4D3]">
          <Heart className="w-16 h-16 text-[#8A7568]/30 mx-auto mb-4" />
          <p className="font-serif text-lg text-[#3A2924] mb-2">Your wishlist is currently empty</p>
          <p className="text-xs text-[#8A7568] mb-6">Save your favorite gold-coated jewellery pieces for later.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3 bg-[#3A2924] text-[#F8F3EA] rounded-xl text-xs font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
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
                
                <button
                  onClick={() => onRemoveWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white text-rose-600 hover:bg-rose-50 shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
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
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFE4D3] flex items-center justify-between">
                  <div>
                    <span className="text-base font-serif font-bold text-[#3A2924]">₹{product.sellingPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveWishlist(product.id);
                    }}
                    className="px-3 py-2 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-medium hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors flex items-center space-x-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
