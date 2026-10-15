import React, { useEffect } from 'react';
import { 
  FileCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2, 
  FileText, 
  MessageCircle, 
  ArrowLeft, 
  Download, 
  Palette 
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_PRIMARY, PHONE_SECONDARY, SUPPORT_EMAIL } from '../../utils/whatsapp';

interface ArtworkGuidelinesPageProps {
  onBackToHome: () => void;
}

export const ArtworkGuidelinesPage: React.FC<ArtworkGuidelinesPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAskWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shivani Graphics Prepress! I want to share my artwork file (PDF/CDR) for a free print-ready check and digital proof.'
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
          <span className="text-slate-400">Prepress & Technical Support</span>
          <span>/</span>
          <span className="font-bold text-slate-900">Artwork & Proofing Guidelines</span>
        </nav>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-blue-300">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Prepress Specifications & Digital Proofing Protocol</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Prepress & Artwork Submission Guidelines
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Get sharp, vibrant, and zero-defect print output by following our official file preparation standards. We accept PDF, CorelDraw (.CDR), and Illustrator (.AI) files with free prepress proof verification.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-blue-200">
              <span>PDF / CDR / AI Supported</span>
              <span>·</span>
              <span>300 DPI High-Resolution</span>
              <span>·</span>
              <span>True CMYK Gamut</span>
              <span>·</span>
              <span>Free Pre-Flight Check</span>
            </div>
          </div>
        </motion.div>

        {/* Core Content */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Quick Checklist Matrix */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Quick File Submission Checklist
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Format</span>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Vector PDF / CDR</h3>
                <p className="text-xs text-slate-600">PDF/X-1a preferred or CorelDraw v17-v24 with fonts curved.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Resolution</span>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">300 DPI at 100%</h3>
                <p className="text-xs text-slate-600">Ensures needle-sharp text and crisp photographic depth.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Color Profile</span>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">CMYK (Fogra-39)</h3>
                <p className="text-xs text-slate-600">Convert all RGB raster graphics to prevent press hue shifts.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Bleed & Safe Zone</span>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">3 mm Bleed Margin</h3>
                <p className="text-xs text-slate-600">Keep logos & text 4 mm away from edge cut lines.</p>
              </div>
            </div>
          </section>

          {/* Section 1: Detailed Specifications */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                1. In-Depth Prepress Specifications
              </h2>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <h3 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Converting Fonts to Curves / Outlines (Crucial)</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Before exporting, always select all text elements and apply <strong>"Convert to Curves" (Ctrl + Q in CorelDraw)</strong> or <strong>"Create Outlines" (Ctrl + Shift + O in Adobe Illustrator)</strong>. This guarantees your custom typography renders identically on our prepress RIP stations without falling back to default Arial fonts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <h3 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Bleed, Trim, and Safe Zones Explained</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  • <strong>Bleed Line (+3 mm):</strong> Extend background colors and edge photos 3 mm past the cut line to eliminate thin white slivers.<br />
                  • <strong>Trim Line (Actual Size):</strong> The physical dimension of your finished item (e.g. 89 x 51 mm for visiting cards).<br />
                  • <strong>Safe Line (Inner 4 mm):</strong> Keep all vital elements (phone numbers, addresses, disclaimers, QR codes) at least 4 mm inside the trim line.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <h3 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Rich Black Formulation for Heavy Solids</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  For large dark solid backdrops, avoid 100% Plain Black (C:0, M:0, Y:0, K:100) which can print washed-out charcoal grey. Instead, use our calibrated <strong>Rich Black formula: C:40, M:30, Y:30, K:100</strong> for luxurious, velvety ink saturation. For small body text (under 12 pt), use 100% K only to prevent optical color ghosting.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Free Digital Proofing Workflow */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Palette className="w-5 h-5 text-teal-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                2. Free Digital Proofing Workflow (No Surprises)
              </h2>
            </div>
            <p className="text-slate-600">
              At Shivani Graphics, we NEVER send an unverified job directly to press. Our complimentary prepress pre-flight process ensures complete confidence:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center mx-auto">1</div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Submit File</h4>
                <p className="text-[11px] text-slate-600">Send your artwork via WhatsApp or Email.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center mx-auto">2</div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Prepress Inspection</h4>
                <p className="text-[11px] text-slate-600">Our senior designers check resolution, bleed, and CMYK gamut.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center mx-auto">3</div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Digital PDF Mockup</h4>
                <p className="text-[11px] text-slate-600">You receive a digital PDF proof on WhatsApp for final sign-off.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Don't Have Print-Ready Artwork? */}
          <section className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-800 space-y-2">
            <h3 className="font-extrabold text-amber-950 text-xs sm:text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Don't Have a Print-Ready CDR or PDF? We Can Design It For You!</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you only have a rough photo of your visiting card, a Word document, or a low-resolution JPG logo, don't worry! Our in-house creative design team can re-vectorize your brand, recreate clean CDR layout files, and craft professional press-ready artwork for a nominal design charge.
            </p>
          </section>

        </div>

        {/* Bottom Support Action Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Ready to send your artwork for free pre-flight check?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Send your PDF/CDR directly on WhatsApp or Email for instant confirmation.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span>WhatsApp: +91-9810157695</span>
              <span>·</span>
              <span>Email: {SUPPORT_EMAIL}</span>
              <span>·</span>
              <span>Store: Mahavir Enclave, New Delhi</span>
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
              <span>Submit Artwork on WhatsApp (+91-9810157695)</span>
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
