import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Layers, 
  MessageCircle, 
  ArrowRight,
  Printer,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onOpenBulkModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onOpenBulkModal
}) => {
  return (
    <section className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white overflow-hidden py-10 lg:py-16">
      
      {/* Subtle background print-grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copywriting */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800/60 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Delhi NCR's Premier Digital & Commercial Printing Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Commercial-Grade Printing, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-teal-300">
                Direct to WhatsApp.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Shivani Graphics crafts luxury business cards, exhibition roll-up standees, custom corporate apparel, acrylic photo wall art, and official stamps with industrial 1200 DPI accuracy. Skip clunky checkout carts—configure online and get instant WhatsApp quotation & human proofing in 2 minutes.
            </p>

            {/* Key Assurance Bullet List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>2-Hour Express Delhi NCR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Fogra-39 CMYK Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>GST Tax Invoices Included</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <span>Customize & Configure Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! I have a printing inquiry and would like to chat with a print specialist.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Quote</span>
              </a>

              <button
                type="button"
                onClick={onOpenBulkModal}
                className="px-4 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <span>Bulk Corporate Ratecard</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Mockup Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 opacity-30 blur-xl"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-slate-800/90 border border-slate-700 p-5 shadow-2xl backdrop-blur-md space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="text-xs font-semibold text-slate-300 ml-1">Shivani Quick Spec Preview</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Live Production Ready
                  </span>
                </div>

                {/* 2 Featured Preview Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-purple-500/40 shadow-lg shadow-purple-900/20 group/imgcard">
                    <div className="relative overflow-hidden rounded-lg mb-2">
                      <img 
                        src="https://img.sanishtech.com/u/f63d7b4e84f436519e1ffe5dbe248245.png" 
                        alt="Shivani Graphics · Custom Print & Signage" 
                        className="w-full h-24 object-cover rounded-lg group-hover/imgcard:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/imgcard:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs font-bold text-white">Shivani Graphics · Custom Print & Signage</p>
                    <p className="text-[11px] text-slate-400">Industrial 1200 DPI Press</p>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80" 
                      alt="Standees" 
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <p className="text-xs font-bold text-white">Roll-Up Standees</p>
                    <p className="text-[11px] text-slate-400">From ₹850 with Stand</p>
                  </div>
                </div>

                {/* Direct WhatsApp Callout Banner */}
                <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-emerald-200">Zero Wait Time Direct Line</p>
                    <p className="text-slate-300 text-[11px]">Chat on WhatsApp: +91-7053197695 for instant file checks & proofing.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
