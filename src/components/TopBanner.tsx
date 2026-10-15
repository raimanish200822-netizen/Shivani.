import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Phone, MapPin, Printer, ShieldCheck } from 'lucide-react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

export const TopBanner: React.FC = () => {
  const tickerItems = [
    { 
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />, 
      text: "Shivani Graphics (Shivani Digital Prints) — Delhi NCR's Premier Digital & Commercial Printing Studio" 
    },
    { 
      icon: <Printer className="w-3.5 h-3.5 text-orange-300 shrink-0" />, 
      text: "⚡ 5-Minute Express Visiting Cards, Banners, Mugs, T-Shirts & Stamps" 
    },
    { 
      icon: <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />, 
      text: "💬 Order & Support via WhatsApp: +91-9266944315 / +91-9810157695" 
    },
    { 
      icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />, 
      text: "⚡ Instant Track Your Order, Same-Day Delivery & Mahavir Enclave Store Pickup" 
    },
  ];

  return (
    <aside 
      aria-label="Running Announcement Ticker" 
      className="bg-[#50007c] text-white text-[11px] sm:text-xs font-semibold py-1.5 overflow-hidden border-b border-purple-800/80 shadow-xs select-none relative"
    >
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 28, repeat: Infinity }}
          className="flex shrink-0 items-center gap-8 whitespace-nowrap will-change-transform py-0.5"
        >
          {/* First loop */}
          {tickerItems.map((item, idx) => (
            <div key={`ticker-a-${idx}`} className="flex items-center gap-2">
              {item.icon}
              <span className="tracking-wide text-white/95">{item.text}</span>
              <span className="text-purple-300/60 ml-6">✦</span>
            </div>
          ))}
          {/* Second duplicate loop for seamless continuous scrolling */}
          {tickerItems.map((item, idx) => (
            <div key={`ticker-b-${idx}`} className="flex items-center gap-2">
              {item.icon}
              <span className="tracking-wide text-white/95">{item.text}</span>
              <span className="text-purple-300/60 ml-6">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </aside>
  );
};
