import React, { useEffect } from 'react';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MessageCircle, 
  ArrowLeft, 
  PhoneCall 
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_PRIMARY, PHONE_SECONDARY, SUPPORT_EMAIL, STORE_ADDRESS } from '../../utils/whatsapp';

interface TermsPageProps {
  onBackToHome: () => void;
  onNavigateContact?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBackToHome, onNavigateContact }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAskWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics Team! I have a question regarding your Terms of Service and 4-Hour Express Delivery in Delhi NCR.'
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
          <span className="font-bold text-slate-900">Terms of Service & Delivery</span>
        </nav>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#50007c] via-purple-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-orange-300">
              <Truck className="w-3.5 h-3.5" />
              <span>Official Commercial Terms & Express Fulfillment Policy</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Terms of Service & 4-Hour Express Delivery Guidelines
            </h1>

            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              Shivani Graphics (Shivani Digital Prints) operates under strict industrial print calibration, transparent turnaround standards, and express fulfillment protocols throughout Delhi NCR and nationwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-purple-200">
              <span>Updated: October 2026</span>
              <span>·</span>
              <span>Facility: Mahavir Enclave, New Delhi</span>
              <span>·</span>
              <span>GST Registered (18% ITC)</span>
            </div>
          </div>
        </motion.div>

        {/* Core Policy Content Sections */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Clock className="w-5 h-5 text-orange-500 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                1. 4-Hour Express Same-Day Delivery in Delhi NCR
              </h2>
            </div>
            <p className="text-slate-600">
              Our high-speed digital press and in-house bindery enable rapid turnaround for urgent requirements. To qualify for 4-Hour Express Delivery or Same-Day dispatch:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5 bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span><strong>Order & Proof Cut-off Time:</strong> Print-ready files (or approval of digital PDF mockups) must be confirmed via WhatsApp/Email before <strong>3:00 PM IST</strong> on business days.</span>
              </li>
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Service Zones Covered:</strong> Express bike couriers operate across New Delhi, Dwarka, Janakpuri, Palam, Connaught Place, South Delhi, Noida, and Cyber City Gurgaon.</span>
              </li>
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Free In-Store Pickup:</strong> Clients can collect completed jobs directly from our print facility at D3/50, Gali No. 8A, Mahavir Enclave, New Delhi within 2 hours of proof sign-off.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Truck className="w-5 h-5 text-[#50007c] shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                2. Pan-India Shipping & Packaging Standards
              </h2>
            </div>
            <p className="text-slate-600">
              For locations outside Delhi NCR, Shivani Graphics partners with Blue Dart Express, DTDC Air, and Delhivery:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Metro Cities (Tier 1)</h3>
                <p className="text-xs text-slate-600">24 to 48 Hours via Air Courier (Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai).</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Rest of India (Tier 2 & 3)</h3>
                <p className="text-xs text-slate-600">2 to 4 Business Days with live airway bill tracking shared on WhatsApp.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              All parcels are packed using industrial moisture-barrier bubble wrapping and rigid corrugated outer cases to prevent edge dings during transit.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                3. Color Calibration & Press Tolerance Standards
              </h2>
            </div>
            <p className="text-slate-600">
              We calibrate all digital sheet-fed presses and eco-solvent large-format machines according to ISO 12647 and Fogra-39 color standards:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <p>• <strong>CMYK Gamut Conversion:</strong> Artwork provided in RGB or Pantone spot shades will be automatically converted to CMYK process color. Minor chromatic shifts may occur when converting non-printable neon RGB hues.</p>
              <p>• <strong>Trimming Tolerances:</strong> While our hydraulic guillotine cutters feature digital optical sensors, an industry-standard cutting variance of ±1.5 mm is standard. Clients must maintain a minimum 3 mm bleed margin.</p>
              <p>• <strong>Paper Batch Variance:</strong> Grammage (GSM) and surface brightness of natural paper stocks may have minor manufacturing deviations up to ±5% across mill batches.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                4. Prepress Approval & Customer Responsibility
              </h2>
            </div>
            <p className="text-slate-600">
              Prior to initiating the print run, our team shares a digital PDF proof on WhatsApp or Email:
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-800 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Mandatory Client Verification:</span>
              </div>
              <p>
                Clients are solely responsible for thoroughly checking spelling, contact numbers, email addresses, QR codes, barcode readability, and graphic alignment on the digital proof. Once the proof is confirmed by the client, typographical errors cannot be reprinted free of cost.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                5. Registered Entity, GST Invoicing & Payment Terms
              </h2>
            </div>
            <p className="text-slate-600">
              Shivani Graphics is a registered proprietorship entity owned and operated by Ranjan (Ranjan Roy) with registered GSTIN <strong className="text-slate-900 font-mono">07AGJPR4456J1ZW</strong>. Principal place of business is located at RZC 1/98B C1 Block, Vinod Puri, Vijay Enclave, South Delhi, Delhi - 110045, with studio & customer counter facilities at Mahavir Enclave, New Delhi - 110045.
            </p>
            <p className="text-slate-600">
              All commercial orders are accompanied by authentic 18% GST tax invoices with Input Tax Credit (ITC). Corporate clients can claim full ITC by sharing their 15-digit GSTIN and company billing name during WhatsApp or email quotation.
            </p>
          </section>

        </div>

        {/* Bottom Support Action Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Have questions regarding delivery or custom terms?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our print production specialists are available directly on WhatsApp & phone helpline.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span>Primary: +91-9810157695</span>
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
