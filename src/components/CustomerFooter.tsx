import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const CustomerFooter: React.FC = () => {
  return (
    <footer className="bg-[#3A2924] text-[#F8F3EA] pt-16 pb-12 border-t border-[#C9A46A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#C9A46A]/20 rounded-full text-[#C9A46A]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold">Insured Shipping</h4>
              <p className="text-xs text-[#EFE4D3]/70">Free across India on ₹2,500+</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#C9A46A]/20 rounded-full text-[#C9A46A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold">18K Gold Plated</h4>
              <p className="text-xs text-[#EFE4D3]/70">Anti-tarnish protective coating</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#C9A46A]/20 rounded-full text-[#C9A46A]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold">Easy Returns</h4>
              <p className="text-xs text-[#EFE4D3]/70">7-day hassle-free exchange & return</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#C9A46A]/20 rounded-full text-[#C9A46A]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold">Handcrafted Perfection</h4>
              <p className="text-xs text-[#EFE4D3]/70">Master artisan jewellery design</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <h3 className="text-2xl font-serif tracking-[0.2em] font-bold text-[#F8F3EA] mb-2">LAYA AURA</h3>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A46A] mb-4">Beauty in Every Detail</p>
            <p className="text-xs text-[#EFE4D3]/80 leading-relaxed mb-4">
              A modern boutique maison for gold-coated and fashion jewellery embodying quiet luxury, refined femininity, and artisanal craftsmanship.
            </p>
            <div className="flex space-x-3 text-[#C9A46A]">
              <span className="text-xs">✦ 18K Micro Gold</span>
              <span className="text-xs">✦ Certified Quality</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A46A] mb-4 font-semibold">Collections</h4>
            <ul className="space-y-2.5 text-xs text-[#EFE4D3]/80">
              <li><a href="#shop" className="hover:text-white transition-colors">Polki & Kundan Sets</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Solitaire Rings</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Pearl Drop Earrings</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Temple Heritage Chokers</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Dual-Tone Cuffs & Kadas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A46A] mb-4 font-semibold">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-[#EFE4D3]/80">
              <li><a href="#orders" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Pincode Check</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Returns & Refunds Policy</a></li>
              <li><a href="#care" className="hover:text-white transition-colors">Jewellery Care Guide</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A46A] mb-4 font-semibold">Stay Connected</h4>
            <p className="text-xs text-[#EFE4D3]/80 mb-4">
              Subscribe to receive private previews of festive collections and limited flash deals.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to LAYA AURA.'); }} className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C9A46A]"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-[#C9A46A] text-[#3A2924] font-semibold rounded text-xs hover:bg-[#D8B982] transition-colors"
              >
                Join Private List
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#EFE4D3]/60">
          <p>© {new Date().getFullYear()} LAYA AURA. All rights reserved. Crafted with Beauty in Every Detail.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#contact" className="hover:text-white">Contact Concierge</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
