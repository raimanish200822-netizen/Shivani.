import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Headphones, ArrowLeft, X } from 'lucide-react';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_SECONDARY, 
  SUPPORT_EMAIL, 
  STORE_ADDRESS, 
  BUSINESS_GSTIN,
  GOOGLE_MAPS_URL 
} from '../utils/whatsapp';

interface HelpCenterProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose, isModal = false }) => {
  const content = (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Help Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have a query about your order or need custom printing assistance? Reach out to us directly.
        </p>
      </div>

      {/* 3 Large Cards (Screenshot 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
        
        {/* Card 1: Call us */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center justify-between space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#50007c] flex items-center justify-center">
            <Headphones className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-black text-base text-slate-900">WhatsApp & Phone Support</h3>
            <p className="text-xs text-slate-500 mt-2">
              Connect directly with our support team for instant order tracking & quote assistance.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              (Mon - Sat: 9:30 AM - 8:30 PM)
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! I have a question regarding print services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Card 2: E-Mail us */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center justify-between space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#50007c] flex items-center justify-center">
            <Mail className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-black text-base text-slate-900">E-Mail Inquiries</h3>
            <p className="text-xs text-slate-500 mt-2">
              Send your design artwork files and bulk corporate requirements securely via email.
            </p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="w-full py-2 bg-[#50007c] hover:bg-[#400063] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Send Email Inquiry
          </a>
        </div>

        {/* Card 3: Postal address */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center justify-between space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#50007c] flex items-center justify-center">
            <MapPin className="w-8 h-8 stroke-[1.8] text-rose-600" />
          </div>
          <div>
            <h3 className="font-black text-base text-slate-900">Postal & Store Address</h3>
            <div className="text-xs text-slate-700 font-medium mt-1 leading-relaxed space-y-1">
              <p><strong>Store & Counter:</strong> {STORE_ADDRESS}</p>

              <p className="text-[11px] font-mono text-purple-900 font-bold">GSTIN: {BUSINESS_GSTIN}</p>
            </div>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );

  if (!isModal) {
    return (
      <section id="help-center-section" className="bg-slate-50 border-t border-slate-200">
        {content}
      </section>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <p className="font-bold text-sm">Customer Support</p>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[85vh] overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
};
