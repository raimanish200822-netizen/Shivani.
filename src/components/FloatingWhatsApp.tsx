import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Clock, Sparkles, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const quickPrompts = [
    { label: '⚡ Urgent Same-Day Print', text: 'Hello Shivani Graphics! I need urgent same-day printing in Delhi NCR.' },
    { label: '🏢 Bulk Corporate Ratecard', text: 'Hello Shivani Graphics! Could you share bulk corporate pricing and GST terms?' },
    { label: '🎨 Free File Check (CDR/PDF)', text: 'Hello Shivani Graphics! I have a CDR/PDF file ready and would like a print proof check.' },
    { label: '📍 Store Pickup Query', text: 'Hello Shivani Graphics! Can I collect my order directly from your Delhi NCR store?' }
  ];

  // Trigger "Support Agent is typing..." briefly whenever chat is opened
  useEffect(() => {
    if (isOpen) {
      setIsAgentTyping(true);
      const timer = setTimeout(() => {
        setIsAgentTyping(false);
      }, 1400); // 1.4s typing simulation for live human support feel
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || userMessage || 'Hello Shivani Graphics! I would like to inquire about printing services.';
    
    // Show typing state briefly before dispatching to WhatsApp
    setIsAgentTyping(true);
    setTimeout(() => {
      const url = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(textToSend)}`;
      window.open(url, '_blank');
      setUserMessage('');
      setIsAgentTyping(false);
      setIsOpen(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen ? (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/50 transition-colors flex items-center justify-center ring-4 ring-emerald-400/30 cursor-pointer"
            aria-label="Open Shivani Graphics WhatsApp Support"
          >
            {/* Soft Continuous Pulse Ripple */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-60 animate-ping pointer-events-none" />
            <span className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />
            
            <MessageCircle className="w-6 h-6 fill-white relative z-10" />

            {/* Glowing Online Badge */}
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs border-2 border-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Online</span>
            </span>
          </motion.button>
        ) : null}
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
          >
             {/* Header with Live Agent Status */}
            <div className="p-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-white/30 flex items-center justify-center shrink-0">
                    <img src="https://img.sanishtech.com/u/65c843b363e7b4f65c6efab5a16570b4.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-700 rounded-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                    <span>Shivani Graphics Support</span>
                    <span className="px-1.5 py-0.2 bg-emerald-500/80 text-[9px] font-black rounded-sm uppercase tracking-wider">
                      Live
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                    {isAgentTyping ? (
                      <span className="flex items-center gap-1 text-emerald-200 font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                        <span>Support agent is typing...</span>
                      </span>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span>Replies within 2 mins · Delhi NCR Studio</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 flex-1 overflow-y-auto space-y-3 text-xs">
              
              {/* Agent Welcome Message */}
              <div className="flex items-start gap-2 max-w-[88%]">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-xs shrink-0 flex items-center justify-center border border-emerald-200">
                  <img src="https://img.sanishtech.com/u/65c843b363e7b4f65c6efab5a16570b4.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200/80 space-y-1">
                  <p className="font-semibold text-slate-800 leading-relaxed">
                    Namaste! 🙏 Welcome to <strong className="text-slate-900">Shivani Graphics (Shivani Digital Prints)</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    How can our prepress & printing team assist you today? Looking for urgent counter pickup in Mahavir Enclave or a custom corporate quote?
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Just now</span>
                    <CheckCheck className="w-3 h-3 text-blue-500 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Dynamic 'Support Agent is typing...' component */}
              <AnimatePresence>
                {isAgentTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-xs shrink-0 flex items-center justify-center border border-emerald-200">
                      <img src="https://img.sanishtech.com/u/65c843b363e7b4f65c6efab5a16570b4.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200/80 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Support Agent is typing
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Prompt Bubbles */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  Tap for quick inquiry:
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt.text)}
                      className="text-left px-3 py-2 bg-white hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100 border border-slate-200 rounded-xl font-medium text-slate-700 hover:text-emerald-900 transition-colors shadow-2xs flex items-center justify-between group cursor-pointer"
                    >
                      <span>{prompt.label}</span>
                      <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Input & Direct Redirect Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your print query..."
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Trust disclaimer */}
            <div className="px-3 py-1.5 bg-slate-100 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Official WhatsApp: +91-9810157695 · Mahavir Enclave, New Delhi</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
