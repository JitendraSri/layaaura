import React, { useState } from 'react';
import { Address, Order, Coupon } from '../types';
import { CartItem } from './CartDrawer';
import { X, ShieldCheck, CreditCard, Truck, CheckCircle, MapPin, Plus } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  user: { name: string; email: string; phone: string } | null;
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  user,
  onOrderPlaced,
  onClearCart
}) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      fullName: user?.name || 'Ananya Sharma',
      phone: user?.phone || '+91 98765 43210',
      addressType: 'Home',
      houseNo: 'Flat 402, Royale Crest',
      street: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Online UPI/Card'>('Online UPI/Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // New address form state
  const [newName, setNewName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newHouse, setNewHouse] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

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
  const shipping = subtotal >= 2500 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: newName,
      phone: newPhone,
      addressType: 'Home',
      houseNo: newHouse,
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: false
    };
    setAddresses([...addresses, newAddr]);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `LAYA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: user?.name || selectedAddress.fullName,
        email: user?.email || 'customer@example.com',
        phone: selectedAddress.phone,
        items: cart.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.images[0],
          price: i.product.sellingPrice,
          quantity: i.quantity,
          selectedColor: i.product.color
        })),
        subtotal,
        discount,
        shippingCharge: shipping,
        total,
        status: paymentMethod === 'Online UPI/Card' ? 'Confirmed' : 'Pending Payment',
        paymentStatus: paymentMethod === 'Online UPI/Card' ? 'Paid' : 'Pending',
        paymentId: paymentMethod === 'Online UPI/Card' ? `pay_laya_${Math.random().toString(36).substring(7)}` : undefined,
        paymentMethod,
        shippingAddress: selectedAddress,
        courier: 'Blue Dart Express',
        expectedDeliveryDate: '2026-10-06',
        createdAt: new Date().toISOString(),
        statusHistory: [
          { status: 'Pending Payment', timestamp: new Date().toISOString(), note: 'Order initiated' },
          ...(paymentMethod === 'Online UPI/Card' ? [{ status: 'Confirmed' as const, timestamp: new Date().toISOString(), note: 'Payment verified securely' }] : [])
        ]
      };

      onOrderPlaced(newOrder);
      onClearCart();
      setIsProcessing(false);
      setSuccessOrder(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A7568] hover:text-[#3A2924]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
          {successOrder ? (
            <div className="text-center py-10 space-y-6">
              <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto animate-bounce" />
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A46A] font-semibold">Order Successful</span>
                <h2 className="text-3xl font-serif text-[#3A2924] mt-1">Thank You for Choosing LAYA AURA</h2>
                <p className="text-xs text-[#8A7568] mt-2">
                  Your order <span className="font-bold text-[#3A2924]">{successOrder.orderNumber}</span> has been successfully placed and is being prepared with artisanal care.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] text-left max-w-md mx-auto space-y-2 text-xs">
                <p className="font-bold text-[#3A2924] border-b pb-2">Order Summary</p>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-semibold text-emerald-700">{successOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address:</span>
                  <span className="text-right">{successOrder.shippingAddress.houseNo}, {successOrder.shippingAddress.city} - {successOrder.shippingAddress.pincode}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Paid:</span>
                  <span>₹{successOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#3A2924] text-[#F8F3EA] rounded-xl text-xs font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
              >
                Return to Store
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C9A46A] font-semibold">Secure Checkout</span>
                <h2 className="text-2xl font-serif text-[#3A2924] mt-1">Complete Your Acquisition</h2>
              </div>

              {/* Delivery Address Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-[#3A2924]">1. Delivery Address</h3>
                  <button 
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="text-xs font-semibold text-[#C9A46A] hover:underline flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showNewAddressForm ? (
                  <form onSubmit={handleAddNewAddress} className="bg-white p-6 rounded-xl border border-[#EFE4D3] space-y-4">
                    <h4 className="font-serif font-bold text-sm">New Delivery Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" required value={newName} onChange={e => setNewName(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="tel" placeholder="Mobile Number" required value={newPhone} onChange={e => setNewPhone(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="text" placeholder="House/Flat No, Building" required value={newHouse} onChange={e => setNewHouse(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="text" placeholder="Street/Area" required value={newStreet} onChange={e => setNewStreet(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="text" placeholder="City" required value={newCity} onChange={e => setNewCity(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="text" placeholder="State" required value={newState} onChange={e => setNewState(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                      <input type="text" placeholder="6-digit Pincode" required maxLength={6} value={newPincode} onChange={e => setNewPincode(e.target.value)} className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2 text-xs" />
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="px-6 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold">Save Address</button>
                      <button type="button" onClick={() => setShowNewAddressForm(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded text-xs">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAddressId === addr.id ? 'border-[#C9A46A] bg-white shadow-md' : 'border-[#EFE4D3] bg-white/60'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs text-[#3A2924]">{addr.fullName}</span>
                          <span className="text-[10px] bg-[#C9A46A]/20 text-[#3A2924] px-2 py-0.5 rounded font-semibold">{addr.addressType}</span>
                        </div>
                        <p className="text-xs text-[#8A7568]">{addr.houseNo}, {addr.street}</p>
                        <p className="text-xs text-[#8A7568]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-[#8A7568] mt-1">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Method Section */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#3A2924]">2. Payment Method</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div
                    onClick={() => setPaymentMethod('Online UPI/Card')}
                    className="p-4 rounded-xl border-2 border-[#C9A46A] bg-white shadow-md flex items-center space-x-3"
                  >
                    <CreditCard className="w-6 h-6 text-[#C9A46A]" />
                    <div>
                      <p className="font-bold text-xs text-[#3A2924]">Secure Online Payment (UPI / Credit Card / Debit Card)</p>
                      <p className="text-[10px] text-[#8A7568]">Instant secure verification & confirmed priority dispatch</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order total & confirmation */}
              <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] space-y-3">
                <div className="flex justify-between text-xs text-[#8A7568]">
                  <span>Items Subtotal ({cart.length} items):</span>
                  <span className="font-semibold text-[#3A2924]">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-700">
                    <span>Discount:</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#8A7568]">
                  <span>Insured Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#3A2924] pt-3 border-t border-[#EFE4D3]">
                  <span>Total Amount Payable:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-[#3A2924] text-[#F8F3EA] font-semibold rounded-xl hover:bg-[#4E3832] transition-colors flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing Secure Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-[#C9A46A]" />
                    <span>Place Order (₹{total.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
