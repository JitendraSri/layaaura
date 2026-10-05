import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface PolicyViewsProps {
  view: string;
  setCurrentView: (v: string) => void;
}

export const PolicyViews: React.FC<PolicyViewsProps> = ({ view, setCurrentView }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  if (view === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">The LAYA AURA Maison</span>
          <h1 className="text-4xl font-serif text-[#3A2924]">Beauty in Every Detail</h1>
          <p className="text-base text-[#8A7568] max-w-2xl mx-auto leading-relaxed">
            Founded on the principles of quiet luxury and refined femininity, LAYA AURA crafts exceptional gold-coated and fashion jewellery designed to celebrate life's most precious moments with understated elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="bg-white p-8 rounded-xl border border-[#EFE4D3] text-center space-y-3">
            <div className="w-12 h-12 bg-[#C9A46A]/20 rounded-full flex items-center justify-center mx-auto text-[#C9A46A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg">18K Micro Gold Plating</h3>
            <p className="text-xs text-[#8A7568]">Engineered with durable anti-tarnish protective layering for lifelong brilliance.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-[#EFE4D3] text-center space-y-3">
            <div className="w-12 h-12 bg-[#C9A46A]/20 rounded-full flex items-center justify-center mx-auto text-[#C9A46A]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg">Insured Delivery</h3>
            <p className="text-xs text-[#8A7568]">Safe, tamper-evident packaging delivered securely across India.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-[#EFE4D3] text-center space-y-3">
            <div className="w-12 h-12 bg-[#C9A46A]/20 rounded-full flex items-center justify-center mx-auto text-[#C9A46A]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg">Hassle-Free Returns</h3>
            <p className="text-xs text-[#8A7568]">7-day easy exchange and return policy for complete peace of mind.</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Concierge Support</span>
          <h1 className="text-3xl font-serif text-[#3A2924] mt-1">Contact LAYA AURA</h1>
          <p className="text-xs text-[#8A7568] mt-1">We are here to assist with your jewellery inquiries and orders.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EFE4D3] p-8 shadow-sm">
          {contactSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#3A2924]">Message Received</h3>
              <p className="text-xs text-[#8A7568]">Thank you for reaching out. Our concierge will respond within 24 hours.</p>
              <button onClick={() => setContactSubmitted(false)} className="px-6 py-2 bg-[#3A2924] text-[#F8F3EA] text-xs font-semibold rounded">Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Your Name</label>
                <input 
                  type="text" 
                  required 
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5" 
                  placeholder="Ananya Sharma"
                />
              </div>
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5" 
                  placeholder="ananya@example.com"
                />
              </div>
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Message / Inquiry</label>
                <textarea 
                  required 
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5" 
                  placeholder="How can we assist you today?"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#3A2924] text-[#F8F3EA] font-semibold rounded hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Message to Concierge</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Policies (Shipping, Return, Privacy, Terms)
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-serif text-[#3A2924] capitalize">{view.replace('-', ' ')}</h1>
      <div className="bg-white p-8 rounded-2xl border border-[#EFE4D3] space-y-4 text-xs leading-relaxed text-[#3A2924]">
        <p>
          At LAYA AURA (“Beauty in Every Detail”), we are committed to ensuring your utmost satisfaction with our fine fashion and gold-coated jewellery.
        </p>
        <h3 className="font-serif font-bold text-sm pt-2">1. Overview & Commitment</h3>
        <p>
          All orders are crafted under stringent quality controls. Our anti-tarnish 18K micro-gold plating guarantees long-lasting brilliance when cared for as per our jewellery care guide.
        </p>
        <h3 className="font-serif font-bold text-sm pt-2">2. Secure Handling & Dispatch</h3>
        <p>
          Orders are dispatched within 24-48 hours via insured courier partners with real-time AWB tracking numbers provided upon dispatch.
        </p>
        <h3 className="font-serif font-bold text-sm pt-2">3. Customer Support</h3>
        <p>
          For any questions regarding your acquisition, please contact our concierge via our contact portal or email support@layaura.in.
        </p>
      </div>
    </div>
  );
};
