import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Check, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  reviews,
  onAddReview
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // New review form
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    } else {
      alert('Please enter a valid 6-digit Indian Pincode.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      productId: product.id,
      productName: product.name,
      customerName: newName || 'Valued Patron',
      rating: newRating,
      comment: newComment,
      verifiedPurchase: true
    });
    setNewComment('');
    setNewName('');
    alert('Thank you! Your review has been submitted for moderation.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full text-[#3A2924] hover:bg-white shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#EFE4D3] shadow-sm">
                <img 
                  src={product.images[activeImageIndex] || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-[#3A2924] text-[#C9A46A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#C9A46A] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8A7568] mb-1">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>SKU: {product.sku}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2924]">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-[#8A7568]">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 bg-white/60 p-4 rounded-xl border border-[#EFE4D3]">
                <span className="text-3xl font-serif font-bold text-[#3A2924]">
                  ₹{product.sellingPrice.toLocaleString()}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-base text-[#8A7568] line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      You Save ₹{(product.originalPrice - product.sellingPrice).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center space-x-2 text-xs">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>In Stock ({product.stock} pieces available)</span>
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity selector & Add to Cart */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs uppercase tracking-wider text-[#8A7568] font-medium">Quantity:</span>
                  <div className="flex items-center border border-[#C9A46A]/50 rounded-lg bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-[#3A2924] hover:bg-[#F8F3EA] font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-[#3A2924]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-[#3A2924] hover:bg-[#F8F3EA] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    disabled={product.stock === 0}
                    className="flex-1 py-3.5 bg-[#3A2924] text-[#F8F3EA] font-semibold rounded-xl hover:bg-[#4E3832] transition-colors flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#C9A46A]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted 
                        ? 'bg-[#C9A46A] border-[#C9A46A] text-white' 
                        : 'bg-white border-[#EFE4D3] text-[#3A2924] hover:border-[#C9A46A]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Pincode delivery check */}
              <div className="bg-white p-4 rounded-xl border border-[#EFE4D3] space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#3A2924]">
                  <Truck className="w-4 h-4 text-[#C9A46A]" />
                  <span>Check Delivery & Pincode Serviceability</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value); setPincodeChecked(false); }}
                    placeholder="Enter 6-digit PIN"
                    className="flex-1 bg-[#F8F3EA] border border-[#EFE4D3] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C9A46A]"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold">
                    Check
                  </button>
                </form>
                {pincodeChecked && (
                  <p className="text-xs text-emerald-700 font-medium flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Express insured delivery available by {product.expectedDeliveryDays || 3} days. Cash on Delivery supported.</span>
                  </p>
                )}
              </div>

              {/* Assurance bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#8A7568]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A46A]" />
                  <span>100% Anti-Tarnish Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#C9A46A]" />
                  <span>Complimentary Velvet Box</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Details, Specs, Reviews */}
          <div className="mt-12 border-t border-[#EFE4D3] pt-8">
            <div className="flex space-x-6 border-b border-[#EFE4D3] pb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-sm font-serif pb-2 transition-all border-b-2 ${
                  activeTab === 'details' ? 'border-[#C9A46A] text-[#3A2924] font-bold' : 'border-transparent text-[#8A7568]'
                }`}
              >
                Product Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-sm font-serif pb-2 transition-all border-b-2 ${
                  activeTab === 'specs' ? 'border-[#C9A46A] text-[#3A2924] font-bold' : 'border-transparent text-[#8A7568]'
                }`}
              >
                Jewellery Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-sm font-serif pb-2 transition-all border-b-2 ${
                  activeTab === 'reviews' ? 'border-[#C9A46A] text-[#3A2924] font-bold' : 'border-transparent text-[#8A7568]'
                }`}
              >
                Customer Reviews ({productReviews.length})
              </button>
            </div>

            <div className="py-6 text-sm text-[#3A2924]">
              {activeTab === 'details' && (
                <div className="space-y-4 leading-relaxed">
                  <p>{product.description}</p>
                  <p className="text-xs text-[#8A7568]">
                    Designed for modern patrons seeking quiet luxury. Every LAYA AURA piece is nickel-free, lead-free, and hypoallergenic, complying with international jewelry safety standards.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl border border-[#EFE4D3]">
                  <div>
                    <span className="text-xs uppercase text-[#8A7568] font-medium">Base Material</span>
                    <p className="font-semibold">{product.specifications.material}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-[#8A7568] font-medium">Plating</span>
                    <p className="font-semibold">{product.specifications.plating}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-[#8A7568] font-medium">Stone Type</span>
                    <p className="font-semibold">{product.specifications.stoneType}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-[#8A7568] font-medium">Approx Weight</span>
                    <p className="font-semibold">{product.specifications.weight}</p>
                  </div>
                  {product.specifications.dimensions && (
                    <div className="sm:col-span-2">
                      <span className="text-xs uppercase text-[#8A7568] font-medium">Dimensions</span>
                      <p className="font-semibold">{product.specifications.dimensions}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-[#8A7568]">No reviews yet for this product. Be the first to share your experience!</p>
                  ) : (
                    <div className="space-y-4">
                      {productReviews.map((rev) => (
                        <div key={rev.id} className="bg-white p-4 rounded-xl border border-[#EFE4D3]">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-xs">{rev.customerName}</span>
                            <span className="text-[10px] text-[#8A7568]">{rev.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-amber-600 mb-2">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-[#3A2924]">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Write a review form */}
                  <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-xl border border-[#EFE4D3] space-y-4 mt-6">
                    <h4 className="font-serif font-bold text-base">Write a Review</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#8A7568]">Rating:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className={`w-6 h-6 ${newRating >= star ? 'text-amber-600' : 'text-gray-300'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C9A46A]"
                    />
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience with the jewellery..."
                      className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C9A46A]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
                    >
                      Submit Verified Review
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
