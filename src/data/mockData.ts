import { Product, Sale, Coupon, Review, Customer, Banner, Order, StoreSettings } from '../types';

export const initialStoreSettings: StoreSettings = {
  storeName: 'LAYA AURA',
  tagline: 'Beauty in Every Detail',
  currencySymbol: '₹',
  freeShippingThreshold: 2500,
  standardShippingFee: 150,
  announcementText: '✦ Complimentary Velvet Gift Box & Anti-Tarnish Pouch with Every Order ✦',
  supportEmail: 'support@layaura.in'
};

export const initialBanners: Banner[] = [];
export const initialProducts: Product[] = [];
export const initialSales: Sale[] = [];
export const initialCoupons: Coupon[] = [];
export const initialReviews: Review[] = [];
export const initialCustomers: Customer[] = [];
export const initialOrders: Order[] = [];
