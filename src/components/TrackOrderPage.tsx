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
    const cleanQuery = q.replace(/[^a-z0-9]/g, '');
    const cleanInputPhone = query.trim().replace(/[^0-9]/g, '');

    // 1. Search in Firestore / AdminContext orders first (Real Database Sync)
    const match = firestoreOrders.find(o => {
      const oId = (o.id || '').toLowerCase();
      const oPhone = (o.phone || '').toLowerCase();
      const oName = (o.customerName || '').toLowerCase();
      const cleanOId = oId.replace(/[^a-z0-9]/g, '');
      const cleanOPhone = oPhone.replace(/[^0-9]/g, '');

      return (
        oId === q ||
        oId.includes(q) ||
        q.includes(oId) ||
        cleanOId === cleanQuery ||
        (cleanInputPhone.length >= 4 && cleanOPhone.includes(cleanInputPhone)) ||
        oName.includes(q)
      );
    });

    if (match) {
      setFoundOrder(match);
      return;
    }

    // 2. Fallback check in localStorage if needed
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const localOrders: AdminOrder[] = JSON.parse(saved);
        const localMatch = localOrders.find(o => {
          const oId = (o.id || '').toLowerCase();
          const oPhone = (o.phone || '').toLowerCase();
          const oName = (o.customerName || '').toLowerCase();
          const cleanOId = oId.replace(/[^a-z0-9]/g, '');
          const cleanOPhone = oPhone.replace(/[^0-9]/g, '');

          return (
            oId === q ||
            oId.includes(q) ||
            q.includes(oId) ||
            cleanOId === cleanQuery ||
            (cleanInputPhone.length >= 4 && cleanOPhone.includes(cleanInputPhone)) ||
            oName.includes(q)
          );
        });
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

            {/* Visual Progress Bar */}
            <div className="py-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Production Progress</span>
                <span className="text-xs font-black text-[#50007c] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  {foundOrder.status}
                </span>
              </div>

              {(() => {
                const s = (foundOrder.status || '').toLowerCase();
                let currentIdx = 0;
                if (s.includes('deliver')) {
                  currentIdx = 3;
                } else if (s.includes('dispatch') || s.includes('out for delivery') || s.includes('ready')) {
                  currentIdx = 2;
                } else if (s.includes('print') || s.includes('quality') || s.includes('design') || s.includes('press') || s.includes('designing') || s.includes('design pending')) {
                  currentIdx = 1;
                } else {
                  currentIdx = 0;
                }

                const milestones = [
                  { label: 'File Received', icon: Package, desc: 'Order verified' },
                  { label: 'Printing', icon: Printer, desc: 'Digital press' },
                  { label: 'Dispatch', icon: Truck, desc: 'Packed & ready' },
                  { label: 'Delivered', icon: CheckCircle2, desc: 'Completed' },
                ];

                const progressWidths = ['0%', '33%', '66%', '100%'];

                return (
                  <div className="space-y-4">
                    {/* Horizontal Progress Bar */}
                    <div className="relative pt-6 pb-2">
                      {/* Background Bar */}
                      <div className="absolute top-9 left-6 right-6 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#50007c] via-purple-600 to-emerald-500 transition-all duration-700 rounded-full shadow-xs"
                          style={{ width: progressWidths[currentIdx] }}
                        />
                      </div>

                      {/* Milestone Nodes */}
                      <div className="relative z-10 grid grid-cols-4 gap-1 text-center">
                        {milestones.map((m, idx) => {
                          const isCompleted = idx < currentIdx;
                          const isCurrent = idx === currentIdx;
                          const IconComponent = m.icon;

                          return (
                            <div key={idx} className="flex flex-col items-center group">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all shadow-xs ${
                                isCompleted 
                                  ? 'bg-emerald-600 text-white shadow-emerald-200' 
                                  : isCurrent 
                                  ? 'bg-[#50007c] text-white ring-4 ring-purple-100 shadow-purple-300 animate-pulse' 
                                  : 'bg-white border border-slate-200 text-slate-400'
                              }`}>
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                              </div>
                              <p className={`text-[11px] sm:text-xs font-black mt-2 ${isCurrent ? 'text-[#50007c]' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                {m.label}
                              </p>
                              <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5 truncate">
                                {m.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
                      <p className="text-xs text-slate-700 font-medium">
                        Current Milestone: <strong className="text-[#50007c]">{milestones[currentIdx].label}</strong> ({foundOrder.status}) at Shivani Graphics, Mahavir Enclave, New Delhi.
                      </p>
                    </div>
                  </div>
                );
              })()}
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
