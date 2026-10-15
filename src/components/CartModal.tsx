import React, { useState } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { generateMultiCartWhatsAppUrl } from '../utils/whatsapp';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const handleSendOrder = () => {
    if (items.length === 0) return;
    const url = generateMultiCartWhatsAppUrl(items, customerName, customerCity, orderNotes);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#50007c] via-purple-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-extrabold text-base tracking-tight truncate">Multi-Item Inquiry Bag</p>
              <p className="text-xs text-purple-200">
                {items.length} {items.length === 1 ? 'product' : 'products'} ready for quotation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 text-sm">Your inquiry bag is currently empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Configure any product on the site, choose your custom specs, and click "Add to Inquiry Bag" to request a combined corporate quotation.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#50007c] text-white text-xs font-bold rounded-xl hover:bg-[#400063] transition-colors cursor-pointer"
              >
                Browse Print Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3 items-center justify-between"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {item.productTitle}
                      </p>
                      <p className="text-[11px] text-slate-600 truncate">
                        {item.sizeLabel} · {item.materialLabel}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        Finish: {item.finishLabel} · {item.config.quantity} units
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Status Note */}
              <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-200 text-xs text-[#50007c] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#50007c]" />
                <span>Zero obligation: Our prepress team shares wholesale rate cards & digital mockups on WhatsApp.</span>
              </div>

              {/* Customer Contact Form */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-800">Your Contact Details (Optional):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name / Company"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                  />
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="City / Delivery Location"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                  />
                </div>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions or deadlines..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] resize-none"
                />
              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <button
              type="button"
              onClick={handleSendOrder}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Submit Multi-Item Quote Request on WhatsApp</span>
            </button>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onClearCart}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear all items
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-[#50007c] font-bold hover:underline cursor-pointer"
              >
                + Add More Products
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
