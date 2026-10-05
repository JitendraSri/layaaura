import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Heart, Shield, Check, Edit2, Plus, Trash2, Lock } from 'lucide-react';
import { Address, Order } from '../types';

interface AccountViewProps {
  user: { name: string; email: string; phone: string } | null;
  onUpdateUser: (updated: { name: string; email: string; phone: string }) => void;
  addresses: Address[];
  onAddAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
  orders: Order[];
  wishlistCount: number;
  setCurrentView: (v: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
  onUpdateUser,
  addresses,
  onAddAddress,
  onDeleteAddress,
  orders,
  wishlistCount,
  setCurrentView
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [successMessage, setSuccessMessage] = useState('');

  // New Address Form
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <User className="w-16 h-16 text-[#8A7568]/40 mx-auto" />
        <h2 className="text-2xl font-serif text-[#3A2924]">Please Sign In</h2>
        <p className="text-xs text-[#8A7568]">Sign in to access your LAYA AURA patron account, profile settings, and saved addresses.</p>
        <button 
          onClick={() => setCurrentView('home')}
          className="px-6 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email, phone });
    setSuccessMessage('Profile details updated successfully.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: name,
      phone,
      addressType,
      houseNo,
      street,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0
    };
    onAddAddress(newAddr);
    setShowNewAddress(false);
    setHouseNo('');
    setStreet('');
    setCity('');
    setState('');
    setPincode('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EFE4D3] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#C9A46A]/20 flex items-center justify-center text-[#3A2924] font-serif text-2xl font-bold border border-[#C9A46A]">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C9A46A] font-semibold">Valued Patron</span>
            <h1 className="text-2xl font-serif font-bold text-[#3A2924]">{user.name}</h1>
            <p className="text-xs text-[#8A7568]">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex space-x-3 text-xs">
          <div onClick={() => setCurrentView('wishlist')} className="bg-[#F8F3EA] px-4 py-2.5 rounded-xl border border-[#EFE4D3] cursor-pointer hover:border-[#C9A46A] text-center">
            <p className="font-serif font-bold text-base text-[#3A2924]">{wishlistCount}</p>
            <p className="text-[#8A7568]">Wishlist</p>
          </div>
          <div onClick={() => setCurrentView('orders')} className="bg-[#F8F3EA] px-4 py-2.5 rounded-xl border border-[#EFE4D3] cursor-pointer hover:border-[#C9A46A] text-center">
            <p className="font-serif font-bold text-base text-[#3A2924]">{orders.length}</p>
            <p className="text-[#8A7568]">Orders</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-[#EFE4D3] pb-2 text-sm font-serif">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2 border-b-2 transition-all ${activeTab === 'profile' ? 'border-[#C9A46A] text-[#3A2924] font-bold' : 'border-transparent text-[#8A7568]'}`}
        >
          Profile Details & Security
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-2 border-b-2 transition-all ${activeTab === 'addresses' ? 'border-[#C9A46A] text-[#3A2924] font-bold' : 'border-transparent text-[#8A7568]'}`}
        >
          Saved Addresses ({addresses.length})
        </button>
        <button
          onClick={() => setCurrentView('orders')}
          className="pb-2 border-b-2 border-transparent text-[#8A7568] hover:text-[#3A2924]"
        >
          My Orders & Tracking
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-[#EFE4D3] p-6 sm:p-8">
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className="max-w-xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3A2924] mb-1">Edit Account Details</h3>
              <p className="text-xs text-[#8A7568]">Update your personal credentials and contact information.</p>
            </div>

            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#8A7568]" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8F3EA] border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[#8A7568]" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8F3EA] border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-[#8A7568]" />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8F3EA] border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[#3A2924] text-[#F8F3EA] rounded-xl text-xs font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3A2924]">Saved Delivery Addresses</h3>
                <p className="text-xs text-[#8A7568]">Manage multiple addresses for seamless checkout.</p>
              </div>
              <button
                onClick={() => setShowNewAddress(!showNewAddress)}
                className="px-4 py-2 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold flex items-center space-x-1 hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            {showNewAddress && (
              <form onSubmit={handleAddressSubmit} className="bg-[#F8F3EA] p-6 rounded-xl border border-[#EFE4D3] space-y-4 text-xs max-w-xl">
                <h4 className="font-serif font-bold text-sm">Add New Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-[#8A7568] mb-1">Address Label</label>
                    <select value={addressType} onChange={e => setAddressType(e.target.value as any)} className="w-full bg-white border border-[#EFE4D3] rounded p-2">
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase text-[#8A7568] mb-1">House/Flat No.</label>
                    <input type="text" required value={houseNo} onChange={e => setHouseNo(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="Flat 402, Royale Crest" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block uppercase text-[#8A7568] mb-1">Street / Area</label>
                    <input type="text" required value={street} onChange={e => setStreet(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="Bandra West" />
                  </div>
                  <div>
                    <label className="block uppercase text-[#8A7568] mb-1">City</label>
                    <input type="text" required value={city} onChange={e => setCity(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="block uppercase text-[#8A7568] mb-1">State</label>
                    <input type="text" required value={state} onChange={e => setState(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="Maharashtra" />
                  </div>
                  <div>
                    <label className="block uppercase text-[#8A7568] mb-1">6-digit Pincode</label>
                    <input type="text" required maxLength={6} value={pincode} onChange={e => setPincode(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="400050" />
                  </div>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="submit" className="px-6 py-2 bg-[#3A2924] text-[#F8F3EA] rounded font-semibold">Save Address</button>
                  <button type="button" onClick={() => setShowNewAddress(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-[#F8F3EA]/60 p-5 rounded-xl border border-[#EFE4D3] flex justify-between items-start text-xs">
                  <div>
                    <span className="bg-[#C9A46A]/20 text-[#3A2924] px-2.5 py-0.5 rounded font-bold text-[10px]">{addr.addressType}</span>
                    <p className="font-bold text-[#3A2924] mt-2">{addr.fullName} ({addr.phone})</p>
                    <p className="text-[#8A7568] mt-1">{addr.houseNo}, {addr.street}</p>
                    <p className="text-[#8A7568]">{addr.city}, {addr.state} - {addr.pincode}</p>
                  </div>
                  <button onClick={() => onDeleteAddress(addr.id)} className="text-rose-600 hover:text-rose-800 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
