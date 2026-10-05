import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Shield, Menu, X } from 'lucide-react';

interface CustomerHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  user: { name: string; email: string; phone: string } | null;
  onLogout: () => void;
  onSwitchToAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  announcementText?: string;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  user,
  onLogout,
  onSwitchToAdmin,
  searchQuery,
  setSearchQuery,
  announcementText
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'New Arrivals', id: 'new-arrivals' },
    { name: 'Sale', id: 'sale' },
    { name: 'Collections', id: 'collections' },
    { name: 'About', id: 'about' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F3EA]/95 backdrop-blur-md border-b border-[#EFE4D3]">
      {/* Top announcement bar */}
      <div className="bg-[#3A2924] text-[#F8F3EA] text-xs py-2 px-4 text-center font-medium tracking-wider flex justify-between items-center">
        <span className="hidden md:inline">Complimentary insured express shipping across India on orders above ₹2,500</span>
        <span className="mx-auto md:mx-0">{announcementText || '✦ Complimentary Velvet Gift Box & Anti-Tarnish Pouch with Every Order ✦'}</span>
        <button 
          onClick={onSwitchToAdmin}
          className="bg-[#C9A46A] hover:bg-[#D8B982] text-[#3A2924] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-1 transition-all shadow-xs cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#3A2924] p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="cursor-pointer text-center md:text-left"
        >
          <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] font-bold text-[#3A2924]">
            LAYA AURA
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A7568] -mt-1 font-medium">
            Beauty in Every Detail
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentView(link.id)}
              className={`text-sm tracking-widest uppercase transition-colors font-medium pb-1 border-b-2 ${
                currentView === link.id 
                  ? 'border-[#C9A46A] text-[#3A2924]' 
                  : 'border-transparent text-[#8A7568] hover:text-[#3A2924]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Actions: Search, Wishlist, Cart, Account */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Search Bar Input */}
          <div className="hidden lg:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="bg-white/80 border border-[#EFE4D3] text-xs rounded-full pl-9 pr-4 py-2 w-48 focus:w-64 transition-all focus:outline-none focus:border-[#C9A46A] text-[#3A2924]"
            />
            <Search className="absolute left-3 w-4 h-4 text-[#8A7568]" />
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative text-[#3A2924] hover:text-[#C9A46A] transition-colors p-1"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A46A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative text-[#3A2924] hover:text-[#C9A46A] transition-colors p-1"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#3A2924] text-[#F8F3EA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#C9A46A]">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-[#EFE4D3]/60 hover:bg-[#EFE4D3] px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-[#C9A46A]" />
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EFE4D3] rounded-lg shadow-lg py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#EFE4D3]">
                      <p className="font-bold text-[#3A2924]">{user.name}</p>
                      <p className="text-[#8A7568] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setCurrentView('account'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8F3EA] text-[#3A2924] font-medium"
                    >
                      My Account & Profile
                    </button>
                    <button
                      onClick={() => { setCurrentView('orders'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8F3EA] text-[#3A2924] font-medium"
                    >
                      My Orders & Tracking
                    </button>
                    <button
                      onClick={() => { onLogout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-[#3A2924] text-[#F8F3EA] px-4 py-2 rounded-full text-xs font-medium hover:bg-[#4E3832] transition-colors shadow-xs"
              >
                <User className="w-4 h-4 text-[#C9A46A]" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F3EA] border-b border-[#EFE4D3] px-4 pt-2 pb-6 space-y-3">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="bg-white border border-[#EFE4D3] text-sm rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-[#C9A46A]"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8A7568]" />
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setCurrentView(link.id); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 text-sm tracking-widest uppercase font-medium ${
                currentView === link.id ? 'text-[#C9A46A] font-bold' : 'text-[#3A2924]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
