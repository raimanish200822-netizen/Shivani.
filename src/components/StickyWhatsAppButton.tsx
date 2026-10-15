import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';

interface StickyWhatsAppButtonProps {
  product: ProductItem;
  sizeName: string;
  materialName: string;
  finishName: string;
  sidesName: string;
  quantity: number;
  hasArtwork: boolean;
  notes?: string;
  customerName?: string;
  customerCity?: string;
}

export const StickyWhatsAppButton: React.FC<StickyWhatsAppButtonProps> = ({
  product,
  sizeName,
  materialName,
  finishName,
  sidesName,
  quantity,
  hasArtwork,
  notes,
  customerName,
  customerCity
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const configuratorElement = document.getElementById('product-configurator-section');
      if (configuratorElement) {
        const rect = configuratorElement.getBoundingClientRect();
        if (rect.top < 0 && rect.bottom > -2000) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = () => {
    const url = generateWhatsAppOrderUrl({
      productTitle: product.title,
      size: sizeName,
      material: materialName,
      finish: finishName,
      sides: sidesName,
      quantity,
      hasArtwork,
      notes,
      customerName,
      customerCity
    });
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed z-30 bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-auto max-w-md pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleOrder}
            className="w-full sm:w-auto px-4 sm:px-5 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-2xl shadow-2xl shadow-emerald-600/50 border border-emerald-400/50 flex items-center justify-between sm:justify-center gap-3 font-bold text-xs sm:text-sm ring-4 ring-emerald-500/20 backdrop-blur-md cursor-pointer"
            aria-label="Get Free Quote on WhatsApp"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[11px] sm:text-xs text-emerald-100 truncate">{quantity} units · {sizeName}</p>
                <p className="font-extrabold text-xs sm:text-sm tracking-tight truncate">Get Free Quote on WhatsApp</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-emerald-400/30">
              <span className="text-[11px] font-bold text-emerald-100 hidden sm:inline">Connect</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
