import React, { useState } from 'react';
import { Star, Clock, ArrowRight, MessageCircle, Sliders, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductItem } from '../types';
import { CATEGORIES } from '../data/products';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';
import { ProductListSkeleton } from './SkeletonLoader';

interface ProductCatalogProps {
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  activeProduct: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  activeProduct,
  onSelectProduct
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (catId: string) => {
    setIsLoading(true);
    onSelectCategory(catId);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleConfigure = (product: ProductItem) => {
    onSelectProduct(product);
    const element = document.getElementById('product-configurator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickWhatsApp = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Hello Shivani Graphics! I am interested in ordering: *${product.title}*. Could you share standard package rates and turnaround for Delhi NCR?`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <section id="catalog-grid-section" className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#50007c] font-bold text-xs uppercase tracking-wider mb-1">
              <span>Printo-Inspired Commercial Catalog</span>
              <span>•</span>
              <span className="text-emerald-600">Zero-Form WhatsApp Checkout</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Digital Printing Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Select any item to open its live interactive configuration engine with instant paper stocks, finishes, and tiered bulk discounts.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> commercial products
          </div>
        </div>

        {/* Category Filter Chips / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#50007c] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid or Skeleton */}
        {isLoading ? (
          <ProductListSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const isCurrentActive = activeProduct.id === prod.id;
              return (
                <motion.div
                  key={prod.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => handleConfigure(prod)}
                  className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer ${
                    isCurrentActive
                      ? 'border-[#50007c] ring-2 ring-purple-100 shadow-xl'
                      : 'border-slate-200 hover:border-[#50007c]/40 hover:shadow-xl shadow-md'
                  }`}
                >
                  {/* Product Thumbnail */}
                  <div 
                    className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => handleConfigure(prod)}
                  >
                    <img
                      src={prod.images[0].url}
                      alt={prod.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {prod.badge && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-xs">
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium rounded-md">
                      {prod.categoryLabel}
                    </span>

                    {isCurrentActive && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Configuring</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Rating & Turnaround */}
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{prod.rating}</span>
                          <span className="text-slate-400 font-normal">({prod.reviewCount})</span>
                        </div>
                        <span className="text-emerald-700 font-semibold truncate max-w-[130px]">
                          {prod.dispatchTag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => handleConfigure(prod)}
                        className="text-sm font-bold text-slate-900 group-hover:text-[#50007c] cursor-pointer transition-colors line-clamp-1"
                      >
                        {prod.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prod.shortDescription}
                      </p>
                    </div>

                    {/* Pricing and Actions Footer */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-400">Starting from</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{prod.minPrice}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleConfigure(prod)}
                          className={`w-full py-2 px-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                            isCurrentActive
                              ? 'bg-[#50007c] text-white'
                              : 'bg-slate-100 hover:bg-purple-50 text-slate-800 hover:text-[#50007c]'
                          }`}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Customize</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickWhatsApp(prod)}
                          className="w-full py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          title="Inquire directly on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
