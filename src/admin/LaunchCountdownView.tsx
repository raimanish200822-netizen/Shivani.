import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Rocket, 
  Check, 
  Calendar, 
  MessageCircle, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Save, 
  Sparkles, 
  Power, 
  ExternalLink,
  Eye,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { useAdmin, LaunchCountdownSettings } from '../context/AdminContext';
import { STORE_ADDRESS, PHONE_PRIMARY, WHATSAPP_PRIMARY } from '../utils/whatsapp';

export const LaunchCountdownView: React.FC = () => {
  const { launchCountdown, updateLaunchCountdown, toggleLaunchCountdown } = useAdmin();

  const [form, setForm] = useState<LaunchCountdownSettings>(launchCountdown);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if external changes happen
  useEffect(() => {
    setForm(launchCountdown);
  }, [launchCountdown]);

  // Live countdown calculation for admin preview
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(form.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [form.targetDate]);

  // Format date helper for datetime-local input
  const getFormattedDateTimeLocal = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toISOString().slice(0, 16);
      }
      // Return YYYY-MM-DDTHH:mm
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    } catch {
      return new Date().toISOString().slice(0, 16);
    }
  };

  const handleApplyPreset = (daysToAdd: number) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    futureDate.setHours(10, 0, 0, 0); // 10:00 AM launch
    setForm(prev => ({
      ...prev,
      targetDate: futureDate.toISOString()
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateLaunchCountdown(form);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      alert(`Error saving launch countdown: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInstantToggle = async () => {
    const nextState = !form.enabled;
    setForm(prev => ({ ...prev, enabled: nextState }));
    setIsSaving(true);
    try {
      await toggleLaunchCountdown(nextState);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      alert(`Error toggling launch countdown: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-[#50007c] to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Rocket className="w-80 h-80 -mr-16" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Rocket className="w-3.5 h-3.5" />
              Website Launch Mode
            </span>
            <span className={`px-2.5 py-1 text-xs font-black rounded-full border ${form.enabled ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/40' : 'bg-white/10 text-slate-300 border-white/20'}`}>
              {form.enabled ? '● ACTIVE: Countdown Page is Live for Public' : '○ INACTIVE: Public Website is Normal Live'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Grand Website Launch Countdown
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl font-medium leading-relaxed">
            Enable a high-converting Launch Countdown Screen for public visitors until your scheduled launch date. Customers can still order directly via WhatsApp or phone while the countdown ticks.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-xs animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>✓ Launch Countdown settings successfully saved and synced to real-time database!</span>
        </div>
      )}

      {/* Main Control Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Master ON/OFF Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Power className={`w-5 h-5 ${form.enabled ? 'text-emerald-600' : 'text-slate-400'}`} />
              <h3 className="font-black text-sm text-slate-900">
                Launch Countdown Mode Status
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              When enabled, visitors will see the countdown timer page with your launch date, WhatsApp urgent ordering, and store address.
            </p>
          </div>

          <button
            type="button"
            onClick={handleInstantToggle}
            disabled={isSaving}
            className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 shrink-0 ${
              form.enabled 
                ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{form.enabled ? 'Turn OFF Countdown (Make Store Live)' : 'Turn ON Launch Countdown'}</span>
          </button>
        </div>

        {/* Live Admin Countdown Preview Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950 text-white border border-purple-900 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                Live Countdown Preview
              </h4>
            </div>
            <span className="text-[11px] text-purple-300 font-bold">
              Target: {new Date(form.targetDate).toLocaleString()}
            </span>
          </div>

          {timeLeft.isExpired ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center space-y-1">
              <p className="text-sm font-black text-emerald-300">🎉 COUNTDOWN COMPLETE!</p>
              <p className="text-xs text-emerald-200">The scheduled launch date has arrived. Public visitors will be prompted to enter the live store.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="block text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 uppercase tracking-wider mt-1 block">Days</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="block text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 uppercase tracking-wider mt-1 block">Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="block text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 uppercase tracking-wider mt-1 block">Minutes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="block text-2xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight animate-pulse">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 uppercase tracking-wider mt-1 block">Seconds</span>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          
          {/* Target Launch Date & Presets */}
          <div className="space-y-3">
            <label className="font-black text-slate-800 text-xs block uppercase tracking-wider">
              1. Scheduled Launch Date & Time
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <input
                  type="datetime-local"
                  value={getFormattedDateTimeLocal(form.targetDate)}
                  onChange={(e) => {
                    const selected = new Date(e.target.value);
                    if (!isNaN(selected.getTime())) {
                      setForm(prev => ({ ...prev, targetDate: selected.toISOString() }));
                    }
                  }}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-[#50007c]"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 mr-1">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(1)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  +1 Day
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(3)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  +3 Days
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(7)}
                  className="px-2.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold rounded-lg cursor-pointer"
                >
                  +7 Days (1 Wk)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(14)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  +14 Days
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(30)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  +30 Days (1 Mo)
                </button>
              </div>
            </div>
          </div>

          {/* Headline & Announcement Text */}
          <div className="grid grid-cols-1 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Badge / Tagline (e.g. Official Grand Opening Countdown)
              </label>
              <input
                type="text"
                value={form.badgeText}
                onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Main Launch Headline
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-black text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Announcement Message / Subtitle
              </label>
              <textarea
                rows={3}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
          </div>

          {/* Action Buttons & Features on Countdown Screen */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="font-black text-slate-800 text-xs block uppercase tracking-wider">
              2. Interactive Features on Countdown Page
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={form.showWhatsAppButton}
                  onChange={(e) => setForm({ ...form, showWhatsAppButton: e.target.checked })}
                  className="rounded text-[#50007c] focus:ring-[#50007c] w-4 h-4"
                />
                <span className="font-bold text-slate-800 text-xs">Urgent WhatsApp Order Button</span>
              </label>

              <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={form.showPhoneCall}
                  onChange={(e) => setForm({ ...form, showPhoneCall: e.target.checked })}
                  className="rounded text-[#50007c] focus:ring-[#50007c] w-4 h-4"
                />
                <span className="font-bold text-slate-800 text-xs">Phone Call Helpline</span>
              </label>

              <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={form.showStoreAddress}
                  onChange={(e) => setForm({ ...form, showStoreAddress: e.target.checked })}
                  className="rounded text-[#50007c] focus:ring-[#50007c] w-4 h-4"
                />
                <span className="font-bold text-slate-800 text-xs">Mahavir Enclave Store Address</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium">
              💡 As an Admin, you will always have access to the Admin Portal via the top-right login link.
            </p>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-3 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Settings...' : 'Save Launch Settings'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
