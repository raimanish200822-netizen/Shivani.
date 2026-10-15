import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Instagram, ExternalLink, ShieldCheck, FileText, Truck, RotateCcw, FileCheck, MapPin, Phone, Mail, HelpCircle, MessageCircle } from 'lucide-react';
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
  BUSINESS_TYPE,
  PRINCIPAL_ADDRESS
} from '../utils/whatsapp';

export type PolicyRoute = 'terms' | 'privacy' | 'refund-policy' | 'artwork-guidelines' | 'contact';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenStoreModal?: () => void;
  onOpenHelpCenter: () => void;
  onOpenBulkModal: () => void;
  onNavigateAbout?: () => void;
  onNavigateTrack?: () => void;
  onNavigateAdmin?: () => void;
  onNavigatePolicy?: (policy: PolicyRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStoreModal,
  onOpenHelpCenter,
  onOpenBulkModal,
  onNavigateAbout,
  onNavigateTrack,
  onNavigateAdmin,
  onNavigatePolicy
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  const handleRoute = (route: PolicyRoute) => {
    if (onNavigatePolicy) {
      onNavigatePolicy(route);
    } else if (route === 'contact' && onOpenStoreModal) {
      onOpenStoreModal();
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 text-xs">
      
      {/* Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center space-y-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#50007c] via-purple-700 to-orange-500 flex items-center justify-center text-white font-black text-base shadow-sm">
              SG
            </div>
            <div className="flex items-center font-sans font-black text-2xl sm:text-3xl tracking-tight leading-none">
              <span className="text-[#50007c]">Shivani</span>
              <span className="text-orange-500 ml-1.5">Graphics</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold tracking-wide mt-2">
            One-Stop Digital Printing & Corporate Branding Solutions
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-2">
          Shivani Graphics makes your Print, Signage & Gifting Hassle-free
        </p>
        <p className="text-[11px] text-slate-500">
          India's trusted Commercial Print & Signage Studio · Mahavir Enclave, New Delhi
        </p>
      </div>

      {/* Desktop 4-Column Layout (Clean, Standard E-commerce Footer) */}
      <div className="hidden md:grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 text-[12px]">
        
        {/* Column 1: Our Company */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Our Company</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <button 
                type="button" 
                onClick={onNavigateAbout}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                About Shivani Graphics
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('contact')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Store & Production Facility
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onOpenBulkModal}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Corporate Brand Solutions
              </button>
            </li>
            <li>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-orange-500" />
                <span>Visit Us on Google Maps</span>
              </a>
            </li>
            <li className="text-slate-500 text-[11px] pt-1">
              GST Compliant Business Invoicing (18% ITC)
            </li>
          </ul>
        </div>

        {/* Column 2: Customer Support */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Customer Support</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('contact')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Contact Us & Store Directions
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onOpenHelpCenter}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Help Center & FAQs
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onNavigateTrack}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Track Your Order
              </button>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! I want to request a custom quotation for bulk digital printing.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>Request Custom Quote on WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Policies (Normal, Standard Web Format) */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Policies</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('terms')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Terms of Service</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('privacy')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Privacy Policy</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('refund-policy')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Refund & Cancellation Policy</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => handleRoute('artwork-guidelines')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Artwork & Print Guidelines</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Popular Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Popular Departments</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('paper-documents')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Paper & Document Printing
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('cards-invitations')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Scroll Wedding & Invitations
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('custom-promotional')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Mug & T-Shirt Printing / Stamps
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('signage-vinyl')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Flex Banners & 3D Sign Boards
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('finishing-binding')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block"
              >
                Binding, Lamination & PVC Smart Cards
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => onSelectCategory('all')}
                className="hover:text-[#50007c] hover:underline cursor-pointer text-left block font-bold text-purple-700"
              >
                Browse All 25 Products
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Mobile Collapsible Accordion (md:hidden) */}
      <div className="md:hidden max-w-3xl mx-auto px-4 divide-y divide-slate-200 border-t border-slate-200">
        
        {/* Accordion 1: Find Store & Contact */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleSection('stores')}
            className="w-full flex items-center justify-between font-bold text-slate-900 py-1 cursor-pointer"
          >
            <span>Find Stores & Contact</span>
            <span className="text-slate-500">
              {openSection === 'stores' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          {openSection === 'stores' && (
            <div className="pt-2 pb-1 space-y-2 text-slate-600 text-[11px] sm:text-xs animate-in fade-in duration-150">
              <p className="font-bold text-slate-800">
                Primary Print Center & Store:
              </p>
              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-slate-700 hover:text-[#50007c] leading-snug"
              >
                {STORE_ADDRESS}
              </a>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRoute('contact')}
                  className="text-[#50007c] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#50007c]" />
                  <span>Contact & Store Directions</span>
                </button>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Our Company */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleSection('company')}
            className="w-full flex items-center justify-between font-bold text-slate-900 py-1 cursor-pointer"
          >
            <span>Our Company</span>
            <span className="text-slate-500">
              {openSection === 'company' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          {openSection === 'company' && (
            <div className="pt-2 pb-1 space-y-2 text-slate-600 text-[11px] sm:text-xs animate-in fade-in duration-150">
              <button 
                type="button" 
                onClick={onNavigateAbout} 
                className="block text-left text-[#50007c] font-bold hover:underline cursor-pointer"
              >
                About Shivani Graphics
              </button>
              <button 
                type="button" 
                onClick={() => handleRoute('contact')} 
                className="block text-left text-slate-700 hover:text-[#50007c] hover:underline cursor-pointer"
              >
                Store Facility in Mahavir Enclave
              </button>
              <button 
                type="button" 
                onClick={onOpenBulkModal} 
                className="block text-left text-slate-700 hover:text-[#50007c] hover:underline cursor-pointer"
              >
                Corporate Brand Solutions
              </button>
              <p className="text-slate-500">GST Compliant Business Invoicing (18% ITC Input Tax Credit)</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Policies (Normal, Human-Friendly Labels) */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleSection('policies')}
            className="w-full flex items-center justify-between font-bold text-slate-900 py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Policies</span>
            </span>
            <span className="text-slate-500">
              {openSection === 'policies' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          {openSection === 'policies' && (
            <div className="pt-2 pb-1 space-y-2 text-slate-700 text-[11px] sm:text-xs animate-in fade-in duration-150">
              <button 
                type="button"
                onClick={() => handleRoute('terms')}
                className="w-full text-left font-semibold text-slate-800 hover:text-[#50007c] hover:underline flex items-center gap-2 cursor-pointer py-0.5"
              >
                <Truck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Terms of Service</span>
              </button>

              <button 
                type="button"
                onClick={() => handleRoute('privacy')}
                className="w-full text-left font-semibold text-slate-800 hover:text-[#50007c] hover:underline flex items-center gap-2 cursor-pointer py-0.5"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Privacy Policy</span>
              </button>

              <button 
                type="button"
                onClick={() => handleRoute('refund-policy')}
                className="w-full text-left font-semibold text-slate-800 hover:text-[#50007c] hover:underline flex items-center gap-2 cursor-pointer py-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Refund & Cancellation Policy</span>
              </button>

              <button 
                type="button"
                onClick={() => handleRoute('artwork-guidelines')}
                className="w-full text-left font-semibold text-slate-800 hover:text-[#50007c] hover:underline flex items-center gap-2 cursor-pointer py-0.5"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Artwork & Print Guidelines</span>
              </button>
            </div>
          )}
        </div>

        {/* Accordion 4: Customer Support */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleSection('support')}
            className="w-full flex items-center justify-between font-bold text-slate-900 py-1 cursor-pointer"
          >
            <span>Customer Support</span>
            <span className="text-slate-500">
              {openSection === 'support' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          {openSection === 'support' && (
            <div className="pt-2 pb-1 space-y-2 text-slate-600 text-[11px] sm:text-xs animate-in fade-in duration-150">
              <button 
                type="button"
                onClick={() => handleRoute('contact')} 
                className="block text-left text-[#50007c] font-semibold hover:underline cursor-pointer"
              >
                Contact Us & Store Directions
              </button>
              <button 
                type="button"
                onClick={onOpenHelpCenter} 
                className="block text-left text-slate-700 hover:text-[#50007c] font-semibold hover:underline cursor-pointer"
              >
                Help Center (Phone & Email Lines)
              </button>
              <button 
                type="button"
                onClick={onOpenBulkModal} 
                className="block text-left hover:underline cursor-pointer text-slate-700"
              >
                Business & Corporate Solutions / Custom RFQ
              </button>
              <button 
                type="button"
                onClick={onNavigateTrack} 
                className="block text-left hover:underline cursor-pointer text-slate-700"
              >
                Track Print Order Progress
              </button>
            </div>
          )}
        </div>

        {/* Accordion 5: Important Product Links */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleSection('links')}
            className="w-full flex items-center justify-between font-bold text-slate-900 py-1 cursor-pointer"
          >
            <span>Popular Categories</span>
            <span className="text-slate-500">
              {openSection === 'links' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          {openSection === 'links' && (
            <div className="pt-2 pb-1 grid grid-cols-2 gap-2 text-slate-600 text-[11px] sm:text-xs animate-in fade-in duration-150">
              <button type="button" onClick={() => onSelectCategory('paper-documents')} className="text-left hover:underline cursor-pointer">
                Paper & Documents
              </button>
              <button type="button" onClick={() => onSelectCategory('cards-invitations')} className="text-left hover:underline cursor-pointer">
                Scroll & Wedding Cards
              </button>
              <button type="button" onClick={() => onSelectCategory('custom-promotional')} className="text-left hover:underline cursor-pointer">
                Mugs, Tees & Stamps
              </button>
              <button type="button" onClick={() => onSelectCategory('signage-vinyl')} className="text-left hover:underline cursor-pointer">
                Flex & 3D Sign Boards
              </button>
              <button type="button" onClick={() => onSelectCategory('finishing-binding')} className="text-left hover:underline cursor-pointer">
                Binding & PVC Cards
              </button>
              <button type="button" onClick={() => onSelectCategory('all')} className="text-left hover:underline cursor-pointer font-bold text-purple-700">
                All 25 Products
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Social Links, Standard Legal Row & Official Clickable Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-slate-200 mt-4 space-y-5">
        
        {/* Standard Horizontal Policy Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-xs text-slate-600 font-medium">
          <button 
            type="button" 
            onClick={() => handleRoute('terms')} 
            className="hover:text-[#50007c] hover:underline cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="text-slate-300">·</span>
          <button 
            type="button" 
            onClick={() => handleRoute('privacy')} 
            className="hover:text-[#50007c] hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-slate-300">·</span>
          <button 
            type="button" 
            onClick={() => handleRoute('refund-policy')} 
            className="hover:text-[#50007c] hover:underline cursor-pointer"
          >
            Refund Policy
          </button>
          <span className="text-slate-300">·</span>
          <button 
            type="button" 
            onClick={() => handleRoute('artwork-guidelines')} 
            className="hover:text-[#50007c] hover:underline cursor-pointer"
          >
            Artwork Guidelines
          </button>
          <span className="text-slate-300">·</span>
          <button 
            type="button" 
            onClick={() => handleRoute('contact')} 
            className="hover:text-[#50007c] hover:underline cursor-pointer"
          >
            Contact Us
          </button>
          {onNavigateAdmin && (
            <>
              <span className="text-slate-300">·</span>
              <button 
                type="button" 
                onClick={onNavigateAdmin} 
                className="hover:text-[#50007c] font-black text-[#50007c] hover:underline cursor-pointer"
              >
                ⚙️ Admin Panel
              </button>
            </>
          )}
        </div>





        {/* Social Icons with Verified Real URLs */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs hover:scale-110 transition-transform"
            aria-label="Follow Shivani Graphics on Instagram"
            title="Follow on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! I have an inquiry about digital printing.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-600 text-white shadow-xs hover:scale-110 transition-transform font-bold text-xs"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            WA
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Printing%20Inquiry%20-%20Shivani%20Graphics`}
            className="p-2.5 rounded-full bg-[#50007c] text-white shadow-xs hover:scale-110 transition-transform font-bold text-xs"
            aria-label="Email Shivani Graphics"
            title="Send Email"
          >
            @
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-blue-600 text-white shadow-xs hover:scale-110 transition-transform text-xs"
            aria-label="View on Google Maps"
            title="Google Maps Location"
          >
            <MapPin className="w-4 h-4" />
          </a>
        </div>

        {/* Payment badges */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
          <span className="px-2 py-0.5 bg-slate-100 rounded text-blue-900 font-black">VISA</span>
          <span className="px-2 py-0.5 bg-slate-100 rounded text-red-600 font-black">Mastercard</span>
          <span className="px-2 py-0.5 bg-slate-100 rounded text-emerald-700 font-black">UPI / GPay</span>
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Shivani Graphics (Shivani Digital Prints). All Rights Reserved. · Mahavir Enclave, New Delhi
        </p>

      </div>

      {/* Running Bottom Bar: Designed & Developed by Safe Door */}
      <div 
        aria-label="Developer Credits"
        className="bg-slate-950 text-slate-200 py-2.5 overflow-hidden border-t border-slate-800 select-none relative"
      >
        <div className="flex w-full overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap text-xs font-bold will-change-transform py-0.5"
          >
            {/* First loop */}
            {[...Array(4)].map((_, idx) => (
              <div key={`safedoor-a-${idx}`} className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="text-orange-400">⚡</span>
                  <span className="tracking-wide">
                    Designed & Developed by{' '}
                    <strong className="text-white font-black tracking-wider underline decoration-orange-500 decoration-2 underline-offset-4">
                      Safe Door
                    </strong>
                  </span>
                </span>
                <span className="text-purple-400 font-bold">✦</span>
                <span className="text-slate-400 font-medium">
                  Crafted with Excellence for Shivani Graphics
                </span>
                <span className="text-emerald-400 font-bold">✦</span>
              </div>
            ))}
            {/* Duplicate loop for seamless infinite marquee */}
            {[...Array(4)].map((_, idx) => (
              <div key={`safedoor-b-${idx}`} className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="text-orange-400">⚡</span>
                  <span className="tracking-wide">
                    Designed & Developed by{' '}
                    <strong className="text-white font-black tracking-wider underline decoration-orange-500 decoration-2 underline-offset-4">
                      Safe Door
                    </strong>
                  </span>
                </span>
                <span className="text-purple-400 font-bold">✦</span>
                <span className="text-slate-400 font-medium">
                  Crafted with Excellence for Shivani Graphics
                </span>
                <span className="text-emerald-400 font-bold">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </footer>
  );
};
