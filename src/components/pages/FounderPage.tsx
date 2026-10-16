import React, { useState } from 'react';
import { 
  Printer, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Sparkles,
  ExternalLink,
  Calendar,
  Building2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_PRIMARY, 
  PHONE_SECONDARY,
  FOUNDER_PHONE,
  FOUNDER_PHONE_DISPLAY,
  FOUNDER_WHATSAPP, 
  STORE_ADDRESS, 
  GOOGLE_MAPS_URL, 
  BUSINESS_OWNER, 
  BUSINESS_TRADE_NAME 
} from '../../utils/whatsapp';
import { useAdmin } from '../../context/AdminContext';
import { CachedImage } from '../../services/imageService';

interface FounderPageProps {
  onBackToHome: () => void;
  onExploreCatalog: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({ onBackToHome, onExploreCatalog }) => {
  const { websiteContent } = useAdmin();

  // Photo priority: Admin Panel / Firestore content takes top priority, then local upload fallback
  const founderPhoto = websiteContent.founderImageUrl || (typeof window !== 'undefined' ? localStorage.getItem('shivani_founder_photo') : '') || '';
  const companyPhoto = websiteContent.companyImageUrl || (typeof window !== 'undefined' ? localStorage.getItem('shivani_company_photo') : '') || '';

  const founderName = websiteContent.founderName || BUSINESS_OWNER;
  const founderRole = websiteContent.founderRole || 'Founder & Managing Director';
  const founderPhoneDisplay = websiteContent.founderPhone || FOUNDER_PHONE_DISPLAY; // +91-9810157695 (Second number)
  const founderWhatsappNum = websiteContent.founderWhatsapp || FOUNDER_WHATSAPP; // 919810157695 (Second number)
  const founderCallingDigits = founderPhoneDisplay.replace(/[^0-9]/g, '');

  const handleWhatsAppFounder = () => {
    const text = encodeURIComponent(
      `Hello ${founderName}! I visited your Founder Page on the Shivani Graphics website. I would like to connect with you regarding a custom printing project.`
    );
    window.open(`https://wa.me/${founderWhatsappNum}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-14 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button 
            type="button"
            onClick={onBackToHome} 
            className="hover:text-[#50007c] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 font-bold">Meet Our Founder</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-[#50007c] font-bold tracking-wider uppercase">
            <span className="flex items-center gap-1.5 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
              <Building2 className="w-3.5 h-3.5 text-[#50007c]" />
              {BUSINESS_TRADE_NAME}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-orange-600 font-bold">Since 1996</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">28+ Years of Printing Mastercraft</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Craftsmanship, Ink & Unwavering Trust
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {websiteContent.founderBio || `The visionary journey of ${founderName}, who founded Shivani Graphics in 1996 with a singular pledge: to give every business, creator, and individual pristine commercial print quality with personal accountability.`}
          </p>
        </header>

        {/* Main 2-Column Showcase: Founder Profile & Facility Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Founder Profile Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 space-y-6">
            
            {/* Founder Photo Frame */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Founder Portrait</span>
                <span className="text-[11px] font-bold text-[#50007c] bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                  Leadership
                </span>
              </div>

              {/* Photo Display Container */}
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#28003e] via-[#50007c] to-[#7915a8] flex flex-col items-center justify-center text-white border border-slate-200 shadow-inner group">
                {founderPhoto ? (
                  <CachedImage 
                    src={founderPhoto} 
                    fallbackSrc="/logo.jpg"
                    alt={`${founderName} - Founder of Shivani Graphics`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 text-center space-y-4 max-w-xs">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-xs border-2 border-white/30 flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-black text-amber-300">{founderName[0] || 'R'}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">{founderName}</h3>
                      <p className="text-xs text-purple-200 mt-1 font-medium">{founderRole}</p>
                      <p className="text-[11px] text-purple-300 mt-0.5">Shivani Graphics · Est. 1996</p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 text-purple-100 px-3.5 py-1.5 rounded-full border border-white/20">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        28+ Years of Mastercraft
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Floating Tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg text-white flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold">{founderName}</p>
                    <p className="text-[10px] text-slate-300">{founderRole}</p>
                  </div>
                  <span className="text-[10px] bg-orange-500 font-bold px-2 py-0.5 rounded text-white">
                    Since 1996
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Connect Actions with Founder (Second Number: +91 9810157695) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleWhatsAppFounder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp with {founderName}</span>
              </button>

              <a
                href={`tel:+${founderCallingDigits}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Call {founderName} (Founder): {founderPhoneDisplay}</span>
              </a>
            </div>

            {/* Founder Quick Credentials */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-xs text-slate-600 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Founder Direct Line (2nd No.)</span>
                <strong className="text-slate-900 font-bold">{founderPhoneDisplay}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Founded Year</span>
                <strong className="text-slate-900 font-bold">1996 (28+ Years Active)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Headquarters</span>
                <strong className="text-slate-900 font-bold">Mahavir Enclave, New Delhi</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Specialization</span>
                <strong className="text-slate-900 font-bold">Digital, Offset, Large Format UV</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Clients Served</span>
                <strong className="text-slate-900 font-bold">10,000+ Businesses Pan-India</strong>
              </div>
            </div>

          </div>

          {/* Right Column: Founder's Story & Facility Space (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The Founder's Letter / Message */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Founder's Message to Every Customer</span>
              </div>

              <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed italic border-l-2 border-[#50007c] pl-4 sm:pl-5 space-y-3">
                <p>
                  "{websiteContent.founderQuote || 'When I started Shivani Graphics in 1996, printing in Delhi was about painstaking manual metal types, chemical films, and days of waiting. But one thing has never changed: when a client gives us their brand\'s visiting card, brochure, packaging, or banner, they are trusting us with their hard-earned reputation.'}"
                </p>
                <p>
                  "To me, no order is too small or too large. Whether you need 100 premium business cards for your startup pitch or 10,000 corporate brochures for an exhibition, my team and I personally verify paper thickness, CMYK color sharpness, and fine crease finishing before it leaves our press."
                </p>
              </blockquote>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{founderName}</h4>
                  <p className="text-xs text-slate-500">{founderRole}, Shivani Graphics</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#50007c] bg-purple-50 px-2.5 py-1 rounded">
                    ESTD. 1996
                  </span>
                </div>
              </div>
            </div>

            {/* Shivani Graphics Facility & Press Photo Space */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#50007c]" />
                    Shivani Graphics Print Facility & Store
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our active production facility at Mahavir Enclave, New Delhi
                  </p>
                </div>
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  New Delhi Hub
                </span>
              </div>

              {/* Facility Photo Box */}
              <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex flex-col items-center justify-center text-white shadow-inner">
                {companyPhoto ? (
                  <CachedImage 
                    src={companyPhoto} 
                    fallbackSrc="/promo-banner.png"
                    alt="Shivani Graphics Printing Facility - Mahavir Enclave New Delhi" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 text-center space-y-3 max-w-md">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-purple-300">
                      <Printer className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        Shivani Graphics Production Hub
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        High-Speed Digital Presses · Heidelberg Offset Line · Eco-Solvent Vinyl Rollers · Laser Die-Cutting
                      </p>
                    </div>
                    <div className="pt-1 flex items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-purple-200 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        Mahavir Enclave, Palam Road, New Delhi
                      </span>
                    </div>
                  </div>
                )}

                {/* Facility location badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="truncate">{STORE_ADDRESS}</span>
                  </div>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-purple-300 hover:text-white flex items-center gap-1 font-bold underline shrink-0 ml-2"
                  >
                    Open Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Journey Timeline: 1996 to Today */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#50007c]" />
                  The 28-Year Legacy Timeline
                </h3>
                <span className="text-xs font-bold text-slate-500">1996 — Present</span>
              </div>

              <div className="relative border-l-2 border-purple-100 ml-3 pl-6 space-y-6 text-xs sm:text-sm">
                
                {/* 1996 Founding */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#50007c] border-2 border-white ring-2 ring-purple-200" />
                  <span className="text-xs font-bold text-purple-700">1996</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Founding of Shivani Graphics</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {founderName} opened the first workshop in New Delhi with a manual letterpress machine and a passion for typography, servicing local traders and small shops.
                  </p>
                </div>

                {/* 2005 Multi-Color Offset */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-white ring-2 ring-slate-100" />
                  <span className="text-xs font-bold text-slate-500">2005</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Commercial Offset Expansion</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Upgraded to heavy 4-color offset machinery for mass printing of corporate stationery, wedding card boxes, and multi-page catalogues.
                  </p>
                </div>

                {/* 2014 Digital Revolution */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-white ring-2 ring-slate-100" />
                  <span className="text-xs font-bold text-slate-500">2014</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Instant Digital Production & Large-Format Signage</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Integrated Japanese high-resolution digital production presses for same-day visiting cards, flex banners, and rollup standees.
                  </p>
                </div>

                {/* Today */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100" />
                  <span className="text-xs font-bold text-emerald-700">Today (2026)</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Pan-India Corporate Printing Hub</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Over 10,000 satisfied business accounts, 4-hour express courier dispatches in Delhi NCR, and custom merchandising for startups and enterprises.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Founder's 4 Inviolable Quality Pillars */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900">{founderName}'s 4 Pillars of Printing Excellence</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              The benchmark standards upheld across every single sheet printed at Shivani Graphics since 1996.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#50007c] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="text-sm font-bold text-slate-900">True 350+ GSM Board Weight</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never compromise with flimsy paper. Every business card and booklet cover is printed on certified heavyweight stock.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="text-sm font-bold text-slate-900">Color Fidelity Guaranteed</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calibrated RIP color profiles ensure your corporate logo colors match perfectly across screens and physical substrates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="text-sm font-bold text-slate-900">Free Reprint Promise</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If there is any printing or cutting defect from our end, we reprint the entire batch immediately without debate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="text-sm font-bold text-slate-900">Honest Direct Pricing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hidden prepress fees, no surprise GST additions, and transparent quotes upfront via WhatsApp or online catalog.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#2a0042] via-[#50007c] to-[#1c002c] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Have a Custom Printing Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Talk directly with {founderName} and our pre-press production team for bulk quotes, custom corporate gifts, or same-day express orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleWhatsAppFounder}
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp {founderName} Directly</span>
            </button>

            <button
              type="button"
              onClick={onExploreCatalog}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition cursor-pointer"
            >
              Explore Products
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
