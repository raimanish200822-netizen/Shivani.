import React, { useState } from 'react';
import { ArrowLeft, Star, MessageCircle, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductItem } from '../types';
import { CATEGORIES } from '../data/products';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface CategoryPageProps {
  categoryId: string;
  products: ProductItem[];
  onSelectProduct: (p: ProductItem) => void;
  onSelectCategory: (catId: string) => void;
  onBackToHome: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  products,
  onSelectProduct,
  onSelectCategory,
  onBackToHome
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'name'>('popular');

  const currentCategory = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];

  let filtered = categoryId === 'all'
    ? products
    : products.filter(p => p.category === categoryId);

  if (sortBy === 'name') {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const handleQuickWhatsApp = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Shivani Graphics! I want to request a quotation for "${product.title}" in Delhi NCR. Could you share specifications and digital proof turnaround time?`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="py-6 sm:py-10 pb-28 sm:pb-20 bg-slate-50/70 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1"
        >
          <button 
            type="button" 
            onClick={onBackToHome} 
            className="hover:text-[#50007c] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home Catalog</span>
          </button>
          <span>/</span>
          <span className="font-extrabold text-slate-900">{currentCategory.label}</span>
        </motion.div>

        {/* Category Header Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-10 bg-gradient-to-r from-[#50007c] via-purple-900 to-[#350052] text-white rounded-3xl shadow-md space-y-2 relative overflow-hidden"
        >
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-extrabold tracking-wider uppercase text-orange-300">
              Commercial Printing Collection
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{currentCategory.label}</h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed pt-1">
              {currentCategory.description || 'High-definition digital and offset printing services in Delhi NCR & Pan-India with express turnaround.'}
            </p>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Sparkles className="w-64 h-64 text-white" />
          </div>
        </motion.div>

        {/* Category Filter Pills & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0 max-w-full">
            {CATEGORIES.map(cat => {
              const isSelected = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#50007c] text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-700">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
            >
              <option value="popular">Popularity / Rating</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Product Grid (Defensive CSS: min-w-0, zero clipping, break-words) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map(prod => (
            <motion.div
              key={prod.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => onSelectProduct(prod)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#50007c]/40 transition-all duration-300 group flex flex-col justify-between min-w-0"
            >
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={prod.images[0]?.url}
                  alt={prod.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {prod.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-md shadow-xs">
                    {prod.badge}
                  </span>
                )}
                {prod.featureBadge && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-md shadow-xs">
                    ⚡ {prod.featureBadge}
                  </span>
                )}
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-black/70 text-white text-[10px] font-semibold rounded-md backdrop-blur-xs">
                  {prod.categoryLabel}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 min-w-0">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between text-[11px] gap-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-400 font-normal">({prod.reviewCount})</span>
                    </div>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-sm truncate">
                      {prod.dispatchTag}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#50007c] transition-colors truncate">
                    {prod.title}
                  </h3>
                  {prod.subtitle && (
                    <p className="text-xs font-bold text-orange-700 line-clamp-1">
                      {prod.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Rate Model</span>
                    <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ⚡ Free Quote on WhatsApp
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="py-2 px-3 bg-[#50007c] hover:bg-[#400063] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Configure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleQuickWhatsApp(prod, e)}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-slate-500 font-bold">No products found in this category.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="px-4 py-2 bg-[#50007c] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Browse All Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
