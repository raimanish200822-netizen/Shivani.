import React from 'react';
import { X, MapPin, Clock, Navigation, Phone, ExternalLink } from 'lucide-react';
import { 
  STORE_ADDRESS, 
  BUSINESS_GSTIN,
  BUSINESS_OWNER,
  GOOGLE_MAPS_URL, 
  WHATSAPP_PRIMARY, 
  PHONE_SECONDARY 
} from '../utils/whatsapp';

interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocationModal: React.FC<StoreLocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleShareLocationWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics! Please share your live WhatsApp shop location pin for in-person order pickup.'
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#50007c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base tracking-tight">Store Location & Directions</p>
              <p className="text-[11px] text-purple-200">Shivani Graphics (Shivani Digital Prints)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-purple-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Store Facility & Counter */}
          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
            <p className="font-black text-slate-900 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Store & Walk-in Pickup Facility:</span>
            </p>
            <p className="text-slate-800 leading-relaxed font-bold text-xs sm:text-sm">
              {STORE_ADDRESS}
            </p>
            <div className="pt-1 text-[11px] text-slate-600 space-y-0.5 border-t border-purple-200/60">
              <p>• Area: Mahavir Enclave, Dwarka / Palam Subcity Link, New Delhi – 110045</p>
              <p>• Free in-store collection & instant order packaging</p>
            </div>
          </div>



          {/* Contact Numbers */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact Helplines:</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 font-extrabold text-slate-900 text-xs sm:text-sm">
              <a href={`tel:+${WHATSAPP_PRIMARY}`} className="text-[#50007c] hover:underline">
                +91-9810157695
              </a>
              <span>·</span>
              <a href={`tel:+${PHONE_SECONDARY}`} className="text-[#50007c] hover:underline">
                +91-9266944315
              </a>
            </div>
          </div>

          {/* Timings */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Operating Hours:</span>
            </p>
            <p className="text-xs text-slate-600">
              Monday to Saturday: <strong className="text-slate-800">9:30 AM – 8:30 PM</strong>
              <br />Sunday: <strong className="text-slate-800">11:00 AM – 5:00 PM</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleShareLocationWhatsApp}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Store Pin</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
