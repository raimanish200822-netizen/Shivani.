import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle, Sparkles, FileText, Truck, Briefcase } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { generateQuickChatUrl } from '../utils/whatsapp';

export const FaqSection: React.FC = () => {
  const { faqs } = useAdmin();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'artwork' | 'ordering' | 'delivery' | 'corporate'>('all');

  const categories = [
    { id: 'all', label: 'All Queries' },
    { id: 'artwork', label: 'Artwork & Files' },
    { id: 'ordering', label: 'WhatsApp Ordering' },
    { id: 'delivery', label: 'Delhi NCR Delivery' },
    { id: 'corporate', label: 'GST & Corporate' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Commercial Printing Knowledgebase (Firestore Sync)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Everything you need to know about CDR/PDF artwork preparation, same-day delivery slots across Delhi NCR, and Direct-to-WhatsApp order fulfillment.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div className={`p-1.5 rounded-full flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-slate-400 font-medium text-xs">
              No FAQs available in this category.
            </div>
          )}
        </div>

        {/* Direct WhatsApp Prepress Help Card */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-extrabold text-sm sm:text-base text-white">
              Have an unusual size, urgent event, or unique material?
            </p>
            <p className="text-xs text-slate-300 max-w-lg">
              Our prepress managers are online right now. Send your draft file on WhatsApp for an immediate technical check and custom quote.
            </p>
          </div>

          <a
            href={generateQuickChatUrl('artwork')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat with Print Specialist</span>
          </a>
        </div>

      </div>
    </section>
  );
};
