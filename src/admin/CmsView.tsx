import React, { useState } from 'react';
import { Layout, Save, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploader } from './ImageUploader';

export const CmsView: React.FC = () => {
  const { websiteContent, updateWebsiteContent } = useAdmin();
  const [form, setForm] = useState({
    ...websiteContent,
    aboutTitle: websiteContent.aboutTitle || 'About Shivani Graphics - Delhi NCRs Premier Commercial Printing Press',
    aboutDescription: websiteContent.aboutDescription || 'Established with a commitment to lightning-fast printing, superior 350 GSM card stock, and state-of-the-art Konica Minolta digital printing press in Mahavir Enclave, Delhi.',
    aboutMission: websiteContent.aboutMission || 'To provide 5-minute visiting cards, bulk flex banners, and 3D acrylic LED boards with unmatched precision and wholesale pricing.',
    aboutVision: websiteContent.aboutVision || 'To be India\'s most trusted digital print & signage partner for small businesses, agencies, and retail brands.',
    aboutStory: websiteContent.aboutStory || 'Founded in Mahavir Enclave, New Delhi, Shivani Graphics started as a boutique digital print desk and grew into a full-fledged high-speed production printing house.'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">Website Content, CMS & About Us Database Editor</h2>
          <p className="text-xs text-slate-500">Edit homepage headings, About Us narrative, mission, vision, and contact details stored in Firebase.</p>
        </div>
        {saved && (
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-xl flex items-center gap-1 shadow-xs animate-bounce">
            <Check className="w-4 h-4" /> Published Live!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5 text-xs">
        
        {/* About Us Management Section */}
        <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
          <h3 className="font-black text-sm text-[#50007c] flex items-center gap-2">
            <span>🏢 About Us Management (Synced with About Us Page)</span>
          </h3>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Us Main Heading Title</label>
            <input
              type="text"
              value={form.aboutTitle || ''}
              onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Us Company Story & Overview</label>
            <textarea
              rows={3}
              value={form.aboutDescription || ''}
              onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Mission & Quality Promise</label>
              <textarea
                rows={2}
                value={form.aboutMission || ''}
                onChange={(e) => setForm({ ...form, aboutMission: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Vision Statement</label>
              <textarea
                rows={2}
                value={form.aboutVision || ''}
                onChange={(e) => setForm({ ...form, aboutVision: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Company Founding Story & Milestones</label>
            <textarea
              rows={2}
              value={form.aboutStory || ''}
              onChange={(e) => setForm({ ...form, aboutStory: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
            />
          </div>

          <div>
            <ImageUploader
              value={form.aboutImageUrl || ''}
              onChange={(url) => setForm({ ...form, aboutImageUrl: url })}
              label="About Us Facility / Workshop Image (Upload or Paste URL)"
              folder="about"
            />
          </div>
        </div>

        <div className="pt-2 space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Business Name</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Section Heading</label>
            <input
              type="text"
              value={form.heroHeading}
              onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Section Description / Subtitle</label>
            <textarea
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="font-black text-sm text-[#50007c]">SEO & Search Engine Meta Tags Management</h3>
          <div>
            <label className="font-bold text-slate-700 block mb-1">SEO Page Title (Browser Tab Title)</label>
            <input
              type="text"
              value={form.seoTitle || ''}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="e.g. Shivani Graphics · Custom Print & Signage | Delhi NCR"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meta Description (Google Search Snippet)</label>
            <textarea
              rows={2}
              value={form.seoDescription || ''}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="Brief summary for Google search results..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meta Keywords (Comma separated)</label>
            <input
              type="text"
              value={form.seoKeywords || ''}
              onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
              placeholder="printing press, visiting cards, flex banners, delhi ncr"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (e.g. 919266944315)</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Support Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Store Address (Mahavir Enclave, Delhi NCR)</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save & Publish Live Website
          </button>
        </div>
      </form>
    </div>
  );
};
