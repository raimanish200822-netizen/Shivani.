import React, { useState } from 'react';
import { X, Briefcase, MessageCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface BulkQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkQuoteModal: React.FC<BulkQuoteModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('Visiting Cards & Corporate Stationery');
  const [estimatedQuantity, setEstimatedQuantity] = useState('1,000+ units');
  const [hasGSTIN, setHasGSTIN] = useState(true);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quoteId = `BULK-${Date.now().toString().slice(-6)}`;
    const newQuote = {
      id: quoteId,
      customerName: `${contactPerson} (${companyName})`,
      phone: phone || 'Not provided',
      email: email || 'Not provided',
      service: productType,
      quantity: estimatedQuantity,
      specifications: `GST Required: ${hasGSTIN ? 'Yes' : 'No'}. Notes: ${notes || 'None'}`,
      status: 'Pending' as const,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await setDoc(doc(db, 'quotes', quoteId), newQuote);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `quotes/${quoteId}`);
    }

    const message = [
      `*CORPORATE / BULK PRINTING INQUIRY* (${quoteId})`,
      `------------------------------------`,
      `*Company Name:* ${companyName}`,
      `*Contact Person:* ${contactPerson}`,
      `*Phone:* ${phone || 'N/A'}`,
      `*Email:* ${email || 'N/A'}`,
      `*Product Category:* ${productType}`,
      `*Estimated Volume:* ${estimatedQuantity}`,
      `*GST Invoice Required:* ${hasGSTIN ? 'Yes (Require 18% ITC Tax Invoice)' : 'No'}`,
      notes.trim() ? `*Project Brief / Deadlines:* ${notes.trim()}` : '',
      `------------------------------------`,
      `_Submitted via Shivani Graphics Corporate Portal_`,
      `Please provide corporate ratecard, sample kit dispatch, and volume rebates.`
    ].filter(Boolean).join('\n');

    showToast('Bulk quote inquiry submitted & saved in Admin Panel! Opening WhatsApp...', 'success');
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-base tracking-tight">Corporate & Bulk Inquiry</p>
              <p className="text-xs text-slate-300">Dedicated Pricing for Startups & Enterprises</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Company / Brand Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Tech Solutions"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Contact Person Name *</label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Business Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. contact@acme.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Product Line</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 text-slate-900"
              >
                <option value="Visiting Cards & Corporate Stationery">Visiting Cards & Letterheads</option>
                <option value="Exhibition Standees & Banners">Exhibition Standees & Banners</option>
                <option value="Employee Welcome Kits & Apparel">Employee Apparel & Welcome Kits</option>
                <option value="Custom Ceramic Mugs & Acrylic Gifts">Custom Mugs & Acrylic Gifts</option>
                <option value="Annual Office Stationery Supplies">Annual Office Stationery Supplies</option>
                <option value="Multiple Products / Complete Package">Multiple Products (Complete Package)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Estimated Quantity</label>
              <select
                value={estimatedQuantity}
                onChange={(e) => setEstimatedQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 text-slate-900"
              >
                <option value="250 to 500 units">250 to 500 units</option>
                <option value="500 to 1,000 units">500 to 1,000 units</option>
                <option value="1,000 to 5,000 units">1,000 to 5,000 units</option>
                <option value="5,000+ units (Maximum Rebate)">5,000+ units (Maximum Rebate)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Do you require a GST Tax Invoice with ITC?</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setHasGSTIN(true)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                  hasGSTIN ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {hasGSTIN && <Check className="w-3.5 h-3.5" />}
                <span>Yes, 18% GST Invoice Required</span>
              </button>
              <button
                type="button"
                onClick={() => setHasGSTIN(false)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                  !hasGSTIN ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {!hasGSTIN && <Check className="w-3.5 h-3.5" />}
                <span>Individual Billing</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Project Requirements & Deadlines</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your event, delivery address in Delhi NCR / India, or custom paper specifications..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Submit Bulk Quote & Open WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Appears instantly in Admin Panel & WhatsApp manager</span>
          </p>

        </form>

      </div>
    </div>
  );
};
