import React, { useState } from 'react';
import { Product, Coupon } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  coupons,
  appliedCoupon,
  onApplyCoupon,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.sellingPrice * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.min((subtotal * appliedCoupon.discountValue) / 100, appliedCoupon.maxDiscount || subtotal);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCouponCode = (e: React.FormEvent) => {
    e.preventDefault();
    const found = coupons.find(c => c.code.toUpperCase() === couponInput.toUpperCase() && c.isActive);
    if (found) {
      if (subtotal < found.minOrderValue) {
        alert(`Minimum order value of ₹${found.minOrderValue} required for coupon ${found.code}`);
      } else {
        onApplyCoupon(found);
        setCouponInput('');
        alert(`Coupon ${found.code} applied successfully!`);
      }
    } else {
      alert('Invalid or expired coupon code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-[#F8F3EA] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#C9A46A]/35">
        {/* Header */}
        <div className="p-6 border-b border-[#EFE4D3] flex justify-between items-center bg-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C9A46A]" />
            <h2 className="font-serif font-bold text-lg text-[#3A2924]">Your Shopping Bag ({cart.length})</h2>
          </div>
          <button onClick={onClose} className="text-[#8A7568] hover:text-[#3A2924]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-[#8A7568]/30 mx-auto mb-4" />
              <p className="font-serif text-lg text-[#3A2924]">Your shopping bag is empty</p>
              <p className="text-xs text-[#8A7568] mt-1">Discover our gold-coated masterpieces and add to cart.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="bg-white p-4 rounded-xl border border-[#EFE4D3] flex space-x-4 items-center">
                <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg border border-[#EFE4D3]" />
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-sm text-[#3A2924] line-clamp-1">{item.product.name}</h4>
                  <p className="text-xs text-[#C9A46A] font-bold mt-1">₹{item.product.sellingPrice.toLocaleString()}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border border-[#EFE4D3] rounded bg-[#F8F3EA]">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EFE4D3] space-y-4">
            {/* Coupon input */}
            <div>
              {appliedCoupon ? (
                <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                  <span className="font-semibold text-emerald-800">Coupon "{appliedCoupon.code}" applied (-₹{discount.toLocaleString()})</span>
                  <button onClick={() => onApplyCoupon(null)} className="text-rose-600 font-bold hover:underline">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponCode} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-4 h-4 text-[#8A7568]" />
                    <input 
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. LAYAURA10)"
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F3EA] border border-[#EFE4D3] rounded text-xs focus:outline-none focus:border-[#C9A46A]"
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#3A2924] text-[#F8F3EA] text-xs font-semibold rounded hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors">
                    Apply
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-[#8A7568] border-t border-[#EFE4D3] pt-3">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-[#3A2924]">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotional Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#3A2924] pt-2 border-t border-[#EFE4D3]">
                <span>Final Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#3A2924] text-[#F8F3EA] font-semibold rounded-xl hover:bg-[#4E3832] transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C9A46A]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
