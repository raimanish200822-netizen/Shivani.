import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, Check, ArrowRight, Sparkles, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { ProductItem } from '../types';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  onSelectProduct
}) => {
  const [product1Id, setProduct1Id] = useState<string>(allProducts[0]?.id || '');
  const [product2Id, setProduct2Id] = useState<string>(allProducts[1]?.id || allProducts[0]?.id || '');

  if (!isOpen) return null;

  const product1 = allProducts.find(p => p.id === product1Id) || allProducts[0];
  const product2 = allProducts.find(p => p.id === product2Id) || allProducts[1] || allProducts[0];

  const handleWhatsAppQuote = (p: ProductItem) => {
    const text = `Hello Shivani Graphics! I compared "${product1.title}" and "${product2.title}" and would like to order "${p.title}". Please share best pricing and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-900 to-[#50007c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">Side-by-Side Product Comparison</h2>
              <p className="text-xs text-purple-200">Compare specifications, materials, finishes, and turnaround times side-by-side.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Selectors & Table Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Selectors Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Select Product 1
              </label>
              <select
                value={product1Id}
                onChange={(e) => setProduct1Id(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-900 outline-hidden focus:border-[#50007c]"
              >
                {allProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.categoryLabel})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Select Product 2
              </label>
              <select
                value={product2Id}
                onChange={(e) => setProduct2Id(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-900 outline-hidden focus:border-[#50007c]"
              >
                {allProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.categoryLabel})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                  <th className="p-3 sm:p-4 font-black w-1/4">Feature / Spec</th>
                  <th className="p-3 sm:p-4 font-black w-3/8 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <img src={product1.images[0]?.url} alt="" className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                      <span className="line-clamp-1">{product1.title}</span>
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 font-black w-3/8 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <img src={product2.images[0]?.url} alt="" className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                      <span className="line-clamp-1">{product2.title}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Category Department</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 font-medium text-[#50007c]">{product1.categoryLabel}</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 font-medium text-[#50007c]">{product2.categoryLabel}</td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Dispatch Speed / Turnaround</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 font-bold text-emerald-700">{product1.dispatchTag || '⚡ Fast Counter Pickup'}</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 font-bold text-emerald-700">{product2.dispatchTag || '⚡ Fast Counter Pickup'}</td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Customer Rating</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{product1.rating} / 5.0 ({product1.reviewCount || 100}+ reviews)</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{product2.rating} / 5.0 ({product2.reviewCount || 100}+ reviews)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Available Materials / Stock</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product1.config?.materials?.map(m => (
                      <div key={m.id} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{m.name}</span>
                      </div>
                    )) || 'Standard Commercial Stock'}
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product2.config?.materials?.map(m => (
                      <div key={m.id} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{m.name}</span>
                      </div>
                    )) || 'Standard Commercial Stock'}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Finishes & Lamination</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product1.config?.finishes?.map(f => (
                      <div key={f.id} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>{f.name}</span>
                      </div>
                    )) || 'Standard Finish'}
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product2.config?.finishes?.map(f => (
                      <div key={f.id} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>{f.name}</span>
                      </div>
                    )) || 'Standard Finish'}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Printing Sides</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product1.config?.sides?.map(s => (
                      <div key={s.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{s.name}</span>
                      </div>
                    )) || 'Standard Sides'}
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product2.config?.sides?.map(s => (
                      <div key={s.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{s.name}</span>
                      </div>
                    )) || 'Standard Sides'}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Key Specifications</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product1.specs?.map((spec, i) => (
                      <div key={i} className="text-[11px] text-slate-600">
                        <strong className="text-slate-800">{spec.label}:</strong> {spec.value}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-1">
                    {product2.specs?.map((spec, i) => (
                      <div key={i} className="text-[11px] text-slate-600">
                        <strong className="text-slate-800">{spec.label}:</strong> {spec.value}
                      </div>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 sm:p-4 font-bold bg-slate-50/50">Actions</td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProduct(product1);
                      }}
                      className="w-full py-2 bg-[#50007c] hover:bg-purple-900 text-white font-bold rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>View & Configure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppQuote(product1)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-[11px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </td>
                  <td className="p-3 sm:p-4 border-l border-slate-200 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProduct(product2);
                      }}
                      className="w-full py-2 bg-[#50007c] hover:bg-purple-900 text-white font-bold rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>View & Configure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppQuote(product2)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-[11px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Shivani Graphics Side-by-Side Product Matrix · Mahavir Enclave, New Delhi</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
};
