import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Package, Truck, CheckCircle2, Clock, XCircle, RotateCcw, ArrowRight, ShieldAlert } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCurrentView: (view: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onUpdateOrderStatus, setCurrentView }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending Payment':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Confirmed':
      case 'Processing':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'Packed':
      case 'Shipped':
      case 'Out for Delivery':
        return <Truck className="w-4 h-4 text-indigo-600" />;
      case 'Delivered':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'Cancelled':
      case 'Returned':
        return <XCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
      case 'Out for Delivery': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Confirmed':
      case 'Processing':
      case 'Packed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending Payment': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
      case 'Returned': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-[#EFE4D3] pb-6 mb-8 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A46A] font-semibold">Patron Account</span>
          <h1 className="text-3xl font-serif text-[#3A2924] mt-1">My Orders & Tracking</h1>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs uppercase font-bold tracking-wider text-[#3A2924] hover:text-[#C9A46A] flex items-center space-x-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-16 text-center border border-[#EFE4D3]">
          <Package className="w-16 h-16 text-[#8A7568]/30 mx-auto mb-4" />
          <p className="font-serif text-lg text-[#3A2924] mb-2">No orders placed yet</p>
          <p className="text-xs text-[#8A7568] mb-6">Your order history and live courier tracking will appear here.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3 bg-[#3A2924] text-[#F8F3EA] rounded-xl text-xs font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="space-y-4 lg:col-span-1">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`bg-white p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? 'border-[#C9A46A] shadow-md' : 'border-[#EFE4D3]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-serif font-bold text-sm text-[#3A2924]">{order.orderNumber}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[#8A7568] mb-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-[#EFE4D3]">
                  <span className="text-[#8A7568]">{order.items.length} item(s)</span>
                  <span className="font-bold text-[#3A2924]">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Order Details & Tracking Timeline */}
          {selectedOrder && (
            <div className="bg-white rounded-xl border border-[#EFE4D3] p-6 lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#EFE4D3] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8A7568]">Order Details</span>
                  <h2 className="text-xl font-serif font-bold text-[#3A2924] mt-0.5">{selectedOrder.orderNumber}</h2>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                  {selectedOrder.status === 'Processing' || selectedOrder.status === 'Confirmed' ? (
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Cancelled')}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-100"
                    >
                      Cancel Order
                    </button>
                  ) : selectedOrder.status === 'Delivered' ? (
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Return Requested')}
                      className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-100"
                    >
                      Request Return
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Courier info if shipped */}
              {selectedOrder.trackingNumber && (
                <div className="bg-[#F8F3EA] p-4 rounded-xl border border-[#EFE4D3] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#3A2924]">Courier Partner: {selectedOrder.courier}</p>
                    <p className="text-[#8A7568] mt-0.5">AWB Tracking Number: <span className="font-mono text-[#3A2924]">{selectedOrder.trackingNumber}</span></p>
                  </div>
                  <button 
                    onClick={() => alert(`Redirecting to courier tracking for ${selectedOrder.trackingNumber}`)}
                    className="px-4 py-2 bg-[#3A2924] text-[#F8F3EA] rounded-lg font-semibold hover:bg-[#C9A46A] hover:text-[#3A2924] transition-colors"
                  >
                    Track Live Shipment
                  </button>
                </div>
              )}

              {/* Items */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#8A7568] font-bold mb-3">Purchased Masterpieces</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 bg-[#F8F3EA]/50 p-3 rounded-lg border border-[#EFE4D3]">
                      <img src={item.productImage} alt={item.productName} className="w-14 h-14 object-cover rounded-md" />
                      <div className="flex-1">
                        <p className="font-serif font-semibold text-xs text-[#3A2924]">{item.productName}</p>
                        <p className="text-xs text-[#8A7568]">Qty: {item.quantity} | Color: {item.selectedColor || 'Gold'}</p>
                      </div>
                      <p className="text-xs font-serif font-bold text-[#3A2924]">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#8A7568] font-bold mb-4">Order Lifecycle Timeline</h4>
                <div className="space-y-4 border-l-2 border-[#C9A46A]/30 ml-3 pl-6">
                  {selectedOrder.statusHistory.map((hist, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#C9A46A] border-2 border-white flex items-center justify-center"></div>
                      <p className="text-xs font-bold text-[#3A2924]">{hist.status}</p>
                      <p className="text-[10px] text-[#8A7568]">{new Date(hist.timestamp).toLocaleString()} {hist.note ? `— ${hist.note}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Payment summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFE4D3] text-xs">
                <div>
                  <p className="font-bold text-[#3A2924] mb-1">Shipping Address</p>
                  <p className="text-[#8A7568]">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-[#8A7568]">{selectedOrder.shippingAddress.houseNo}, {selectedOrder.shippingAddress.street}</p>
                  <p className="text-[#8A7568]">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                </div>
                <div>
                  <p className="font-bold text-[#3A2924] mb-1">Payment & Totals</p>
                  <p className="text-[#8A7568]">Method: {selectedOrder.paymentMethod}</p>
                  <p className="text-[#8A7568]">Status: <span className="text-emerald-700 font-semibold">{selectedOrder.paymentStatus}</span></p>
                  <p className="font-serif font-bold text-sm text-[#3A2924] mt-2">Total: ₹{selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
