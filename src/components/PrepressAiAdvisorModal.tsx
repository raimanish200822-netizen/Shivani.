import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, X, CheckCircle, Bot, User } from 'lucide-react';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

export const PrepressAiAdvisorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! 🙏 I am Shivani Graphics Prepress AI Advisor. Ask me anything about CMYK files, bleed margins, paper GSM, visiting card lamination, or store pickup at Mahavir Enclave!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "That's a great printing question! For exact pricing and instant digital proof, you can chat directly with our master press operator on WhatsApp (+91-9266944315).";
      
      const lower = userText.toLowerCase();
      if (lower.includes('cmyk') || lower.includes('bleed') || lower.includes('resolution') || lower.includes('cdr') || lower.includes('pdf')) {
        botReply = "For best print results, ensure your files are in CMYK color mode at 300 DPI resolution, with 3mm bleed margins on all sides. We accept CDR, PDF, AI, PSD, and high-res PNG/JPG.";
      } else if (lower.includes('time') || lower.includes('hour') || lower.includes('delivery') || lower.includes('pickup')) {
        botReply = "We offer 4-hour express delivery across Delhi NCR and walk-in counter pickup in Mahavir Enclave, Delhi in just 5 to 15 minutes!";
      } else if (lower.includes('gsm') || lower.includes('paper') || lower.includes('card')) {
        botReply = "We stock 80 GSM Bond, 130/170 GSM Glossy Art Paper, 300/350 GSM Heavy Art Board with Velvet Touch, and Matt/Gloss Thermal Lamination.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-24 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-purple-700 to-[#50007c] text-white font-black text-xs rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer border border-purple-400/30 group"
          title="Ask Prepress AI Advisor"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Ask Prepress AI 🤖</span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-[#50007c] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight">Shivani Prepress AI</h4>
                <p className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Instant Answers</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                  msg.sender === 'user' ? 'bg-[#50007c] text-white' : 'bg-purple-100 text-purple-900'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#50007c] text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] italic">
                <Bot className="w-3.5 h-3.5 animate-bounce" />
                <span>AI Prepress is typing...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about GSM, bleed, files..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] bg-slate-50"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#50007c] hover:bg-purple-900 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
