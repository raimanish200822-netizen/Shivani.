import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Clock, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  FileCheck, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ShoppingBag, 
  Mail, 
  CheckCircle2, 
  Plus,
  Minus,
  Hash
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProductItem, CartItem } from '../types';
import { generateWhatsAppOrderUrl, generateEmailOrderUrl, WHATSAPP_PRIMARY } from '../utils/whatsapp';
import { StickyWhatsAppButton } from './StickyWhatsAppButton';

interface ProductConfiguratorProps {
  product: ProductItem;
  onAddToCart: (item: CartItem) => void;
  onOpenArtworkGuide: () => void;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  onAddToCart,
  onOpenArtworkGuide
}) => {
  // Default specs from product config
  const defaultSize = product.config.sizes[0]?.name || 'Standard';
  const defaultMaterial = product.config.materials[0]?.name || 'Standard Quality';
  const defaultFinish = product.config.finishes[0]?.name || 'Standard Finish';
  const defaultSide = product.config.sides[0]?.name || 'Single / Both Side';

  // Quantity State: Standard Preset or Custom Quantity
  const defaultPreset = product.config.quantities.find(q => q.popular)?.qty || product.config.quantities[0]?.qty || 100;
  const [selectedQty, setSelectedQty] = useState<number>(defaultPreset);
  const [isCustomQty, setIsCustomQty] = useState<boolean>(false);
  const [customQtyInput, setCustomQtyInput] = useState<string>(String(defaultPreset));

  const [hasArtwork, setHasArtwork] = useState(true);
  const [customNotes, setCustomNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    const initialPreset = product.config.quantities.find(q => q.popular)?.qty || product.config.quantities[0]?.qty || 100;
    setSelectedQty(initialPreset);
    setIsCustomQty(false);
    setCustomQtyInput(String(initialPreset));
    setCustomNotes('');
  }, [product.id]);

  // Handle Preset Qty Click
  const handleSelectPreset = (qty: number) => {
    setIsCustomQty(false);
    setSelectedQty(qty);
    setCustomQtyInput(String(qty));
  };

  // Handle Custom Qty Direct Typing
  const handleCustomQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomQtyInput(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedQty(num);
    }
  };

  // Handle Stepper (+ / -)
  const handleStep = (delta: number) => {
    setIsCustomQty(true);
    const current = selectedQty || 100;
    const next = Math.max(10, current + delta);
    setSelectedQty(next);
    setCustomQtyInput(String(next));
  };

  // Quick increment chips (+50, +100, +500)
  const handleAddQuick = (add: number) => {
    setIsCustomQty(true);
    const current = selectedQty || 100;
    const next = current + add;
    setSelectedQty(next);
    setCustomQtyInput(String(next));
  };

  // Handle direct WhatsApp quote dispatch
  const handleDirectWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl({
      productTitle: product.title,
      size: defaultSize,
      material: defaultMaterial,
      finish: defaultFinish,
      sides: defaultSide,
      quantity: selectedQty,
      hasArtwork,
      notes: customNotes,
      customerName,
      customerCity
    });
    window.open(url, '_blank');
  };

  // Handle direct Email quote dispatch
  const handleDirectEmailOrder = () => {
    const url = generateEmailOrderUrl({
      productTitle: product.title,
      size: defaultSize,
      material: defaultMaterial,
      finish: defaultFinish,
      sides: defaultSide,
      quantity: selectedQty,
      hasArtwork,
      notes: customNotes,
      customerName,
      customerCity
    });
    window.location.href = url;
  };

  // Add to Multi-Item Inquiry Bag
  const handleAddToInquiryBag = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      config: {
        sizeId: product.config.sizes[0]?.id || 'std',
        materialId: product.config.materials[0]?.id || 'std',
        finishId: product.config.finishes[0]?.id || 'std',
        sideId: product.config.sides[0]?.id || 'std',
        quantity: selectedQty,
        customNotes,
        hasArtwork
      },
      sizeLabel: defaultSize,
      materialLabel: defaultMaterial,
      finishLabel: defaultFinish,
      sideLabel: defaultSide,
      imageUrl: product.images[0]?.url || ''
    };

    onAddToCart(cartItem);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 3000);
  };

  return (
    <div id="product-configurator-section" className="space-y-6 max-w-full overflow-hidden">
      
      {/* Product Title & Brand Badge Header */}
      <div className="space-y-2 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">
              {product.badge}
            </span>
          )}
          {product.featureBadge && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-2xs">
              ⚡ {product.featureBadge}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-[#50007c]">
            {product.categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>{product.dispatchTag}</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight break-words">
          {product.title}
        </h1>

        {product.subtitle && (
          <p className="text-sm sm:text-base font-bold text-[#50007c] bg-purple-50/80 px-3 py-1.5 rounded-xl border border-purple-200/80 inline-block">
            ⚡ {product.subtitle}
          </p>
        )}

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {product.shortDescription}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-slate-800">{product.rating}</span>
          <span>·</span>
          <span className="text-slate-500">({product.reviewCount} customer reviews)</span>
        </div>
      </div>

      {/* WhatsApp Custom Specifications & Requirements Box */}
      <div className="space-y-5">
        <div className="p-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 border border-emerald-200/90 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">Custom Size, Paper Quality & Quantity on WhatsApp</h3>
              <p className="text-xs text-slate-600">Tell us your exact dimensions, paper GSM, finish and quantity directly on WhatsApp for instant pricing & digital proof.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-black text-slate-800 mb-1">
                Your Custom Size / Dimensions / Paper Requirements:
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Size 10x12 inches, 300 GSM Art Card, Matt Lamination, or any specific details..."
                rows={3}
                className="w-full p-3 rounded-xl border border-emerald-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Delivery Location</label>
                <input
                  type="text"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="e.g. Delhi NCR / Gurgaon"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Selection with Custom Quantity Input */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="block font-black text-slate-900 text-xs sm:text-sm">
              Quantity (Select Preset or Enter Custom Count):
            </span>
            <span className="text-xs font-bold text-[#50007c] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Selected: {selectedQty.toLocaleString()} units
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {product.config.quantities.slice(0, 5).map((q) => {
              const isSelected = selectedQty === q.qty && !isCustomQty;
              return (
                <button
                  key={q.qty}
                  type="button"
                  onClick={() => handleSelectPreset(q.qty)}
                  className={`py-2 px-2.5 rounded-xl text-center text-xs font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-purple-50 border-[#50007c] text-[#50007c] ring-2 ring-[#50007c]/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-black">{q.qty.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-normal">pcs</span>
                </button>
              );
            })}
          </div>

          {/* Custom Quantity Stepper & Direct Typing Input */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#50007c]" />
                <span>Custom Quantity (Enter any required count):</span>
              </label>
              {isCustomQty && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Custom Count Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(-50)}
                disabled={selectedQty <= 10}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer disabled:opacity-40"
                title="Decrease 50"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={customQtyInput}
                  onChange={handleCustomQtyChange}
                  onFocus={() => setIsCustomQty(true)}
                  placeholder="Type any quantity (e.g. 150, 750, 3500)"
                  className="w-full h-10 px-3 text-center text-sm font-black text-slate-900 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-[#50007c] bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                  pcs
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleStep(50)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer"
                title="Increase 50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick add buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-bold mr-1">Quick Add:</span>
              {[50, 100, 250, 500, 1000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleAddQuick(val)}
                  className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-[#50007c] text-[11px] font-bold border border-purple-200 cursor-pointer"
                >
                  +{val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artwork Readiness */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="block font-bold text-slate-900 text-xs">
            Artwork & Prepress Status:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setHasArtwork(true)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                hasArtwork
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>I have print-ready PDF / CDR file</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setHasArtwork(false)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                !hasArtwork
                  ? 'bg-purple-50 border-[#50007c] text-purple-950 font-bold ring-2 ring-[#50007c]/20'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#50007c] shrink-0" />
                <span>I need Shivani Design Support</span>
              </div>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Free digital PDF proof shared on WhatsApp before printing.</span>
            <button
              type="button"
              onClick={onOpenArtworkGuide}
              className="text-[#50007c] font-bold hover:underline cursor-pointer"
            >
              View Artwork Guide →
            </button>
          </div>
        </div>

      </div>

      {/* Summary Box & Primary Inquiry CTAs */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#3b005c] text-white space-y-4 shadow-xl border border-slate-800">
        
        {/* Selected Config Summary */}
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Quotation Summary:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Instant Wholesale Rate on WhatsApp</span>
            </span>
          </div>

          <div className="text-xs text-purple-100 space-y-1">
            <p><strong className="text-white">Product:</strong> {product.title}</p>
            <p><strong className="text-white">Quantity:</strong> {selectedQty.toLocaleString()} units {isCustomQty ? '(Custom Count)' : ''}</p>
            <p><strong className="text-white">Artwork:</strong> {hasArtwork ? 'Print-ready file available' : 'Design Support Needed'}</p>
            {customNotes && (
              <p><strong className="text-white">Custom Notes:</strong> {customNotes}</p>
            )}
          </div>
        </div>

        {/* Notice if added to inquiry list */}
        {showAddedNotice && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-emerald-600/90 text-white rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Added to Multi-Item Inquiry Bag! Click the bag icon in the top header to review all items.</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleDirectWhatsAppOrder}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer ring-2 ring-emerald-400/40"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>Get Free Quote on WhatsApp (+91-9266944315)</span>
          </motion.button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToInquiryBag}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Add to Inquiry Bag</span>
            </button>

            <button
              type="button"
              onClick={handleDirectEmailOrder}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Submit Inquiry via Email</span>
            </button>
          </div>
        </div>

        {/* Guarantees Strip */}
        <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Free Reprint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>4-Hr Delhi NCR Delivery</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <FileCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Free Digital Proof</span>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar for Mobile Viewport */}
      <StickyWhatsAppButton
        product={product}
        sizeName={defaultSize}
        materialName={defaultMaterial}
        finishName={defaultFinish}
        sidesName={defaultSide}
        quantity={selectedQty}
        hasArtwork={hasArtwork}
        notes={customNotes}
        customerName={customerName}
        customerCity={customerCity}
      />

    </div>
  );
};
