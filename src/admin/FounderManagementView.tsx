import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Building2, 
  Phone, 
  MessageCircle, 
  Sparkles,
  Save,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploader } from './ImageUploader';
import { 
  BUSINESS_TRADE_NAME, 
  BUSINESS_OWNER_FULL, 
  FOUNDER_PHONE_DISPLAY, 
  FOUNDER_WHATSAPP, 
  STORE_ADDRESS 
} from '../utils/whatsapp';

interface FounderManagementViewProps {
  onPreviewFounderPage?: () => void;
}

export const FounderManagementView: React.FC<FounderManagementViewProps> = ({ onPreviewFounderPage }) => {
  const { websiteContent, updateWebsiteContent } = useAdmin();

  const [form, setForm] = useState({
    founderName: websiteContent.founderName || BUSINESS_OWNER_FULL,
    founderRole: websiteContent.founderRole || 'Founder & Managing Director',
    founderPhone: websiteContent.founderPhone || FOUNDER_PHONE_DISPLAY,
    founderWhatsapp: websiteContent.founderWhatsapp || FOUNDER_WHATSAPP,
    founderImageUrl: websiteContent.founderImageUrl || localStorage.getItem('shivani_founder_photo') || '',
    companyImageUrl: websiteContent.companyImageUrl || localStorage.getItem('shivani_company_photo') || '',
    founderBio: websiteContent.founderBio || 'Ranjan Roy founded Shivani Graphics in 1996 with a singular pledge: to give every business, creator, and individual pristine commercial print quality with personal accountability.',
    founderQuote: websiteContent.founderQuote || 'To me, printing is never just paper and ink. It is someone\'s first business card, a startup\'s pitch deck, an author\'s book, or an enterprise\'s grand banner. Since 1996, that promise has never changed.'
  });

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateWebsiteContent({
        ...websiteContent,
        ...form
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update founder content:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetFounderPhoto = () => {
    setForm(prev => ({ ...prev, founderImageUrl: '' }));
  };

  const handleResetCompanyPhoto = () => {
    setForm(prev => ({ ...prev, companyImageUrl: '' }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-[#50007c]">
              <User className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Founder & Photo Management — {form.founderName}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload executive portrait photo of Founder <strong>Ranjan Roy</strong> and Shivani Graphics printing press / storefront facility. These will reflect immediately on the live website's Meet Our Founder page.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onPreviewFounderPage && (
            <button
              type="button"
              onClick={onPreviewFounderPage}
              className="px-3.5 py-2 rounded-xl bg-purple-50 text-[#50007c] hover:bg-purple-100 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-purple-200 shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5" />
              View Live Founder Page
            </button>
          )}

          {saved && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-xl flex items-center gap-1 shadow-2xs animate-pulse">
              <Check className="w-4 h-4" /> Live Saved & Synced!
            </span>
          )}
        </div>
      </div>

      {/* Info Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#50007c] flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Founder Name</p>
            <p className="text-xs font-bold text-slate-800">{form.founderName}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Second Calling Number</p>
            <p className="text-xs font-bold text-slate-800">{form.founderPhone}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Founder Direct WhatsApp</p>
            <p className="text-xs font-bold text-slate-800">+{form.founderWhatsapp}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 1. Photo Uploaders Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#50007c]" />
                Photo Upload Section (Gallery / File / URL)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select portrait of Founder Ranjan Roy and printing facility photo from your phone gallery or computer. Files are automatically compressed and saved securely.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
              Est. 1996
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box A: Founder Photo (Ranjan Roy) */}
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#50007c]" />
                    Founder Photo ({form.founderName})
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Portrait 4:5 ratio recommended
                  </span>
                </div>
                {form.founderImageUrl && (
                  <button
                    type="button"
                    onClick={handleResetFounderPhoto}
                    className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Photo Live Preview Frame */}
              <div className="w-full max-w-[220px] mx-auto aspect-4/5 rounded-xl overflow-hidden bg-gradient-to-br from-[#28003e] via-[#50007c] to-[#7915a8] flex flex-col items-center justify-center text-white border border-purple-300 shadow-sm relative group">
                {form.founderImageUrl ? (
                  <img
                    src={form.founderImageUrl}
                    alt={form.founderName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-4 text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                      <span className="text-2xl font-black text-amber-300">
                        {form.founderName[0] || 'R'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold">{form.founderName}</p>
                      <p className="text-[10px] text-purple-200">{form.founderRole}</p>
                    </div>
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
                      No photo uploaded yet
                    </span>
                  </div>
                )}
              </div>

              {/* Photo Uploader Component */}
              <ImageUploader
                value={form.founderImageUrl}
                onChange={(url) => setForm(prev => ({ ...prev, founderImageUrl: url }))}
                label="Founder Photo (Select from Gallery or Enter URL)"
                folder="founder"
              />
            </div>

            {/* Box B: Company / Store Photo */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#50007c]" />
                    Shivani Graphics Facility / Store Photo
                  </span>
                  <span className="text-[10px] text-slate-500">
                    16:9 widescreen recommended
                  </span>
                </div>
                {form.companyImageUrl && (
                  <button
                    type="button"
                    onClick={handleResetCompanyPhoto}
                    className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Company Photo Live Preview */}
              <div className="w-full aspect-16/9 rounded-xl overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-white border border-slate-300 shadow-sm relative group">
                {form.companyImageUrl ? (
                  <img
                    src={form.companyImageUrl}
                    alt="Shivani Graphics Facility"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-4 text-center space-y-1 max-w-xs">
                    <Building2 className="w-8 h-8 mx-auto text-purple-300" />
                    <p className="text-xs font-bold text-white">Shivani Graphics Press Floor</p>
                    <p className="text-[10px] text-slate-400">Mahavir Enclave, New Delhi</p>
                    <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full inline-block mt-1">
                      Facility photo slot
                    </span>
                  </div>
                )}
              </div>

              {/* Company Image Uploader */}
              <ImageUploader
                value={form.companyImageUrl}
                onChange={(url) => setForm(prev => ({ ...prev, companyImageUrl: url }))}
                label="Store / Press Facility Photo (Gallery or URL)"
                folder="facility"
              />
            </div>

          </div>
        </div>

        {/* 2. Founder Details & Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Founder Profile & Contact Line Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Founder Full Name
              </label>
              <input
                type="text"
                value={form.founderName}
                onChange={(e) => setForm({ ...form, founderName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                placeholder="Ranjan Roy"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Founder Title / Designation
              </label>
              <input
                type="text"
                value={form.founderRole}
                onChange={(e) => setForm({ ...form, founderRole: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                placeholder="Founder & Managing Director"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Founder Second Calling Phone Number
              </label>
              <input
                type="text"
                value={form.founderPhone}
                onChange={(e) => setForm({ ...form, founderPhone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                placeholder="+91-9810157695"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Second direct line of Founder Ranjan Roy (+91-9810157695)
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Founder Second WhatsApp Number (with Country Code)
              </label>
              <input
                type="text"
                value={form.founderWhatsapp}
                onChange={(e) => setForm({ ...form, founderWhatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                placeholder="919810157695"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Direct WhatsApp link number for Founder page button
              </span>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Founder Message / Quote to Customers
            </label>
            <textarea
              rows={3}
              value={form.founderQuote}
              onChange={(e) => setForm({ ...form, founderQuote: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#50007c]"
              placeholder="To me, printing is never just paper and ink..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Founder Bio & 1996 Founding Story
            </label>
            <textarea
              rows={3}
              value={form.founderBio}
              onChange={(e) => setForm({ ...form, founderBio: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#50007c]"
              placeholder="Ranjan Roy founded Shivani Graphics in 1996..."
            />
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#50007c] hover:bg-[#6800a1] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving to Database...' : 'Save & Publish Live to Website'}
              </button>

              {saved && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Successfully saved to Firebase Firestore & Live Site!
                </span>
              )}
            </div>

            <a
              href={`https://wa.me/${form.founderWhatsapp}?text=${encodeURIComponent('Test message to Founder Ranjan Roy')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              Test Founder WhatsApp ({form.founderPhone})
            </a>
          </div>

        </div>

      </form>
    </div>
  );
};
