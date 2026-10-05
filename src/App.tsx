import React, { useState, useEffect } from 'react';
import { 
  initialProducts, initialSales, initialCoupons, 
  initialReviews, initialCustomers, initialBanners, initialOrders, initialStoreSettings 
} from './data/mockData';
import { Product, Sale, Coupon, Review, Customer, Banner, Order, OrderStatus, StoreSettings } from './types';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerFooter } from './components/CustomerFooter';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistView } from './components/WishlistView';
import { OrdersView } from './components/OrdersView';
import { AuthModal } from './components/AuthModal';
import { AdminPortal } from './components/AdminPortal';
import { PolicyViews } from './components/PolicyViews';
import { CollectionsView } from './components/CollectionsView';
import { AccountView } from './components/AccountView';
import { SaleView } from './components/SaleView';
import { Address } from './types';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Application Data States with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('laya_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('laya_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('laya_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('laya_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('laya_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('laya_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('laya_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('laya_settings');
    return saved ? JSON.parse(saved) : initialStoreSettings;
  });

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('laya_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('laya_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('laya_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('laya_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Cart & Wishlist & User Session
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p1', 'p2']);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210'
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      fullName: 'Ananya Sharma',
      phone: '+91 98765 43210',
      addressType: 'Home',
      houseNo: 'Flat 402, Royale Crest',
      street: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true
    }
  ]);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddReview = (newRev: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: true
    };
    setReviews([rev, ...reviews]);
  };

  if (isAdminMode) {
    return (
      <AdminPortal
        products={products}
        setProducts={setProducts}
        sales={sales}
        setSales={setSales}
        coupons={coupons}
        setCoupons={setCoupons}
        reviews={reviews}
        setReviews={setReviews}
        customers={customers}
        setCustomers={setCustomers}
        banners={banners}
        setBanners={setBanners}
        orders={orders}
        setOrders={setOrders}
        storeSettings={storeSettings}
        setStoreSettings={setStoreSettings}
        onSwitchToCustomer={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#3A2924] flex flex-col selection:bg-[#C9A46A]/30">
      <CustomerHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setCurrentView('wishlist')}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        onSwitchToAdmin={() => setIsAdminMode(true)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => { setSearchQuery(q); setCurrentView('shop'); }}
        announcementText={storeSettings.announcementText}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            banners={banners}
            products={products}
            reviews={reviews}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {(currentView === 'shop' || currentView === 'new-arrivals') && (
          <ShopView
            products={currentView === 'new-arrivals' ? products.filter(p => p.isNewArrival) : products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'collections' && (
          <CollectionsView
            products={products}
            onSelectCollection={(cat) => {
              setSelectedCategory(cat);
              setCurrentView('shop');
            }}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'sale' && (
          <SaleView
            products={products}
            sales={sales}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {(currentView === 'about' || currentView === 'contact' || currentView === 'shipping-policy' || currentView === 'return-policy' || currentView === 'privacy' || currentView === 'terms') && (
          <PolicyViews view={currentView} setCurrentView={setCurrentView} />
        )}

        {currentView === 'wishlist' && (
          <WishlistView
            wishlistIds={wishlistIds}
            products={products}
            onRemoveWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'account' && (
          <AccountView
            user={user}
            onUpdateUser={(updated) => setUser(updated)}
            addresses={addresses}
            onAddAddress={(addr) => setAddresses([...addresses, addr])}
            onDeleteAddress={(id) => setAddresses(addresses.filter(a => a.id !== id))}
            orders={orders}
            wishlistCount={wishlistIds.length}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'orders' && (
          <OrdersView
            orders={orders}
            onUpdateOrderStatus={(orderId, status) => {
              setOrders(orders.map(o => o.id === orderId ? {
                ...o,
                status,
                statusHistory: [...o.statusHistory, { status, timestamp: new Date().toISOString(), note: 'Patron updated status' }]
              } : o));
            }}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      <CustomerFooter />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        user={user}
        onOrderPlaced={(newOrder) => {
          setOrders([newOrder, ...orders]);
        }}
        onClearCart={() => { setCart([]); setAppliedCoupon(null); }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
      />
    </div>
  );
}

