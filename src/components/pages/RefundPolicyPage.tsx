import React, { useEffect } from 'react';
import { 
  RotateCcw, 
  ShieldCheck, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageCircle, 
  ArrowLeft, 
  HelpCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_PRIMARY, PHONE_SECONDARY, SUPPORT_EMAIL } from '../../utils/whatsapp';

interface RefundPolicyPageProps {
  onBackToHome: () => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAskWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics Team! I have an inquiry regarding your Free Reprint Guarantee & Cancellation Policy.'
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
          <span className="text-slate-400">Policies & Guarantees</span>
          <span>/</span>
          <span className="font-bold text-slate-900">Cancellation & Free Reprint Policy</span>
        </nav>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-rose-300">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Customer Satisfaction & Quality Assurance Charter</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Cancellation & 100% Free Reprint Guarantee Policy
            </h1>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-normal">
              We stand behind every single print job with our 100% Free Reprint Guarantee. Because custom merchandise is printed exclusively for you, our fair and transparent policy protects both parties against manufacturing and transit defects.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-rose-200">
              <span>Updated: October 2026</span>
              <span>·</span>
              <span>Free Reprint for Manufacturing Defects</span>
              <span>·</span>
              <span>24-Hour Express Resolution</span>
            </div>
          </div>
        </motion.div>

        {/* Core Content */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1: Free Reprint Guarantee */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                1. When Do You Qualify for a 100% Free Reprint?
              </h2>
            </div>
            <p className="text-slate-600">
              If your delivered print package suffers from any verifiable machinery defect or mechanical printing failure, Shivani Graphics will immediately reprint and dispatch your entire batch on top priority at <strong>ZERO additional cost</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Press & Hardware Defects</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Severe ink streaking, printhead banding lines, color mis-registration between plates, or toner smudge spots.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bindery & Trimming Errors</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Cut inside approved trim boundaries (chopping important text), misaligned folding, bubble peeling in lamination, or upside-down book binding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Incorrect Material Substrate</span>
                </h3>
                <p className="text-xs text-slate-600">
                  If the delivered job was printed on a different paper stock or lighter GSM than the agreed quotation specs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transit Damage by Courier</span>
                </h3>
                <p className="text-xs text-slate-600">
                  If the outer box and interior merchandise arrive crushed, creased, water-damaged, or bent during logistics transit.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Photographic Proof Procedure */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Camera className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                2. Simple 3-Step Photographic Proof Procedure
              </h2>
            </div>
            <p className="text-slate-600">
              To request a priority reprint or investigation, follow these straightforward steps:
            </p>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Capture Photo & Video Evidence within 48 Hours</h4>
                  <p className="text-xs text-slate-600">Take clear, well-lit photos highlighting the defect alongside a picture of the shipping box label.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Send to WhatsApp (+91-9810157695) or Email</h4>
                  <p className="text-xs text-slate-600">Send media directly to our primary support channel along with your contact name and order date.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Priority Press Re-run within 24 Hours</h4>
                  <p className="text-xs text-slate-600">Once verified by our prepress head, a replacement run is slotted immediately without delaying your project timeline.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Order Cancellation Guidelines */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                3. Order Cancellation & Stage-by-Stage Refund Terms
              </h2>
            </div>
            <p className="text-slate-600">
              Because custom printing creates personalized goods with zero salvage or restocking value, cancellations depend on the production stage at the time of your written request:
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pre-RIP / Before Platemaking:</strong> 100% full refund if cancelled before our prepress workstation RIPs the files and exposes aluminum offset plates or cuts raw paper stock.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>After Plate-Making / In Press Run:</strong> If raw paper sheets or custom fabric has already been trimmed and loaded on press, direct substrate & tooling expenses will be deducted, and the balance refunded.</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-2 text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Post Printing / Finishing & Dispatch:</strong> Once printing, lamination, and bindery are completed and dispatched, orders cannot be cancelled or returned unless a manufacturing defect is proven under Section 1.</span>
              </div>
            </div>
          </section>

          {/* Section 4: Refund Processing Timelines */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <RotateCcw className="w-5 h-5 text-[#50007c] shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                4. Refund Processing Timelines
              </h2>
            </div>
            <p className="text-slate-600">
              Approved refunds are credited directly back to the original funding source (UPI handle, Google Pay / PhonePe, or corporate NEFT bank account) within <strong>2 to 3 business days</strong> with transaction UTR shared on WhatsApp.
            </p>
          </section>

        </div>

        {/* Bottom Support Action Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Need assistance with an existing order or claim?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Message our support desk with your photos for immediate review and resolution.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span>Direct WhatsApp: +91-9810157695</span>
              <span>·</span>
              <span>Helpline: +91-9266944315</span>
              <span>·</span>
              <span>Email: {SUPPORT_EMAIL}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleAskWhatsApp}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask Support on WhatsApp (+91-9810157695)</span>
            </motion.button>

            <button
              type="button"
              onClick={onBackToHome}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Store</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
