import React, { useState } from 'react';
import { Product, Sale, Coupon, Review, Customer, Banner, Order, OrderStatus, StoreSettings } from '../types';
import { 
  LayoutDashboard, Package, ShoppingCart, Tag, Users, Star, Image as ImageIcon, 
  Settings, LogOut, Plus, Edit, Trash2, CheckCircle, AlertTriangle, Search, Shield, ArrowLeft, RefreshCw
} from 'lucide-react';

interface AdminPortalProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  storeSettings: StoreSettings;
  setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
  onSwitchToCustomer: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products, setProducts,
  sales, setSales,
  coupons, setCoupons,
  reviews, setReviews,
  customers, setCustomers,
  banners, setBanners,
  orders, setOrders,
  storeSettings, setStoreSettings,
  onSwitchToCustomer
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'inventory' | 'deals' | 'sales' | 'orders' | 'customers' | 'coupons' | 'reviews' | 'banners' | 'settings'>('dashboard');

  // New Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState<any>('Necklaces');
  const [prodPrice, setProdPrice] = useState(4999);
  const [prodDiscount, setProdDiscount] = useState(15);
  const [prodStock, setProdStock] = useState(20);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80');
  const [prodDesc, setProdDesc] = useState('');
  const [prodOccasions, setProdOccasions] = useState<string[]>(['Festive', 'Wedding']);

  // Additional Modal States
  const [restockingProduct, setRestockingProduct] = useState<Product | null>(null);
  const [restockQty, setRestockQty] = useState(10);

  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [saleName, setSaleName] = useState('');
  const [saleDiscount, setSaleDiscount] = useState(20);
  const [selectedSaleProductIds, setSelectedSaleProductIds] = useState<string[]>([]);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(15);
  const [couponMinOrder, setCouponMinOrder] = useState(1000);

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerButtonText, setBannerButtonText] = useState('Explore Collection');
  const [bannerImage, setBannerImage] = useState('');

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Confirmed' || o.status === 'Processing').length;
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sellingPrice = Math.round(prodPrice - (prodPrice * prodDiscount) / 100);

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? {
        ...p,
        name: prodName,
        sku: prodSku,
        category: prodCategory,
        originalPrice: prodPrice,
        discountPercentage: prodDiscount,
        sellingPrice,
        stock: prodStock,
        description: prodDesc,
        images: [prodImage],
        occasions: prodOccasions
      } : p));
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `p-${Date.now()}`,
        name: prodName,
        sku: prodSku || `LAYA-SKU-${Math.floor(100+Math.random()*900)}`,
        category: prodCategory,
        description: prodDesc || 'Exquisite gold-coated jewellery handcrafted with precision.',
        specifications: { material: 'Brass Alloy', plating: '18K Micro Gold', stoneType: 'Cubic Zirconia', weight: '25g' },
        originalPrice: prodPrice,
        discountPercentage: prodDiscount,
        sellingPrice,
        stock: prodStock,
        reservedStock: 0,
        soldQuantity: 0,
        lowStockThreshold: 3,
        expectedDeliveryDays: 3,
        images: [prodImage],
        isFeatured: true,
        isNewArrival: true,
        isBestSeller: false,
        isActive: true,
        rating: 5.0,
        reviewCount: 1,
        style: 'Traditional',
        occasions: prodOccasions,
        color: 'Gold'
      };
      setProducts([newProd, ...products]);
    }

    setIsProductModalOpen(false);
    setProdName('');
    setProdSku('');
    setProdDesc('');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? {
      ...o,
      status: newStatus,
      statusHistory: [...o.statusHistory, { status: newStatus, timestamp: new Date().toISOString(), note: 'Updated by LAYA AURA Admin' }]
    } : o));
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3A2924] text-[#F8F3EA] flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#C9A46A]/20">
          <h2 className="text-xl font-serif tracking-[0.2em] font-bold">LAYA AURA</h2>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A46A] mt-0.5">Admin Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto text-xs">
          {[
            { id: 'dashboard', name: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'products', name: 'Product Management', icon: Package },
            { id: 'inventory', name: 'Inventory Stock', icon: RefreshCw },
            { id: 'sales', name: 'Sales Events', icon: Tag },
            { id: 'orders', name: 'Order Management', icon: ShoppingCart },
            { id: 'customers', name: 'Customer Database', icon: Users },
            { id: 'coupons', name: 'Coupons & Promos', icon: Tag },
            { id: 'reviews', name: 'Review Moderation', icon: Star },
            { id: 'banners', name: 'Homepage CMS Banners', icon: ImageIcon },
            { id: 'settings', name: 'Store Customization & Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === item.id ? 'bg-[#C9A46A] text-[#3A2924] font-bold shadow-sm' : 'text-[#EFE4D3]/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#C9A46A]/20">
          <button
            onClick={onSwitchToCustomer}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#F8F3EA] rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A46A]" />
            <span>Customer Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-[#EFE4D3] px-6 sm:px-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="bg-[#C9A46A]/20 text-[#3A2924] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-[#C9A46A]/40">
              Super Admin Role
            </span>
            <h1 className="text-xl font-serif font-bold text-[#3A2924] capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-xs text-[#3A2924]">Admin Principal</p>
              <p className="text-[10px] text-[#8A7568]">admin@layaura.in</p>
            </div>
            <button
              onClick={onSwitchToCustomer}
              className="md:hidden bg-[#3A2924] text-[#F8F3EA] px-3 py-1.5 rounded text-xs font-semibold"
            >
              Storefront
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-[#8A7568] font-medium">Total Revenue</span>
                  <p className="text-3xl font-serif font-bold text-[#3A2924] mt-2">₹{totalRevenue.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">✦ Verified online payments</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-[#8A7568] font-medium">Today's Orders</span>
                  <p className="text-3xl font-serif font-bold text-[#3A2924] mt-2">{orders.length}</p>
                  <p className="text-[10px] text-blue-700 font-semibold mt-1">{pendingOrdersCount} pending fulfillment</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-[#8A7568] font-medium">Low Stock Alerts</span>
                  <p className="text-3xl font-serif font-bold text-rose-600 mt-2">{lowStockCount}</p>
                  <p className="text-[10px] text-rose-600 font-semibold mt-1">Requires immediate restock</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EFE4D3] shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-[#8A7568] font-medium">Active Sales Events</span>
                  <p className="text-3xl font-serif font-bold text-[#3A2924] mt-2">{sales.filter(s => s.isActive).length}</p>
                  <p className="text-[10px] text-[#C9A46A] font-semibold mt-1">Festive discounts running</p>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-xl border border-[#EFE4D3] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-bold text-lg text-[#3A2924]">Recent Customer Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-semibold text-[#C9A46A] hover:underline">View All Orders</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EFE4D3] text-[#8A7568]">
                        <th className="pb-3 font-semibold">Order Number</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Items</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE4D3]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F8F3EA]/50">
                          <td className="py-3 font-bold text-[#3A2924]">{ord.orderNumber}</td>
                          <td className="py-3">{ord.customerName}</td>
                          <td className="py-3">{ord.items.length} items</td>
                          <td className="py-3 font-serif font-bold">₹{ord.total.toLocaleString()}</td>
                          <td className="py-3">
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold text-[10px]">{ord.status}</span>
                          </td>
                          <td className="py-3">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-1 text-[10px] font-medium"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#3A2924]">Product Catalogue ({products.length})</h3>
                  <p className="text-xs text-[#8A7568]">Manage master jewellery items, pricing, SKUs, and stock quantities.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProdName('');
                    setProdSku('');
                    setProdPrice(4999);
                    setProdOccasions(['Festive', 'Wedding']);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold flex items-center space-x-2 hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-[#EFE4D3] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F3EA] border-b border-[#EFE4D3] text-[#8A7568]">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Original Price</th>
                      <th className="p-4">Discount %</th>
                      <th className="p-4">Selling Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE4D3]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8F3EA]/30">
                        <td className="p-4 flex items-center space-x-3">
                          <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                          <span className="font-serif font-semibold text-[#3A2924]">{p.name}</span>
                        </td>
                        <td className="p-4 font-mono text-[#8A7568]">{p.sku}</td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4 text-[#8A7568] line-through">₹{p.originalPrice.toLocaleString()}</td>
                        <td className="p-4 text-[#C9A46A] font-bold">{p.discountPercentage}%</td>
                        <td className="p-4 font-serif font-bold text-[#3A2924]">₹{p.sellingPrice.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded font-bold ${p.stock <= p.lowStockThreshold ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-4 flex space-x-2">
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setProdName(p.name);
                              setProdSku(p.sku);
                              setProdCategory(p.category);
                              setProdPrice(p.originalPrice);
                              setProdDiscount(p.discountPercentage);
                              setProdStock(p.stock);
                              setProdImage(p.images[0]);
                              setProdDesc(p.description);
                              setProdOccasions(p.occasions || ['Festive']);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-[#3A2924]"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3A2924]">Inventory & Stock Watch</h3>
                <p className="text-xs text-[#8A7568]">Monitor available stock, low-stock thresholds, and reserved units.</p>
              </div>

              <div className="bg-white rounded-xl border border-[#EFE4D3] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F3EA] border-b border-[#EFE4D3] text-[#8A7568]">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Available Stock</th>
                      <th className="p-4">Reserved Stock</th>
                      <th className="p-4">Sold Quantity</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE4D3]">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="p-4 font-serif font-semibold">{p.name}</td>
                        <td className="p-4 font-mono text-[#8A7568]">{p.sku}</td>
                        <td className="p-4 font-bold">{p.stock}</td>
                        <td className="p-4 text-amber-700">{p.reservedStock || 0}</td>
                        <td className="p-4 text-indigo-700">{p.soldQuantity || 0}</td>
                        <td className="p-4">
                          {p.stock === 0 ? (
                            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">Out of Stock</span>
                          ) : p.stock <= p.lowStockThreshold ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Low Stock</span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Healthy</span>
                          )}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              setRestockingProduct(p);
                              setRestockQty(10);
                            }}
                            className="px-3 py-1 bg-[#3A2924] text-[#F8F3EA] rounded font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924]"
                          >
                            Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}



          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#3A2924]">Sales Events & Promotions</h3>
                  <p className="text-xs text-[#8A7568]">Manage seasonal and festive sale events.</p>
                </div>
                <button
                  onClick={() => {
                    setSaleName('');
                    setSaleDiscount(20);
                    setSelectedSaleProductIds([]);
                    setIsSaleModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold"
                >
                  Create Sale Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sales.map((s) => (
                  <div key={s.id} className="bg-white p-6 rounded-xl border border-[#EFE4D3] space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif font-bold text-lg text-[#3A2924]">{s.saleName}</h4>
                      <span className="bg-[#C9A46A] text-[#3A2924] px-2.5 py-1 rounded font-bold text-xs">{s.discountPercentage}% OFF</span>
                    </div>
                    <p className="text-xs text-[#8A7568]">Active: {new Date(s.startDate).toLocaleDateString()} — {new Date(s.endDate).toLocaleDateString()}</p>
                    <button
                      onClick={() => setSales(sales.map(item => item.id === s.id ? { ...item, isActive: !item.isActive } : item))}
                      className={`px-3 py-1.5 rounded text-xs font-semibold ${s.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {s.isActive ? 'Active (Click to Deactivate)' : 'Inactive (Click to Activate)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3A2924]">Order Management ({orders.length})</h3>
                <p className="text-xs text-[#8A7568]">Fulfill orders, assign courier AWB tracking numbers, and update statuses.</p>
              </div>

              <div className="bg-white rounded-xl border border-[#EFE4D3] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F3EA] border-b border-[#EFE4D3] text-[#8A7568]">
                    <tr>
                      <th className="p-4">Order Number</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE4D3]">
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td className="p-4 font-bold text-[#3A2924]">{ord.orderNumber}</td>
                        <td className="p-4">
                          <p className="font-semibold">{ord.customerName}</p>
                          <p className="text-[#8A7568]">{ord.phone}</p>
                        </td>
                        <td className="p-4">{ord.items.length} item(s)</td>
                        <td className="p-4">
                          <span className="text-emerald-700 font-semibold">{ord.paymentStatus}</span> ({ord.paymentMethod})
                        </td>
                        <td className="p-4 font-serif font-bold">₹{ord.total.toLocaleString()}</td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded font-bold text-[10px]">{ord.status}</span>
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-[#F8F3EA] border border-[#EFE4D3] rounded p-1.5 text-xs font-semibold"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3A2924]">Customer Database ({customers.length})</h3>
                <p className="text-xs text-[#8A7568]">Registered customer accounts and lifetime spend records.</p>
              </div>

              <div className="bg-white rounded-xl border border-[#EFE4D3] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F3EA] border-b border-[#EFE4D3] text-[#8A7568]">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Joined Date</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE4D3]">
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td className="p-4 font-bold text-[#3A2924]">{c.name}</td>
                        <td className="p-4 text-[#8A7568]">{c.email}</td>
                        <td className="p-4">{c.phone}</td>
                        <td className="p-4">{c.joinedDate}</td>
                        <td className="p-4">{c.ordersCount}</td>
                        <td className="p-4 font-serif font-bold">₹{c.totalSpent.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#3A2924]">Coupons & Promotions</h3>
                  <p className="text-xs text-[#8A7568]">Manage discount coupon codes and usage rules.</p>
                </div>
                <button
                  onClick={() => {
                    setCouponCode('');
                    setCouponDiscount(15);
                    setCouponMinOrder(1000);
                    setIsCouponModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold"
                >
                  Create Coupon
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coupons.map((c) => (
                  <div key={c.code} className="bg-white p-6 rounded-xl border border-[#EFE4D3] space-y-2">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold text-base text-[#3A2924]">{c.code}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-xs">{c.discountValue}% OFF</span>
                    </div>
                    <p className="text-xs text-[#8A7568]">Min Order: ₹{c.minOrderValue} | Max Discount: ₹{c.maxDiscount}</p>
                    <p className="text-xs text-[#8A7568]">Used {c.usedCount} / {c.usageLimit} times</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3A2924]">Customer Review Moderation</h3>
                <p className="text-xs text-[#8A7568]">Approve or reject customer product reviews.</p>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-xl border border-[#EFE4D3] flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-xs">{rev.customerName}</span>
                        <span className="text-xs text-[#8A7568]">({rev.productName})</span>
                      </div>
                      <p className="text-xs italic text-[#3A2924] mb-2">"{rev.comment}"</p>
                      <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">Rating: {rev.rating} / 5</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setReviews(reviews.map(r => r.id === rev.id ? { ...r, isApproved: true } : r))}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => setReviews(reviews.filter(r => r.id !== rev.id))}
                        className="px-3 py-1.5 bg-rose-600 text-white rounded text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#3A2924]">Homepage CMS Banners ({banners.length})</h3>
                  <p className="text-xs text-[#8A7568]">Manage hero banners and promotional carousels.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingBanner(null);
                    setBannerTitle('');
                    setBannerSubtitle('');
                    setBannerButtonText('Explore Collection');
                    setBannerImage('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80');
                    setIsBannerModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#3A2924] text-[#F8F3EA] rounded-lg text-xs font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Banner</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {banners.map((b) => (
                  <div key={b.id} className="bg-white rounded-xl border border-[#EFE4D3] overflow-hidden space-y-3 pb-4">
                    <img src={b.imageUrl} alt="" className="w-full h-36 object-cover" />
                    <div className="px-4 space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#3A2924]">{b.title}</h4>
                      <p className="text-xs text-[#8A7568] line-clamp-2">{b.subtitle}</p>
                    </div>
                    <div className="px-4 pt-2 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingBanner(b);
                          setBannerTitle(b.title);
                          setBannerSubtitle(b.subtitle);
                          setBannerButtonText(b.buttonText);
                          setBannerImage(b.imageUrl);
                          setIsBannerModalOpen(true);
                        }}
                        className="px-3 py-1 bg-gray-100 rounded text-xs font-semibold hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setBanners(banners.filter(item => item.id !== b.id))}
                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded text-xs font-semibold hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3A2924]">Store Customization & Settings</h3>
                <p className="text-xs text-[#8A7568]">Configure store announcement, currency, and global shipping parameters.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Store settings saved successfully.');
              }} className="bg-white p-8 rounded-xl border border-[#EFE4D3] space-y-4 text-xs">
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Store Name</label>
                  <input 
                    type="text" 
                    value={storeSettings.storeName}
                    onChange={e => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Store Tagline</label>
                  <input 
                    type="text" 
                    value={storeSettings.tagline}
                    onChange={e => setStoreSettings({ ...storeSettings, tagline: e.target.value })}
                    className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Header Announcement Bar Text</label>
                  <input 
                    type="text" 
                    value={storeSettings.announcementText}
                    onChange={e => setStoreSettings({ ...storeSettings, announcementText: e.target.value })}
                    className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-[#8A7568] font-medium mb-1">Free Shipping Threshold (₹)</label>
                    <input 
                      type="number" 
                      value={storeSettings.freeShippingThreshold}
                      onChange={e => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-[#8A7568] font-medium mb-1">Standard Shipping Fee (₹)</label>
                    <input 
                      type="number" 
                      value={storeSettings.standardShippingFee}
                      onChange={e => setStoreSettings({ ...storeSettings, standardShippingFee: Number(e.target.value) })}
                      className="w-full bg-[#F8F3EA] border border-[#EFE4D3] rounded p-2.5"
                    />
                  </div>
                </div>

                <button type="submit" className="px-8 py-3 bg-[#3A2924] text-[#F8F3EA] rounded-xl font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors">
                  Save Store Settings
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
            <h3 className="text-xl font-serif font-bold text-[#3A2924] mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Jewellery Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Product Name</label>
                <input type="text" required value={prodName} onChange={e => setProdName(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="e.g. Royale Polki Necklace" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">SKU</label>
                  <input type="text" value={prodSku} onChange={e => setProdSku(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="LAYA-NK-99" />
                </div>
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Category</label>
                  <select value={prodCategory} onChange={e => setProdCategory(e.target.value as any)} className="w-full bg-white border border-[#EFE4D3] rounded p-2">
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Rings">Rings</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Jewellery Sets">Jewellery Sets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Original Price (₹)</label>
                  <input type="number" required value={prodPrice} onChange={e => setProdPrice(Number(e.target.value))} className="w-full bg-white border border-[#EFE4D3] rounded p-2" />
                </div>
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Discount %</label>
                  <input type="number" required value={prodDiscount} onChange={e => setProdDiscount(Number(e.target.value))} className="w-full bg-white border border-[#EFE4D3] rounded p-2" />
                </div>
                <div>
                  <label className="block uppercase text-[#8A7568] font-medium mb-1">Stock Qty</label>
                  <input type="number" required value={prodStock} onChange={e => setProdStock(Number(e.target.value))} className="w-full bg-white border border-[#EFE4D3] rounded p-2" />
                </div>
              </div>

              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Image URL</label>
                <input type="url" required value={prodImage} onChange={e => setProdImage(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" />
              </div>

              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Description</label>
                <textarea rows={3} value={prodDesc} onChange={e => setProdDesc(e.target.value)} className="w-full bg-white border border-[#EFE4D3] rounded p-2" placeholder="Exquisite gold-coated jewellery..." />
              </div>

              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1">Occasions (Select applicable)</label>
                <div className="grid grid-cols-3 gap-2 bg-white border border-[#EFE4D3] rounded p-3">
                  {['Wedding', 'Daily Wear', 'Party', 'Office Wear', 'Gifting', 'Festive'].map((occ) => (
                    <label key={occ} className="flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={prodOccasions.includes(occ)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProdOccasions([...prodOccasions, occ]);
                          } else {
                            setProdOccasions(prodOccasions.filter(o => o !== occ));
                          }
                        }}
                        className="rounded border-[#EFE4D3] text-[#3A2924] focus:ring-[#C9A46A]"
                      />
                      <span>{occ}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#3A2924] text-[#F8F3EA] rounded font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924]">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {restockingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-sm rounded-xl shadow-2xl p-6 relative space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3A2924]">Restock {restockingProduct.name}</h3>
            <p className="text-xs text-[#8A7568]">Current stock: {restockingProduct.stock} units</p>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Quantity to Add</label>
              <input 
                type="number" 
                min="1"
                value={restockQty} 
                onChange={e => setRestockQty(Number(e.target.value))} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setRestockingProduct(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs font-semibold">Cancel</button>
              <button 
                onClick={() => {
                  setProducts(products.map(p => p.id === restockingProduct.id ? { ...p, stock: p.stock + restockQty } : p));
                  setRestockingProduct(null);
                }} 
                className="px-5 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sale Event Modal */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-md rounded-xl shadow-2xl p-6 relative space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3A2924]">Create Sales Event</h3>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Sale Event Name</label>
              <input 
                type="text" 
                placeholder="e.g. Diwali Gold Extravaganza"
                value={saleName} 
                onChange={e => setSaleName(e.target.value)} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
              />
            </div>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Discount Percentage (%)</label>
              <input 
                type="number" 
                value={saleDiscount} 
                onChange={e => setSaleDiscount(Number(e.target.value))} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
              />
            </div>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Select Products to Apply Sale</label>
              <div className="max-h-40 overflow-y-auto space-y-1 bg-white border border-[#EFE4D3] rounded p-2">
                {products.length === 0 ? (
                  <p className="text-xs text-[#8A7568] p-2 text-center">No products available. Add products first.</p>
                ) : (
                  products.map(p => (
                    <label key={p.id} className="flex items-center space-x-2 cursor-pointer text-xs p-1 hover:bg-[#F8F3EA] rounded">
                      <input
                        type="checkbox"
                        checked={selectedSaleProductIds.includes(p.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSaleProductIds([...selectedSaleProductIds, p.id]);
                          } else {
                            setSelectedSaleProductIds(selectedSaleProductIds.filter(id => id !== p.id));
                          }
                        }}
                        className="rounded border-[#EFE4D3] text-[#3A2924]"
                      />
                      <span className="font-medium">{p.name}</span>
                      <span className="text-[#8A7568] text-[10px] ml-auto">₹{p.sellingPrice}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setIsSaleModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs font-semibold">Cancel</button>
              <button 
                onClick={() => {
                  if (saleName.trim()) {
                    setSales([...sales, {
                      id: `sale-${Date.now()}`,
                      saleName,
                      productIds: selectedSaleProductIds,
                      discountPercentage: saleDiscount,
                      startDate: new Date().toISOString(),
                      endDate: new Date(Date.now() + 7*86400000).toISOString(),
                      isActive: true
                    }]);
                    if (selectedSaleProductIds.length > 0) {
                      setProducts(products.map(p => {
                        if (selectedSaleProductIds.includes(p.id)) {
                          const newDisc = saleDiscount;
                          const newSelling = Math.round(p.originalPrice - (p.originalPrice * newDisc) / 100);
                          return { ...p, discountPercentage: newDisc, sellingPrice: newSelling };
                        }
                        return p;
                      }));
                    }
                    setIsSaleModalOpen(false);
                  }
                }} 
                className="px-5 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold"
              >
                Create Sale & Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-md rounded-xl shadow-2xl p-6 relative space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3A2924]">Create Discount Coupon</h3>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Coupon Code</label>
              <input 
                type="text" 
                placeholder="e.g. FESTIVE20"
                value={couponCode} 
                onChange={e => setCouponCode(e.target.value.toUpperCase())} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs font-mono" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Discount %</label>
                <input 
                  type="number" 
                  value={couponDiscount} 
                  onChange={e => setCouponDiscount(Number(e.target.value))} 
                  className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
                />
              </div>
              <div>
                <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Min Order (₹)</label>
                <input 
                  type="number" 
                  value={couponMinOrder} 
                  onChange={e => setCouponMinOrder(Number(e.target.value))} 
                  className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setIsCouponModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs font-semibold">Cancel</button>
              <button 
                onClick={() => {
                  if (couponCode.trim()) {
                    setCoupons([...coupons, {
                      code: couponCode,
                      discountType: 'percentage',
                      discountValue: couponDiscount,
                      minOrderValue: couponMinOrder,
                      maxDiscount: 1000,
                      expiryDate: '2026-12-31',
                      usageLimit: 100,
                      usedCount: 0,
                      isActive: true
                    }]);
                    setIsCouponModalOpen(false);
                  }
                }} 
                className="px-5 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#F8F3EA] border border-[#C9A46A]/40 w-full max-w-md rounded-xl shadow-2xl p-6 relative space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3A2924]">
              {editingBanner ? 'Edit CMS Banner' : 'Add New CMS Banner'}
            </h3>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Banner Title</label>
              <input 
                type="text" 
                value={bannerTitle} 
                onChange={e => setBannerTitle(e.target.value)} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
                placeholder="Royal Polki Edit"
              />
            </div>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Subtitle</label>
              <input 
                type="text" 
                value={bannerSubtitle} 
                onChange={e => setBannerSubtitle(e.target.value)} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
                placeholder="Handcrafted gold-look masterpieces..."
              />
            </div>
            <div>
              <label className="block uppercase text-[#8A7568] font-medium mb-1 text-xs">Image URL</label>
              <input 
                type="url" 
                value={bannerImage} 
                onChange={e => setBannerImage(e.target.value)} 
                className="w-full bg-white border border-[#EFE4D3] rounded p-2 text-xs" 
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setIsBannerModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs font-semibold">Cancel</button>
              <button 
                onClick={() => {
                  if (bannerTitle.trim() && bannerImage.trim()) {
                    if (editingBanner) {
                      setBanners(banners.map(b => b.id === editingBanner.id ? {
                        ...b,
                        title: bannerTitle,
                        subtitle: bannerSubtitle,
                        buttonText: bannerButtonText,
                        imageUrl: bannerImage
                      } : b));
                    } else {
                      setBanners([...banners, {
                        id: `banner-${Date.now()}`,
                        title: bannerTitle,
                        subtitle: bannerSubtitle,
                        buttonText: bannerButtonText,
                        imageUrl: bannerImage,
                        isActive: true
                      }]);
                    }
                    setIsBannerModalOpen(false);
                  }
                }} 
                className="px-5 py-2 bg-[#3A2924] text-[#F8F3EA] rounded text-xs font-semibold"
              >
                Save Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
