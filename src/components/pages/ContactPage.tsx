import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Navigation, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_SECONDARY, 
  SUPPORT_EMAIL, 
  STORE_ADDRESS, 
  GOOGLE_MAPS_URL, 
  INSTAGRAM_URL,
  BUSINESS_GSTIN,
  BUSINESS_OWNER,
  BUSINESS_OWNER_FULL,
  BUSINESS_TYPE
} from '../../utils/whatsapp';

interface ContactPageProps {
  onBackToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const [name, setName] = useState('');
  const [service, setService] = useState('Visiting Cards');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*DIRECT INQUIRY - SHIVANI GRAPHICS*`,
      `--------------------------------------`,
      `*Name:* ${name.trim() || 'Customer'}`,
      `*Service Required:* ${service}`,
    ];
    if (message.trim()) {
      lines.push(`*Requirement Details:* ${message.trim()}`);
    }
    lines.push(`--------------------------------------`);
    lines.push(`Please share quotation, digital proof details, and turnaround time.`);
    
    const url = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 pb-28 sm:pb-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-8">
        
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
          <span className="font-bold text-slate-900">Contact Us & Store Location</span>
        </nav>

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#50007c] via-purple-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-orange-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delhi NCR Facility · Express Store Pickup & Pan-India Dispatch</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Contact Shivani Graphics (Shivani Digital Prints)
            </h1>

            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              Whether you need urgent 4-hour visiting cards in Delhi, corporate team apparel, roll-up exhibition standees, or wholesale custom packaging, our printing specialists are here to assist you instantly.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-purple-200">
              <span>Direct WhatsApp: +91-9810157695</span>
              <span>·</span>
              <span>Helpline: +91-9266944315</span>
              <span>·</span>
              <span>Store: Mahavir Enclave, New Delhi</span>
            </div>
          </div>
        </motion.div>

        {/* Main 2-Column Content: Left Contact Cards & Right Direct Form + Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column (5 Cols): Official Channels & Timings */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Channel Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#50007c]" />
                <span>Print Facility & Store Location</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">Registered Office & Press:</p>
                    <p className="text-slate-600 leading-relaxed break-words">{STORE_ADDRESS}</p>
                    <p className="text-[11px] text-slate-500">
                      Landmark: Near Mahavir Enclave Metro Station / Palam Flyover / Dwarka Sector 1
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">Operating Hours:</p>
                    <p className="text-slate-600">Monday - Saturday: 9:30 AM to 9:00 PM IST</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">Sunday: Emergency Exhibition Printing by Appointment</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-orange-200"
                >
                  <Navigation className="w-4 h-4 text-orange-600" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Helpline Numbers Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3.5">
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Phone & Digital Communication
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <a
                  href={`https://wa.me/${WHATSAPP_PRIMARY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>WhatsApp / Primary Line</span>
                  </div>
                  <span className="text-emerald-700">+91-9810157695</span>
                </a>

                <a
                  href={`tel:${PHONE_SECONDARY}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200 text-purple-950 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#50007c]" />
                    <span>Secondary Help Desk</span>
                  </div>
                  <span className="text-[#50007c]">+91-9266944315</span>
                </a>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Official Email</span>
                  </div>
                  <span className="text-slate-600 text-[11px] truncate max-w-[160px] sm:max-w-none">{SUPPORT_EMAIL}</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-pink-600 font-black">IG</span>
                    <span>Instagram Profile</span>
                  </div>
                  <span className="text-pink-600">@shivanigraphics_</span>
                </a>
              </div>
            </div>

            {/* Official Registered Business Profile */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Business Profile</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-sm text-[10px]">
                  18% GST ITC
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p><strong className="text-slate-900">Trade Name:</strong> Shivani Graphics ({BUSINESS_TYPE})</p>
                <p><strong className="text-slate-900">GSTIN:</strong> <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">{BUSINESS_GSTIN}</span></p>
                <p><strong className="text-slate-900">Owner / CEO:</strong> {BUSINESS_OWNER} ({BUSINESS_OWNER_FULL})</p>

                <p><strong className="text-slate-900">Store Facility:</strong> {STORE_ADDRESS}</p>
                <p><strong className="text-slate-900">Direct Helplines:</strong> +91-9810157695 / +91-9266944315</p>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Direct WhatsApp Form & Embedded Google Map */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Direct Inquiry Composer */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  Instant WhatsApp Quotation Request
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your print requirements below and connect immediately with our prepress team.
                </p>
              </div>

              <form onSubmit={handleSendWhatsApp} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma / Tech Solutions Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] focus:border-transparent text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service / Product Needed</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] focus:border-transparent text-slate-900 bg-white"
                  >
                    <option value="Visiting Cards (Business Cards)">Visiting Cards (Business Cards)</option>
                    <option value="Exhibition Roll-Up Standees">Exhibition Roll-Up Standees</option>
                    <option value="Custom T-Shirts & Apparel">Custom T-Shirts & Apparel</option>
                    <option value="Photo Frames & Acrylic Wall Art">Photo Frames & Acrylic Wall Art</option>
                    <option value="Self-Inking Rubber Stamps">Self-Inking Rubber Stamps</option>
                    <option value="Booklets, Catalogs & Binding">Booklets, Catalogs & Binding</option>
                    <option value="Packaging Boxes & Product Labels">Packaging Boxes & Product Labels</option>
                    <option value="Other Custom Printing Requirement">Other Custom Printing Requirement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Quantity & Specifications</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Need 500 visiting cards with velvet matte and gold foil, required within 24 hours in Delhi NCR."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] focus:border-transparent text-slate-900 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Direct WhatsApp Inquiry (+91-9810157695)</span>
                </motion.button>
              </form>
            </div>

            {/* Embedded Google Maps Iframe */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3 overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Interactive Map & Directions</span>
                </h3>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe with defensive CSS container */}
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100">
                <iframe
                  title="Shivani Graphics Store Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.493888362676!2d77.078275!3d28.58498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b67484df629%3A0xe54e5653db3c6aa6!2sMahavir%20Enclave%2C%20New%20Delhi%2C%20Delhi%20110045!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                📍 D3/50, Gali No. 8A, Mahavir Enclave, New Delhi 110045 · Visitors are welcome for paper sample books & material touch tests.
              </p>
            </div>

          </div>

        </div>

        {/* Return Button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store & Browse Products</span>
          </button>
        </div>

      </div>
    </div>
  );
};
