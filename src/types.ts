export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Earrings' | 'Necklaces' | 'Rings' | 'Bracelets' | 'Bangles' | 'Jewellery Sets';
  description: string;
  specifications: {
    material: string;
    plating: string;
    stoneType: string;
    weight: string;
    dimensions?: string;
  };
  originalPrice: number;
  discountPercentage: number;
  sellingPrice: number;
  stock: number;
  reservedStock: number;
  soldQuantity: number;
  lowStockThreshold: number;
  expectedDeliveryDays: number;
  images: string[];
  videoUrl?: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  style: 'Minimal' | 'Traditional' | 'Pearl' | 'Gold-Look' | 'Contemporary';
  occasions: string[];
  color: 'Gold' | 'Rose Gold' | 'Silver Finish' | 'Dual Tone';
}

export interface Sale {
  id: string;
  saleName: string;
  productIds: string[];
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressType: 'Home' | 'Work' | 'Other';
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export type OrderStatus = 
  | 'Pending Payment'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned'
  | 'Refund Initiated'
  | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentId?: string;
  paymentMethod: 'Online UPI/Card';
  shippingAddress: Address;
  courier?: string;
  trackingNumber?: string;
  expectedDeliveryDate: string;
  createdAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  photos?: string[];
  isApproved: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'Blocked';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  linkCategory?: string;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  announcementText: string;
  supportEmail: string;
}

