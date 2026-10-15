import React from 'react';
import { 
  X, 
  MapPin, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight,
  Truck,
  CreditCard,
  Megaphone,
  Shirt,
  Gift,
  Briefcase,
  Package,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  RotateCcw,
  FileCheck,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';
import { CATEGORIES } from '../data/products';
import { WHATSAPP_PRIMARY, PHONE_SECONDARY, SUPPORT_EMAIL, STORE_ADDRESS } from '../utils/whatsapp';
import { PolicyRoute } from './Footer';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onOpenStoreModal: () => void;
  onOpenHelpCenter: () => void;
  onNavigateHome: () => void;
  onNavigateTrack: () => void;
  onNavigateAbout: () => void;
  onNavigatePolicy?: (route: PolicyRoute) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  onOpenStoreModal,
  onOpenHelpCenter,
  onNavigateHome,
  onNavigateTrack,
  onNavigateAbout,
  onNavigatePolicy
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'paper-documents': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'cards-invitations': return <Heart className="w-4 h-4 text-rose-600" />;
      case 'custom-promotional': return <Gift className="w-4 h-4 text-pink-600" />;
      case 'signage-vinyl': return <Megaphone className="w-4 h-4 text-orange-600" />;
      case 'finishing-binding': return <Layers className="w-4 h-4 text-teal-600" />;
      case 'business-cards': return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 'standees-banners': return <Megaphone className="w-4 h-4 text-orange-600" />;
      case 'apparel': return <Shirt className="w-4 h-4 text-blue-600" />;
      case 'photo-gifts': return <Gift className="w-4 h-4 text-pink-600" />;
      case 'stamps-seals': return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'stationery': return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case 'packaging': return <Package className="w-4 h-4 text-emerald-600" />;
      default: return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    onClose();
  };

  const handleTrack = () => {
    onClose();
    onNavigateTrack();
  };

  const handleAbout = () => {
    onClose();
    onNavigateAbout();
  };

  const handleStore = () => {
    onClose();
    if (onNavigatePolicy) {
      onNavigatePolicy('contact');
    } else {
      onOpenStoreModal();
    }
  };

  const handleHelp = () => {
    onClose();
    onOpenHelpCenter();
  };

  const handlePolicyNavigate = (route: PolicyRoute) => {
    onClose();
    if (onNavigatePolicy) {
      onNavigatePolicy(route);
    }
  };

  const handleWhatsAppChat = () => {
    onClose();
    const text = encodeURIComponent('Hello Shivani Graphics! I have a question about custom digital printing in Delhi NCR.');
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity" 
            onClick={onClose}
          />

          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 left-0 max-w-[320px] w-full bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header Close */}
            <div className="p-4 bg-[#50007c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-12 rounded-lg overflow-hidden bg-white flex items-center px-1 shadow-xs">
                  <img src="https://img.sanishtech.com/u/65c843b363e7b4f65c6efab5a16570b4.jpg" alt="Shivani Graphics" className="h-full w-auto object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm tracking-tight leading-none">
                    <span className="text-white">Shivani</span> <span className="text-amber-300">Graphics</span>
                  </span>
                  <span className="text-[10px] text-purple-200 mt-0.5">
                    Print & Signage
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-800">
              
              {/* Home */}
              <button
                onClick={() => {
                  onClose();
                  onNavigateHome();
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-purple-50 transition-colors uppercase tracking-tight font-extrabold flex items-center justify-between cursor-pointer"
              >
                <span>Home Catalog</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Categories Section */}
              <div className="py-2">
                <div className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Product Categories
                </div>

                <div className="space-y-0.5 px-2">
                  {CATEGORIES.map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#50007c] text-white'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {getCategoryIcon(cat.id)}
                          <span>{cat.label}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions & Dedicated Sub-Pages */}
              <div className="py-2">
                <div className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Official Sub-Pages & Policies
                </div>

                <button
                  onClick={() => handlePolicyNavigate('contact')}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>Contact Us & Directions (/contact)</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePolicyNavigate('terms')}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-orange-500" />
                    <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePolicyNavigate('privacy')}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePolicyNavigate('refund-policy')}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-rose-600" />
                    <span>Refund & Cancellation Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePolicyNavigate('artwork-guidelines')}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <span>Artwork & Print Guidelines</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={handleTrack}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-slate-600" />
                    <span>Track Your Order</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={handleAbout}
                  className="w-full flex items-center justify-between px-5 py-2 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-[#50007c]" />
                    <span>About Shivani Graphics</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Store Address & Contact Summary */}
              <div className="p-4 bg-slate-50 text-[11px] text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="leading-snug break-words">{STORE_ADDRESS}</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>+91-9810157695 / +91-9266944315</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{SUPPORT_EMAIL}</span>
                </div>
              </div>

            </div>

            {/* Bottom Sticky WhatsApp CTA */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Chat on WhatsApp (+91-9810157695)</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
