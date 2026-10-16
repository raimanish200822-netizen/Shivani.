import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Rocket, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  Lock, 
  Send, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import { CachedImage } from '../services/imageService';
import { 
  WHATSAPP_PRIMARY, 
  PHONE_PRIMARY, 
  STORE_ADDRESS, 
  GOOGLE_MAPS_URL, 
  BUSINESS_TRADE_NAME 
} from '../utils/whatsapp';
import { db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LaunchCountdownPageProps {
  onOpenAdminLogin: () => void;
  onEnterStore?: () => void;
}

export const LaunchCountdownPage: React.FC<LaunchCountdownPageProps> = ({ 
  onOpenAdminLogin,
  onEnterStore 
}) => {
  const { launchCountdown, siteLogo } = useAdmin();

  // Time remaining state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  // Lead capture state
  const [subscriberInput, setSubscriberInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(launchCountdown.targetDate).getTime();
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
  }, [launchCountdown.targetDate]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberInput.trim()) return;
    setSubmitting(true);
    try {
      const leadId = `lead-${Date.now()}`;
      await setDoc(doc(db, 'launch_subscribers', leadId), {
        id: leadId,
        contact: subscriberInput.trim(),
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
      setSubscribed(true);
      setSubscriberInput('');
    } catch {
      // Local fallback
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppInquiry = () => {
    const msg = encodeURIComponent(
      `Hello Shivani Graphics! 👋 I saw your website launch countdown and would like to inquire about printing services / order urgently before launch.`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#2a0044] to-[#50007c] text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 px-4 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white p-1 overflow-hidden shadow-lg border border-white/30 shrink-0">
            <CachedImage src={siteLogo} fallbackSrc="/logo.jpg" alt={BUSINESS_TRADE_NAME} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
              <span>{BUSINESS_TRADE_NAME}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Store Counter Open
              </span>
            </h1>
            <p className="text-[11px] text-purple-200 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Mahavir Enclave, New Delhi · Commercial Digital Press</span>
            </p>
          </div>
        </div>

        {/* Secret / Discreet Admin Access */}
        <button
          type="button"
          onClick={onOpenAdminLogin}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-purple-200 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          title="Master Admin Portal Access"
        >
          <Lock className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Admin Login</span>
        </button>
      </header>

      {/* Main Countdown Hero Body */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16 text-center max-w-4xl mx-auto space-y-8">
        
        {/* Launch Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/30 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black shadow-lg uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{launchCountdown.badgeText || 'Official Grand Opening Countdown'}</span>
        </motion.div>

        {/* Main Headline & Description */}
        <div className="space-y-4 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white drop-shadow-md"
          >
            {launchCountdown.title}
          </motion.h2>

          <p className="text-sm sm:text-base text-purple-200 font-medium leading-relaxed">
            {launchCountdown.subtitle}
          </p>
        </div>

        {/* Live Animated Countdown Timer */}
        {timeLeft.isExpired ? (
          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-emerald-400/40 text-center space-y-4 shadow-2xl">
            <span className="text-4xl sm:text-6xl">🎉</span>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-300">
              WE ARE OFFICIALLY LIVE!
            </h3>
            <p className="text-sm text-purple-200 font-medium">
              Welcome to Shivani Graphics Digital Printing Studio. Explore full catalog pricing and order online.
            </p>
            {onEnterStore && (
              <button
                type="button"
                onClick={onEnterStore}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>Enter Public Webstore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-2xl">
            
            {/* Days */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-white/15 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-400/50 transition-colors">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white">
                {timeLeft.days.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest mt-1">
                Days
              </span>
              <span className="absolute bottom-0 inset-x-0 h-1 bg-purple-500/40" />
            </div>

            {/* Hours */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-white/15 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-400/50 transition-colors">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest mt-1">
                Hours
              </span>
              <span className="absolute bottom-0 inset-x-0 h-1 bg-purple-500/40" />
            </div>

            {/* Minutes */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-white/15 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-400/50 transition-colors">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest mt-1">
                Minutes
              </span>
              <span className="absolute bottom-0 inset-x-0 h-1 bg-purple-500/40" />
            </div>

            {/* Seconds */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-amber-400/30 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-amber-400 transition-colors">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-amber-300 animate-pulse">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-amber-200 uppercase tracking-widest mt-1">
                Seconds
              </span>
              <span className="absolute bottom-0 inset-x-0 h-1 bg-amber-400" />
            </div>

          </div>
        )}

        {/* Action Buttons: WhatsApp & Call while waiting */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg pt-2">
          {launchCountdown.showWhatsAppButton && (
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full sm:w-auto flex-1 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-900/40 transition-all cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
              <span>Urgent Order on WhatsApp (10% Off)</span>
            </button>
          )}

          {launchCountdown.showPhoneCall && (
            <a
              href={`tel:+${PHONE_PRIMARY}`}
              className="w-full sm:w-auto px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: +91-9266944315</span>
            </a>
          )}
        </div>

        {/* Pre-launch Lead Capture */}
        <div className="w-full max-w-md pt-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Get notified the minute we open + ₹100 welcome credit</span>
            </div>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>You're on the priority VIP launch list! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="text"
                  value={subscriberInput}
                  onChange={(e) => setSubscriberInput(e.target.value)}
                  placeholder="Enter WhatsApp number or email"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {submitting ? '...' : 'Notify Me'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Store Counter Physical Location */}
        {launchCountdown.showStoreAddress && (
          <div className="pt-2 text-xs text-purple-200/90 flex flex-col items-center gap-1 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Physical Store Counter is OPEN for walk-in orders:</span>
            </span>
            <span className="text-white font-bold">{STORE_ADDRESS}</span>
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline text-[11px] font-bold mt-0.5 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-20 px-4 py-4 text-center border-t border-white/10 text-xs text-purple-300/80 font-medium">
        <p>© {new Date().getFullYear()} {BUSINESS_TRADE_NAME} · India's Premier Commercial Digital Printing Studio.</p>
      </footer>

    </div>
  );
};
