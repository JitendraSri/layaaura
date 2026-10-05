import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; phone: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLoginSuccess({
        name: email.split('@')[0] || 'Ananya Sharma',
        email: email || 'ananya.sharma@example.com',
        phone: '+91 98765 43210'
      });
    } else {
      onLoginSuccess({
        name: name || 'New Customer',
        email: email,
        phone: phone || '+91 98765 43210'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A7568] hover:text-[#3A2924] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-[#C9A46A] font-semibold">LAYA AURA</span>
            <h2 className="text-2xl font-serif text-[#3A2924] mt-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-[#8A7568] mt-1">
              {isLogin ? 'Sign in to access your wishlist, orders and exclusive perks' : 'Join LAYA AURA for exquisite fine jewellery privileges'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A7568] mb-1 font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-[#8A7568]" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ananya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A7568] mb-1 font-medium">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-[#8A7568]" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A7568] mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#8A7568]" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A7568] mb-1 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[#8A7568]" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE4D3] rounded-lg text-[#3A2924] focus:outline-none focus:border-[#C9A46A]"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center text-[#8A7568] cursor-pointer">
                  <input type="checkbox" className="mr-2 accent-[#C9A46A]" /> Remember me
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to email.'); }} className="text-[#C9A46A] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3 bg-[#3A2924] text-[#F8F3EA] font-medium rounded-lg hover:bg-[#4E3832] transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-5 h-5 text-[#C9A46A]" />
              <span>{isLogin ? 'Sign In Securely' : 'Create Account'}</span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#8A7568]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#3A2924] font-semibold underline hover:text-[#C9A46A]"
            >
              {isLogin ? 'Sign up now' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
