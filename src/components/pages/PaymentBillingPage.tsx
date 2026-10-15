import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  FileText, 
  MessageCircle, 
  ArrowLeft, 
  QrCode, 
  Sparkles, 
  CreditCard,
  Building2
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_PRIMARY, SUPPORT_EMAIL, BUSINESS_GSTIN, BUSINESS_LEGAL_NAME, STORE_ADDRESS } from '../../utils/whatsapp';

interface PaymentBillingPageProps {
  onBackToHome: () => void;
  onNavigateContact?: () => void;
}

export const PaymentBillingPage: React.FC<PaymentBillingPageProps> = ({ onBackToHome, onNavigateContact }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleWhatsAppPay = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics! I am ready to complete my print order payment via UPI. Please share the direct UPI QR / ID or payment link.'
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 pb-28 sm:pb-20">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <button 
            type="button" 
            onClick={onBackToHome}
            className="hover:text-[#50007c] font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-400">Payment & Billing</span>
          <span>/</span>
          <span className="font-bold text-slate-900">UPI Payment & Tax Invoicing</span>
        </nav>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Secure UPI Payments & GST Compliant Billing</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Payment & Billing Center
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Shivani Graphics exclusively accepts secure instant payments via **UPI (Google Pay, PhonePe, Paytm, BHIM, and Corporate UPI handles)**. Every order includes a verified tax invoice with 18% Input Tax Credit (ITC).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-emerald-200">
              <span>Verified Merchant: {BUSINESS_LEGAL_NAME}</span>
              <span>·</span>
              <span>GSTIN: {BUSINESS_GSTIN}</span>
              <span>·</span>
              <span>Instant WhatsApp Confirmation</span>
            </div>
          </div>
        </motion.div>

        {/* Stylized 'Pay via UPI' Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-[#50007c] via-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <QrCode className="w-48 h-48" />
          </div>

          <div className="space-y-3 relative z-10 text-center md:text-left">
            <span className="px-3 py-1 bg-emerald-500/30 text-emerald-300 rounded-full text-[11px] font-black uppercase tracking-wider border border-emerald-400/30">
              ⚡ Instant UPI Checkout
            </span>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              Ready to Pay & Confirm Your Print Order?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Pay securely using any UPI app (GPay, PhonePe, Paytm, BHIM) and share your screenshot on WhatsApp for instant 10-minute queue priority.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10">
            <button
              type="button"
              onClick={handleWhatsAppPay}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              <span>Get UPI QR / Pay via WhatsApp</span>
            </button>
          </div>
        </motion.div>

        {/* Detailed Payment Methods & Billing Info */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1: Accepted UPI Apps */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Smartphone className="w-5 h-5 text-emerald-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                1. Accepted UPI Payment Methods
              </h2>
            </div>
            <p className="text-slate-600">
              To ensure lightning-fast processing, zero transaction delays, and transparent pricing, Shivani Graphics operates exclusively on instant Unified Payments Interface (UPI):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5 text-center">
                <span className="font-black text-emerald-900 text-sm">Google Pay (GPay)</span>
                <p className="text-[11px] text-slate-600">Instant peer-to-merchant UPI transfer</p>
              </div>
              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1.5 text-center">
                <span className="font-black text-purple-900 text-sm">PhonePe</span>
                <p className="text-[11px] text-slate-600">Fast & secure scan & pay QR</p>
              </div>
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1.5 text-center">
                <span className="font-black text-blue-900 text-sm">Paytm UPI</span>
                <p className="text-[11px] text-slate-600">Seamless wallet & bank UPI handle</p>
              </div>
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1.5 text-center">
                <span className="font-black text-amber-900 text-sm">BHIM / Any UPI App</span>
                <p className="text-[11px] text-slate-600">All NPCI compliant banking apps</p>
              </div>
            </div>
          </section>

          {/* Section 2: How Payment Works */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-[#50007c] shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                2. Step-by-Step Payment & Order Confirmation Process
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#50007c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Configure & Submit Inquiry</h4>
                  <p className="text-slate-600 mt-0.5">Select your product size, paper stock, finish, and quantity. Click "Order via WhatsApp" or add items to your Inquiry Bag.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#50007c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">Receive Official Quotation & UPI QR Code</h4>
                  <p className="text-slate-600 mt-0.5">Our team reviews your artwork/specs and sends you the exact discounted quotation along with our verified business UPI QR code and ID.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#50007c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-slate-900">Scan & Pay via GPay / PhonePe / Paytm</h4>
                  <p className="text-slate-600 mt-0.5">Scan the QR code or transfer to our verified business UPI handle and share the transaction screenshot on WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#50007c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                <div>
                  <h4 className="font-bold text-slate-900">Print Dispatch & GST Tax Invoice</h4>
                  <p className="text-slate-600 mt-0.5">Your print job enters immediate production queue. Once dispatched, your official GST tax invoice (18% ITC) is sent via WhatsApp and Email.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: GST & Tax Invoicing */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                3. GST Compliant Tax Invoicing (18% ITC)
              </h2>
            </div>
            <p className="text-slate-600">
              Registered business entities can claim Input Tax Credit (ITC) on all commercial printing, flex banners, and corporate stationery orders. Please provide your official company GSTIN during checkout or while chatting on WhatsApp.
            </p>
            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-1 text-slate-700">
              <p className="font-bold text-[#50007c]">Business Details for Verification:</p>
              <p><strong>Legal Entity:</strong> {BUSINESS_LEGAL_NAME}</p>
              <p><strong>GSTIN:</strong> {BUSINESS_GSTIN}</p>
              <p><strong>Store Address:</strong> {STORE_ADDRESS}</p>
            </div>
          </section>

          {/* Help & Support CTA */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-black text-emerald-900 text-sm sm:text-base">Have questions regarding billing or custom UPI quotes?</h4>
              <p className="text-xs text-emerald-700">Our billing desk is available Mon–Sat (9:00 AM – 8:00 PM).</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! I have a billing inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md whitespace-nowrap"
            >
              Chat with Billing Desk
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
