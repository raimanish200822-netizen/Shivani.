import React, { useState } from 'react';
import { ShoppingBag, Printer, Plus, CheckCircle, Clock, Search, X, Hash, Trash2 } from 'lucide-react';
import { useAdmin, AdminOrder } from '../context/AdminContext';
import { InvoiceModal } from './InvoiceModal';

export const OrdersView: React.FC = () => {
  const { orders, updateOrderStatus, saveOrder, saveInvoice, deleteOrder } = useAdmin();
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<AdminOrder | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);

  // New manual order form state with custom tracking ID generator
  const [newOrder, setNewOrder] = useState<AdminOrder>({
    id: `SG-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: '',
    phone: '',
    email: '',
    address: '',
    productTitle: 'Visiting Cards (350 GSM Art Card)',
    quantity: 100,
    options: 'Matte Lamination · Both Sides',
    totalAmount: 588.82,
    status: 'New',
    paymentStatus: 'Paid',
    date: new Date().toISOString().split('T')[0]
  });

  const [unitPrice, setUnitPrice] = useState<number>(4.99);

  const handleQuantityChange = (qty: number) => {
    const sub = qty * unitPrice;
    const gst = sub * 0.18;
    const total = Math.round((sub + gst) * 100) / 100;
    setNewOrder({ ...newOrder, quantity: qty, totalAmount: total });
  };

  const handleUnitPriceChange = (price: number) => {
    setUnitPrice(price);
    const sub = newOrder.quantity * price;
    const gst = sub * 0.18;
    const total = Math.round((sub + gst) * 100) / 100;
    setNewOrder({ ...newOrder, totalAmount: total });
  };

  const filtered = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  const statuses: AdminOrder['status'][] = ['New', 'Confirmed', 'Designing', 'Printing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to Firestore via saveOrder
    saveOrder(newOrder);
    setIsCreatingOrder(false);
    // Reset form with new random tracking ID
    setNewOrder({
      id: `SG-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: '',
      phone: '',
      email: '',
      address: '',
      productTitle: 'Visiting Cards (350 GSM Art Card)',
      quantity: 100,
      options: 'Matte Lamination · Both Sides',
      totalAmount: 499,
      status: 'New',
      paymentStatus: 'Paid',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Order Management System (OMS) ({orders.length})</h2>
          <p className="text-xs text-slate-500">Generate manual tracking IDs, update dispatch status, and manage customer orders.</p>
        </div>

        <button
          onClick={() => setIsCreatingOrder(true)}
          className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Manual Order & Tracking ID
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'Printing', 'Ready', 'Delivered'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === st ? 'bg-[#50007c] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((ord) => (
          <div key={ord.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {ord.id}
                </span>
                <span className="text-xs font-black text-slate-900">{ord.customerName}</span>
                <span className="text-[11px] text-slate-500">({ord.phone})</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold">{ord.productTitle} · Qty: {ord.quantity} ({ord.options})</p>
              <p className="text-[11px] text-slate-500">Address: {ord.address} · Date: {ord.date}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select
                  value={ord.status}
                  onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-[#50007c]"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">₹{ord.totalAmount}</span>
                <button
                  onClick={() => {
                    saveInvoice(ord);
                    setSelectedOrderForInvoice(ord);
                  }}
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  title="Generate Tax Invoice"
                >
                  <Printer className="w-3.5 h-3.5" /> Invoice
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete order ${ord.id}?`)) {
                      deleteOrder(ord.id);
                    }
                  }}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer"
                  title="Delete Order"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Order Creation Modal */}
      {isCreatingOrder && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Manual Order & Tracking ID</h3>
              <button onClick={() => setIsCreatingOrder(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Generated Tracking ID (Editable)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOrder.id}
                    onChange={(e) => setNewOrder({ ...newOrder, id: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-purple-900 bg-purple-50"
                  />
                  <button
                    type="button"
                    onClick={() => setNewOrder({ ...newOrder, id: `SG-TRK-${Math.floor(100000 + Math.random() * 900000)}` })}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl whitespace-nowrap"
                  >
                    Generate New
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    placeholder="customer@gmail.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery Address / Store Pickup</label>
                  <input
                    type="text"
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                    required
                    placeholder="Mahavir Enclave, New Delhi"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title & Specifications</label>
                <input
                  type="text"
                  value={newOrder.productTitle}
                  onChange={(e) => setNewOrder({ ...newOrder, productTitle: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={unitPrice}
                    onChange={(e) => handleUnitPriceChange(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Auto Calculator Summary Box */}
              <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({newOrder.quantity} × ₹{unitPrice}):</span>
                  <span className="font-semibold text-slate-900">₹{(newOrder.quantity * unitPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%):</span>
                  <span className="font-semibold text-slate-900">₹{((newOrder.quantity * unitPrice) * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black pt-1 border-t border-purple-200 text-sm">
                  <span>Auto-Calculated Total (₹):</span>
                  <span className="text-[#50007c]">₹{newOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingOrder(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl cursor-pointer shadow-md"
                >
                  Save & Generate Tracking ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedOrderForInvoice && (
        <InvoiceModal
          order={selectedOrderForInvoice}
          onClose={() => setSelectedOrderForInvoice(null)}
        />
      )}
    </div>
  );
};
