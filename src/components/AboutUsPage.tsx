import React from 'react';
const facilityImg = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Instagram
} from 'lucide-react';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_SECONDARY, 
  SUPPORT_EMAIL, 
  STORE_ADDRESS, 
  GOOGLE_MAPS_URL, 
  INSTAGRAM_URL,
  BUSINESS_TRADE_NAME,
  BUSINESS_GSTIN,
  BUSINESS_OWNER,
  BUSINESS_OWNER_FULL,
  BUSINESS_TYPE
} from '../utils/whatsapp';
import { useAdmin } from '../context/AdminContext';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onExploreCatalog: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBackToHome, onExploreCatalog }) => {
  const { websiteContent } = useAdmin();

  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={onBackToHome} className="hover:text-[#50007c] font-medium">Home</button>
          <span>/</span>
          <span className="font-bold text-slate-900">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#50007c] rounded-full text-xs font-bold">
            <Printer className="w-3.5 h-3.5" />
            <span>Delhi NCR's Premier Commercial Print Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {websiteContent.aboutTitle || 'Crafting Tangible Brand Magic for Startups & Enterprises'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {websiteContent.aboutDescription || 'Welcome to Shivani Graphics (Shivani Digital Prints). Operating from Mahavir Enclave, New Delhi, we provide end-to-end commercial digital printing, corporate merchandise, exhibition displays, and official business stationery with rapid 4-hour express turnaround.'}
          </p>

          {websiteContent.aboutMission && (
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs font-bold text-purple-900">
              Mission & Quality Promise: {websiteContent.aboutMission}
            </div>
          )}
        </div>

        {/* Big Facility Banner with User Provided Photo */}
        <div className="space-y-3">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-16/9 max-h-[480px] border-2 border-purple-200 bg-slate-900">
            <img 
              src={facilityImg} 
              alt="Shivani Graphics Store & Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold w-fit mb-2">
                Live Studio & Workshop View
              </span>
              <p className="font-black text-xl sm:text-3xl">Shivani Graphics — Mahavir Enclave, New Delhi</p>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
                Our fully equipped digital printing studio, retail counter, and production floor delivering instant counter service and same-day corporate prints.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Shivani Graphics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
            <Clock className="w-6 h-6 text-[#50007c]" />
            <h3 className="font-bold text-sm text-slate-900">5-Min Counter & Same-Day Speed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              5-minute counter pickup and same-day express bike courier delivery across Delhi NCR for urgent meetings and events.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
            <Award className="w-6 h-6 text-orange-600" />
            <h3 className="font-bold text-sm text-slate-900">1200 DPI Industrial Output</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Heavy 350-400 GSM art cardboards, velvet touch laminations, and raised spot UV tactile embossing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Zero-Form Ordering</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip clunky gateways and forgotten passwords. Send order specs directly via WhatsApp & Email with live human proofing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">GST 18% Tax Compliant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full commercial tax invoices with your business GSTIN for 100% input tax credit on corporate expenses.
            </p>
          </div>

        </div>

        {/* Machinery & Infrastructure Details */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Our Advanced Press Infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              We invest in world-class industrial machinery to ensure uniform color stability and rapid throughput:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>High-Speed Digital Presses</span>
              </span>
              <p className="text-xs text-slate-600">
                Konica Minolta AccurioPress engines for ultra-fine micro-text, corporate letterheads, visiting cards, and booklets.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Large Format Eco-Solvent & Flex</span>
              </span>
              <p className="text-xs text-slate-600">
                10-foot wide Roland and Star printers delivering weather-resistant exhibition pull-up standees and outdoor banners.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct-to-Film (DTF) Apparel</span>
              </span>
              <p className="text-xs text-slate-600">
                High-density multi-color textile printers for 100% bio-washed cotton round necks, executive polos, and hoodies.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Laser Engravers & Stamp Lab</span>
              </span>
              <p className="text-xs text-slate-600">
                Precision laser die cutters producing self-inking official stamps with 10,000+ crisp impressions ready in 60 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Official Business Registration & Tax Credentials */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Government Registered Entity</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Business & Tax Compliance Details
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-400 block">GSTIN REGISTRATION</span>
              <span className="font-mono font-extrabold text-sm text-[#50007c] bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block mt-0.5">
                {BUSINESS_GSTIN}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Trade Name & Entity</span>
              <p className="font-extrabold text-slate-900 text-sm">{BUSINESS_TRADE_NAME}</p>
              <p className="text-slate-500 font-medium">Business Type: {BUSINESS_TYPE}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Owner / Leadership</span>
              <p className="font-extrabold text-slate-900 text-sm">{BUSINESS_OWNER} ({BUSINESS_OWNER_FULL})</p>
              <p className="text-slate-500 font-medium">Proprietor / CEO</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">GST Tax Status</span>
              <p className="font-extrabold text-emerald-700 text-sm">Active & Verified (18% ITC)</p>
              <p className="text-slate-500 font-medium">Full Commercial Invoices for Corporate ITC</p>
            </div>



            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Helplines</span>
              <p className="font-bold text-slate-900">+91-9810157695</p>
              <p className="font-bold text-slate-900">+91-9266944315</p>
            </div>
          </div>
        </div>

        {/* Interactive Delhi NCR Delivery Zones Map & Coverage */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-bold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delhi NCR Express Logistics & Coverage Map</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">Interactive Delhi NCR Delivery Zones</h2>
              <p className="text-xs text-purple-200">Click a zone below or check your location to view guaranteed express printing and dispatch times from our Mahavir Enclave hub.</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">HQ Location</span>
              <span className="font-extrabold text-xs text-orange-400">Mahavir Enclave, New Delhi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Zones List / Interactive Selector */}
            <div className="space-y-2.5 lg:col-span-1">
              <p className="text-[11px] font-black uppercase tracking-wider text-purple-300 mb-1">Select Delivery Zone:</p>
              {[
                { zone: 'Mahavir Enclave / Dwarka / Palam', time: '15 - 30 Mins', type: 'Instant Counter & Bike Express', status: 'Active Dispatch' },
                { zone: 'Janakpuri / Uttam Nagar / Rajouri', time: '30 - 45 Mins', type: 'Same-Day Express Courier', status: 'Active Dispatch' },
                { zone: 'Connaught Place / Central Delhi', time: '45 - 60 Mins', type: 'Priority Corporate Fleet', status: 'Active Dispatch' },
                { zone: 'South Delhi (Greater Kailash, Saket)', time: '45 - 75 Mins', type: 'Express Delivery', status: 'Active Dispatch' },
                { zone: 'Noida (Sector 18 / Expressway)', time: 'Same Day', type: 'Scheduled Express Dispatch', status: 'Daily Runs' },
                { zone: 'Gurgaon (Cyber City / Udyog Vihar)', time: 'Same Day', type: 'Scheduled Express Dispatch', status: 'Daily Runs' },
                { zone: 'Faridabad & Ghaziabad', time: 'Next Morning', type: 'Secure Transit Cargo', status: 'Scheduled' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white group-hover:text-orange-400 transition-colors block">{item.zone}</span>
                    <span className="text-[10px] text-purple-300">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-orange-500 text-white font-black text-[10px] rounded-lg block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Interactive Map View with Hub Marker */}
            <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-purple-500/40 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-white">Live Hub Status: Fully Operational</span>
                </div>
                <span className="text-[11px] text-purple-300 font-mono">GPS: 28.5982° N, 77.0863° E</span>
              </div>

              <div className="relative z-10 my-8 text-center space-y-4">
                <div className="inline-block p-4 bg-gradient-to-tr from-purple-600 to-orange-500 rounded-full shadow-2xl animate-bounce">
                  <Printer className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Shivani Graphics Central Print Hub</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Strategically located in Mahavir Enclave, New Delhi, ensuring direct arterial access to Dwarka Expressway, Ring Road, and NH-48 for lightning-fast Delhi NCR dispatch.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-purple-200 gap-2">
                <span>⚡ 4-Hour Express Turnaround Available</span>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Contact Information */}
        <div className="bg-[#50007c] text-white p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">Visit Our Studio & Store</p>
              <h3 className="text-xl sm:text-2xl font-black mt-1">Shivani Graphics (Shivani Digital Prints)</h3>
              <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg">
                {STORE_ADDRESS}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-400/30 flex flex-wrap items-center gap-6 text-xs text-purple-100">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91-9810157695 / +91-9266944315</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span>{SUPPORT_EMAIL}</span>
            </span>
            <span>Mon–Sat: 9:30 AM – 8:30 PM</span>
          </div>
        </div>

      </div>
    </div>
  );
};
