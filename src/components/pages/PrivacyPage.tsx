import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  EyeOff, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  MessageCircle, 
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_PRIMARY, PHONE_SECONDARY, SUPPORT_EMAIL } from '../../utils/whatsapp';

interface PrivacyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAskWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics Team! I have a question regarding your Privacy Policy & Artwork Non-Disclosure Guarantee.'
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
          <span className="font-bold text-slate-900">Privacy & Artwork Security</span>
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
              <Lock className="w-3.5 h-3.5" />
              <span>Strict Prepress Confidentiality & Non-Disclosure Guarantee</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Privacy Policy & Artwork Non-Disclosure Guarantee
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              At Shivani Graphics, we understand that client files contain proprietary branding, copyrighted artwork, corporate confidential data, and personal photographs. We treat your digital assets with bank-grade security.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-emerald-200">
              <span>Updated: October 2026</span>
              <span>·</span>
              <span>100% Zero Artwork Leakage Guarantee</span>
              <span>·</span>
              <span>Encrypted Storage</span>
            </div>
          </div>
        </motion.div>

        {/* Core Content */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <EyeOff className="w-5 h-5 text-emerald-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                1. Artwork Non-Disclosure & Intellectual Property Guarantee
              </h2>
            </div>
            <p className="text-slate-600">
              All digital files uploaded, transmitted via WhatsApp (+91-9810157695), or emailed to <strong>shivanidigitalprints@gmail.com</strong> remain the exclusive intellectual property of the respective customer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sole Purpose Usage</span>
                </div>
                <p className="text-xs text-slate-600">
                  Your files are utilized strictly for prepress proofing, CTP plate-making, and physical printing of your ordered run.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Portfolio Display Without Consent</span>
                </div>
                <p className="text-xs text-slate-600">
                  We will NEVER publish your visiting cards, corporate IDs, financial reports, or personal photos on social media or marketing portfolios without prior written permission.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Server className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                2. Data Retention & Secure File Archival
              </h2>
            </div>
            <p className="text-slate-600">
              We maintain strict digital hygiene protocols inside our Delhi NCR prepress workstation network:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>30-Day Auto Purge:</strong> Production RIP raster files and temporary cache are automatically deleted after 30 days of job dispatch unless a long-term corporate archival contract is requested for fast re-prints.</span>
              </li>
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Instant Deletion on Request:</strong> If your order contains NDA-bound corporate documents or legal litigation briefs, simply request "Immediate File Purge" on WhatsApp, and our workstation storage will be wiped immediately upon dispatch.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Lock className="w-5 h-5 text-[#50007c] shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                3. Zero Third-Party Selling / No Spam Policy
              </h2>
            </div>
            <p className="text-slate-600">
              We respect your communication channels. Shivani Graphics enforces a strict zero-spam code:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <p>• <strong>No Data Brokering:</strong> We will never sell, rent, or lease customer telephone numbers, GST details, or email addresses to advertisers, marketing brokers, or external directories.</p>
              <p>• <strong>Transactional Updates Only:</strong> WhatsApp and email messages sent to you are strictly confined to digital proof previews, invoice delivery, dispatch tracking numbers, or direct responses to your inquiries.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                4. Direct Bank & UPI Transaction Protection
              </h2>
            </div>
            <p className="text-slate-600">
              Shivani Graphics does NOT store credit or debit card numbers on any server. All commercial advance payments are settled through verified UPI handles (GPay, PhonePe, Paytm, BHIM) or official NEFT/RTGS bank transfers directly to our corporate bank account, providing full institutional security.
            </p>
          </section>

        </div>

        {/* Bottom Support Action Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Require a customized NDA for sensitive corporate prints?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We execute mutual Non-Disclosure Agreements (NDAs) for enterprise clients, legal firms, and corporate startups.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span>Official Email: {SUPPORT_EMAIL}</span>
              <span>·</span>
              <span>Helpline: +91-9810157695 / +91-9266944315</span>
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
