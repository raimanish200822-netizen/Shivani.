import React, { useState } from 'react';
import { Image, Trash2, Upload, Check, Sparkles, RefreshCw } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploader } from './ImageUploader';

export const LogoSettingsView: React.FC = () => {
  const { siteLogo, updateSiteLogo, deleteSiteLogo } = useAdmin();
  const [logoInput, setLogoInput] = useState(siteLogo);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoInput.trim()) return;
    await updateSiteLogo(logoInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleResetDefault = async () => {
    if (confirm('Are you sure you want to reset logo to the permanent Shivani Graphics branding logo?')) {
      await deleteSiteLogo();
      setLogoInput('https://img.sanishtech.com/u/5467f9a9329e92601bbe9217b2523cff.jpg');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 to-[#50007c] p-6 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-black tracking-tight">Logo & Branding Management</h2>
          </div>
          <p className="text-xs text-purple-200">
            Change, update, or delete the official Shivani Graphics logo across the entire website, mobile drawer, footer, and invoices instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center overflow-hidden border-2 border-orange-400">
            <img src={siteLogo} alt="Current Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-slate-900">Current Logo Preview & Settings</h3>
          <p className="text-xs text-slate-500">Your logo is securely stored in real-time Firestore database (`settings/branding`).</p>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Logo successfully updated and synced across the website!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Logo Image URL or Direct Upload
            </label>
            <ImageUploader
              value={logoInput}
              onChange={async (url) => {
                setLogoInput(url);
                await updateSiteLogo(url);
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2500);
              }}
              label="Shivani Graphics Logo (Upload or Paste URL)"
              folder="branding"
            />
            <p className="text-[11px] text-slate-400">
              Recommended: Permanent image URL (e.g. SanishTech CDN link `https://img.sanishtech.com/u/5467f9a9329e92601bbe9217b2523cff.jpg`).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" /> Save & Update Logo Across Website
            </button>

            <button
              type="button"
              onClick={handleResetDefault}
              className="w-full sm:w-auto px-5 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-200"
            >
              <Trash2 className="w-4 h-4" /> Delete / Reset to Default Logo
            </button>
          </div>
        </form>

        <div className="mt-8 p-5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-3">
          <h4 className="text-xs font-black text-[#50007c] flex items-center gap-1.5">
            <span>ℹ️ Where does this logo appear?</span>
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-medium">
            <li>Website Navigation Header (Desktop & Mobile)</li>
            <li>Website Footer Brand Section</li>
            <li>Mobile Navigation Drawer</li>
            <li>Admin Panel Sidebar & Header</li>
            <li>Customer Order Tracking Page Header</li>
            <li>Print Invoices and Estimates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
