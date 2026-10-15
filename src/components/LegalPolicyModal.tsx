import React from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Truck, 
  RotateCcw, 
  FileCheck, 
  MessageCircle, 
  Mail, 
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_SECONDARY, 
  SUPPORT_EMAIL, 
  STORE_ADDRESS 
} from '../utils/whatsapp';

export type PolicyType = 'terms' | 'privacy' | 'refund' | 'artwork';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPolicy?: PolicyType;
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  isOpen,
  onClose,
  initialPolicy = 'terms'
}) => {
  const [activePolicy, setActivePolicy] = React.useState<PolicyType>(initialPolicy);

  React.useEffect(() => {
    if (initialPolicy) {
      setActivePolicy(initialPolicy);
    }
  }, [initialPolicy]);

  if (!isOpen) return null;

  const handleAskOnWhatsApp = (policyTitle: string) => {
    const text = encodeURIComponent(
      `Hello Shivani Graphics Team! I have a question regarding your ${policyTitle} for an upcoming print order.`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#50007c] via-purple-900 to-[#3b005c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                Official Commercial Policies & Guidelines
              </h2>
              <p className="text-[11px] text-purple-200">
                Shivani Graphics (Shivani Digital Prints) · Mahavir Enclave, New Delhi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-purple-200 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none px-4 pt-2 gap-1 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setActivePolicy('terms')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activePolicy === 'terms'
                ? 'bg-white text-[#50007c] border-t-2 border-[#50007c] shadow-xs font-extrabold'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>1. Terms & Delivery Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePolicy('privacy')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activePolicy === 'privacy'
                ? 'bg-white text-[#50007c] border-t-2 border-[#50007c] shadow-xs font-extrabold'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Privacy & Data Protection</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePolicy('refund')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activePolicy === 'refund'
                ? 'bg-white text-[#50007c] border-t-2 border-[#50007c] shadow-xs font-extrabold'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>3. Cancellation & Reprint Guarantee</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePolicy('artwork')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activePolicy === 'artwork'
                ? 'bg-white text-[#50007c] border-t-2 border-[#50007c] shadow-xs font-extrabold'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>4. Artwork & Prepress Proofing</span>
          </button>
        </div>

        {/* Policy Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm space-y-6 leading-relaxed">
          
          {/* TAB 1: Terms of Service & Delivery Policy */}
          {activePolicy === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#50007c]" />
                  <span>Terms of Service & Express Delivery Guidelines</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Effective Date: October 2026 · Governing orders processed via Shivani Graphics
                </p>
              </div>

              <div className="space-y-4">
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">1. Commercial Order Acceptance & Prepress Approval</h4>
                  <p>
                    All print jobs initiated via our direct WhatsApp channel (+91-9810157695) or email (shivanidigitalprints@gmail.com) are deemed legally confirmed only after the customer approves the digital PDF proof and confirms dispatch parameters. Once approved, the job enters our automated CTP (Computer-to-Plate) and digital RIP queue.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">2. Express 4-Hour Delivery in Delhi NCR</h4>
                  <p>
                    We provide same-day 4-hour express courier service across Delhi NCR (including New Delhi, Dwarka, Palam, Janakpuri, Connaught Place, Noida, and Gurgaon) for print-ready artwork submitted before 3:00 PM IST on working business days (Mon–Sat).
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    <li>Deliveries are dispatched via dedicated bike courier networks (Porter, Borzo, Dunzo for Business, or Shivani Logistics dispatch riders).</li>
                    <li>Live delivery tracking links and rider phone numbers are shared directly on the customer's WhatsApp chat upon package hand-over.</li>
                    <li>Free In-Store Collection is available at our Mahavir Enclave print hub during operational hours (9:30 AM – 8:30 PM).</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">3. Standard Nationwide Pan-India Shipping</h4>
                  <p>
                    For orders destined outside Delhi NCR across India, orders are dispatched via registered surface & air express logistics partners (Blue Dart Express, DTDC, and Delhivery).
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    <li>Metro cities (Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai): 2 to 3 working business days.</li>
                    <li>Tier-2 / Tier-3 regional destinations: 3 to 5 working business days.</li>
                    <li>Airway Bill (AWB) tracking numbers are dispatched via automated WhatsApp notification upon parcel manifesting.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">4. GST Invoicing & Corporate Billing</h4>
                  <p>
                    All commercial orders are billed under valid 18% GST regulations. To claim Input Tax Credit (ITC), clients must submit their registered Company Name and 15-digit GSTIN at the time of quotation. Official Tax Invoices are dispatched with the order package and delivered electronically via email.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: Privacy Policy & Artwork Confidentiality */}
          {activePolicy === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Privacy Policy & Artwork Non-Disclosure Guarantee</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Commitment to absolute client confidentiality, intellectual property protection, and file security.
                </p>
              </div>

              <div className="space-y-4">
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">1. Customer Data & Contact Information Safeguards</h4>
                  <p>
                    Shivani Graphics strictly adheres to the Digital Personal Data Protection Act. We only collect the minimal customer details necessary to produce and deliver your prints: recipient name, WhatsApp mobile number, delivery address, and GST details.
                  </p>
                  <p className="text-xs text-slate-600">
                    We never sell, rent, lease, or distribute customer contact details to third-party telemarketers or external advertising networks.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">2. Artwork Confidentiality & File Security</h4>
                  <p>
                    Proprietary design files, trade secrets, confidential company financial reports, executive contact databases, and personal family photographs uploaded to our systems remain 100% the intellectual property of the customer.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    <li>Files are stored solely in secure prepress workstation queues accessible exclusively by certified print operators.</li>
                    <li>Digital print buffers and RIP files are purged within 30 days of successful delivery.</li>
                    <li>We will NEVER use your custom artwork, company logos, or personal portraits in public social media promotions without explicit written consent.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">3. Zero-Database Architecture Privacy</h4>
                  <p>
                    Our website does not store sensitive financial credentials, credit card numbers, or bank passwords. All order communications and mockups are routed securely end-to-end through WhatsApp Business API and encrypted TLS email protocols.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 3: Cancellation & Refund Policy */}
          {activePolicy === 'refund' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <span>Custom Printing Cancellation, Reprint Guarantee & Refunds</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  100% Quality Assurance Guarantee on all commercial print production.
                </p>
              </div>

              <div className="space-y-4">
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">1. Nature of Custom Personalized Merchandise</h4>
                  <p>
                    Because print products (visiting cards, rubber stamps, corporate t-shirts, standees, and brochures) are custom-manufactured specifically with your bespoke graphics, text, and dimensions, they have no alternative resale value once ink is transferred onto paper or substrate.
                  </p>
                  <p className="text-xs text-slate-600">
                    Cancellations are accepted with 100% refund <strong>prior to plate exposure or press startup</strong>. Once a job has entered the printing press or finishing lamination line, cancellation is no longer feasible.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">2. 100% Free Reprint Guarantee (Manufacturing Defects)</h4>
                  <p>
                    Shivani Graphics stands firmly behind our print craftsmanship. We will provide an <strong>Immediate Free Reprint</strong> or full resolution under the following defect circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    <li>Severe color shift or banding caused by print-head calibration failure exceeding industry tolerance.</li>
                    <li>Trimming, die-cutting, or fold errors exceeding 2.0 mm variance from approved digital proof.</li>
                    <li>Incorrect paper stock GSM or lamination applied (e.g. Gloss applied instead of ordered Velvet Matte).</li>
                    <li>Physical damage during transit verified upon delivery.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">3. Defect Claim Protocol & Photographic Proof</h4>
                  <p>
                    To lodge a quality claim, customers simply need to take 2-3 clear photographs or a short video highlighting the defect and WhatsApp it to <strong>+91-9810157695</strong> or email <strong>shivanidigitalprints@gmail.com</strong> within 48 hours of parcel receipt.
                  </p>
                  <p className="text-xs text-slate-600">
                    Our technical manager will review the claim within 2 hours. If a reprint is warranted, the re-run is expedited with priority queue status.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">4. Refund Processing Timelines</h4>
                  <p>
                    In instances where a refund is approved by mutual consent, funds are reversed to the original payment source (UPI, NetBanking, or Bank Transfer) within <strong>3 to 5 business working days</strong>.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 4: Artwork & Proofing Guidelines */}
          {activePolicy === 'artwork' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Artwork Submission & Prepress Proofing Specifications</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Technical requirements to guarantee razor-sharp 1200 DPI prints and zero cutting errors.
                </p>
              </div>

              <div className="space-y-4">
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">1. Accepted File Formats</h4>
                  <p>
                    We recommend submitting vector-based native artwork:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="font-bold text-slate-900">PDF (.pdf)</p>
                      <p className="text-[10px] text-slate-500">PDF/X-1a Vector</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="font-bold text-slate-900">CorelDRAW (.cdr)</p>
                      <p className="text-[10px] text-slate-500">v11 to 2024 (Curves)</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="font-bold text-slate-900">Illustrator (.ai)</p>
                      <p className="text-[10px] text-slate-500">Outlined fonts</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="font-bold text-slate-900">Photoshop / TIFF</p>
                      <p className="text-[10px] text-slate-500">300 DPI CMYK</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">2. The 3mm Bleed & Safety Margin Rule</h4>
                  <p>
                    All artwork must include a <strong>3mm bleed margin</strong> extending beyond the final trim line to prevent white borders during industrial guillotine trimming.
                  </p>
                  <p className="text-xs text-slate-600">
                    Important text, phone numbers, and QR codes must be placed at least <strong>4mm inside</strong> the cut line (Safety Zone).
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">3. CMYK Color Space vs RGB</h4>
                  <p>
                    Computer and smartphone screens emit RGB light, whereas commercial offset and digital presses apply CMYK inks (Cyan, Magenta, Yellow, Black). All files should be converted to CMYK mode with Fogra-39 color profile. Rich Black should be set to C:30 M:30 Y:30 K:100 for solids, and C:0 M:0 Y:0 K:100 for fine text.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">4. Free Prepress Proofing Workflow</h4>
                  <p>
                    Before any file is pushed to physical printing presses, our senior prepress specialist conducts a complimentary pre-flight check:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    <li>Resolution check (ensuring images are not pixelated).</li>
                    <li>Bleed and trim margin alignment check.</li>
                    <li>Overprint and transparency flattening.</li>
                    <li>A final digital proof is sent to your WhatsApp for written "OK to Print" confirmation.</li>
                  </ul>
                </section>
              </div>
            </div>
          )}

          {/* Business Credentials Footer */}
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#50007c] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Shivani Graphics (Shivani Digital Prints)</p>
                <p className="text-slate-600 text-xs">{STORE_ADDRESS}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
              <span>Helpline 1: +91-9810157695</span>
              <span>·</span>
              <span>Helpline 2: +91-9266944315</span>
              <span>·</span>
              <span>Email: {SUPPORT_EMAIL}</span>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleAskOnWhatsApp(activePolicy.toUpperCase())}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask Support on WhatsApp (+91-9810157695)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>

      </motion.div>
    </div>
  );
};
