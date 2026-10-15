import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  Printer, 
  MessageCircle, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';
import { AdminOrder, useAdmin } from '../context/AdminContext';

interface TrackOrderPageProps {
  onBackToHome: () => void;
}

const STORAGE_KEY = 'sg_admin_orders_v1';

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onBackToHome }) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<AdminOrder | null>(null);

  const { orders: firestoreOrders } = useAdmin();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    setFoundOrder(null);

    const q = query.trim().toLowerCase();

    // 1. Search in Firestore / AdminContext orders first (Real Database Sync)
    const match = firestoreOrders.find(o => 
      o.id.toLowerCase() === q ||
      o.id.toLowerCase().includes(q) ||
      o.phone.includes(query.trim()) ||
      o.customerName.toLowerCase().includes(q)
    );

    if (match) {
      setFoundOrder(match);
      return;
    }

    // 2. Fallback check in localStorage if needed
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const localOrders: AdminOrder[] = JSON.parse(saved);
        const localMatch = localOrders.find(o => 
          o.id.toLowerCase() === q ||
          o.id.toLowerCase().includes(q) ||
          o.phone.includes(query.trim()) ||
          o.customerName.toLowerCase().includes(q)
        );
        if (localMatch) {
          setFoundOrder(localMatch);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleWhatsAppStatus = () => {
    const text = encodeURIComponent(
      `Hello Shivani Graphics Support! 🖨️\nI would like to get a live status update for my Order ID / Phone No: *${query}*.\nPlease let me know the current production & dispatch stage.`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[75vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={onBackToHome} className="hover:text-[#50007c] font-medium flex items-center gap-1 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900">Track Order</span>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#50007c] flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Track Your Print Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Enter your exact Order ID (e.g. SG-1001) or WhatsApp mobile number entered during checkout to view live status directly from our Firebase database.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Mobile No. (e.g. 9810157695) or Order ID (e.g. SG-1001)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 outline-hidden focus:border-[#50007c] focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-[#50007c] hover:bg-[#400063] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Status</span>
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center mt-3">
            Note: Connected in real-time with Firestore database orders. For urgent assistance, reach out on WhatsApp.
          </p>
        </div>

        {/* Search Result - Order Found */}
        {searched && foundOrder && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Database Live Order Status</p>
                <p className="text-base sm:text-lg font-black text-slate-900">Reference #{foundOrder.id}</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{foundOrder.productTitle} ({foundOrder.quantity} pcs) - ₹{foundOrder.totalAmount}</p>
                <p className="text-[11px] text-slate-400 mt-1">Customer: {foundOrder.customerName} ({foundOrder.phone})</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{foundOrder.status}</span>
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Order Received & Confirmed in Database</p>
                <p className="text-[11px] text-slate-500">Recorded on {foundOrder.date || 'Recent'}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Prepress & Artwork Verification</p>
                <p className="text-[11px] text-slate-500">Specifications: {foundOrder.options || 'Standard print specifications'}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#50007c] text-white flex items-center justify-center text-[10px] animate-pulse">
                  ⚡
                </span>
                <p className="font-bold text-xs sm:text-sm text-[#50007c]">Current Production Stage: {foundOrder.status}</p>
                <p className="text-[11px] text-slate-500">Shivani Graphics High-Speed Digital Press, Mahavir Enclave, New Delhi</p>
              </div>

            </div>

            {/* Action Bar */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 text-center sm:text-left">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Need further clarification regarding Order #{foundOrder.id}? Connect with us instantly on WhatsApp.</span>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppStatus}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Search Result - Order Not Found */}
        {searched && !foundOrder && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No Real Order Found in Database for "{query}"</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find an order matching this Order ID or phone number in Firestore. Please verify your order ID or contact support.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppStatus}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Order Status on WhatsApp</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
