import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  X, 
  MapPin, 
  Truck, 
  Sparkles,
  CreditCard,
  Megaphone,
  Shirt,
  Gift,
  Briefcase,
  Package,
  Layers,
  FileText,
  Heart,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';
import { CATEGORIES } from '../data/products';

interface HeaderProps {
  products: ProductItem[];
  selectedCategoryId: string;
  onSelectProduct: (product: ProductItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenMobileMenu: () => void;
  cartCount: number;
  onOpenCartModal: () => void;
  onOpenStoreModal: () => void;
  onOpenHelpCenter: () => void;
  onNavigateHome: () => void;
  onNavigateTrack: () => void;
  onNavigateAbout: () => void;
  onNavigateAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  products,
  selectedCategoryId,
  onSelectProduct,
  onSelectCategory,
  onOpenMobileMenu,
  cartCount,
  onOpenCartModal,
  onOpenStoreModal,
  onOpenHelpCenter,
  onNavigateHome,
  onNavigateTrack,
  onNavigateAbout,
  onNavigateAdmin
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery.trim()
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectResult = (p: ProductItem) => {
    onSelectProduct(p);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'paper-documents': return <FileText className="w-3.5 h-3.5" />;
      case 'cards-invitations': return <Heart className="w-3.5 h-3.5" />;
      case 'custom-promotional': return <Gift className="w-3.5 h-3.5" />;
      case 'signage-vinyl': return <Megaphone className="w-3.5 h-3.5" />;
      case 'finishing-binding': return <Layers className="w-3.5 h-3.5" />;
      case 'business-cards': return <CreditCard className="w-3.5 h-3.5" />;
      case 'standees-banners': return <Megaphone className="w-3.5 h-3.5" />;
      case 'apparel': return <Shirt className="w-3.5 h-3.5" />;
      case 'photo-gifts': return <Gift className="w-3.5 h-3.5" />;
      case 'stamps-seals': return <Sparkles className="w-3.5 h-3.5" />;
      case 'stationery': return <Briefcase className="w-3.5 h-3.5" />;
      case 'packaging': return <Package className="w-3.5 h-3.5" />;
      default: return <Printer className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Left: Hamburger menu toggle */}
          <div className="flex items-center">
            <button
              onClick={onOpenMobileMenu}
              type="button"
              className="p-2 -ml-1.5 text-slate-800 hover:text-[#50007c] hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* Center-Left: Shivani Graphics Brand Logo */}
          <div className="flex items-center">
            <button 
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#50007c] via-purple-700 to-orange-500 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform">
                SG
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-sans font-black text-xl sm:text-2xl tracking-tight leading-none">
                  <span className="text-[#50007c]">Shivani</span>
                  <span className="text-orange-500 ml-1">Graphics</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-tight -mt-0.5 group-hover:text-orange-600 transition-colors">
                  Digital Prints & Signages
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar on Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Visiting Cards, Standees, T-Shirts, Stamps..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 rounded-full border border-slate-200/80 focus:border-[#50007c] focus:bg-white text-slate-900 outline-hidden transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Desktop Search Dropdown */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 divide-y divide-slate-100 max-h-80 overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-150">
                {filtered.length > 0 ? (
                  filtered.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectResult(p)}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50/70 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.images[0]?.url} 
                          alt={p.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#50007c]">{p.title}</p>
                          <p className="text-[10px] text-slate-500">{p.categoryLabel}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        ⚡ Free Quote
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching print products found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Quick Links, Search & Cart Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            <button
              type="button"
              onClick={onNavigateTrack}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#50007c] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>Track Order</span>
            </button>

            <button
              type="button"
              onClick={onOpenStoreModal}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#50007c] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>Store Location</span>
            </button>

            <button
              type="button"
              onClick={onNavigateAbout}
              className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-[#50007c] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              About Us
            </button>

            {onNavigateAdmin && (
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="hidden md:inline-flex items-center gap-1 text-xs font-black text-[#50007c] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors border border-purple-200"
              >
                <span>⚙️ Admin Panel</span>
              </button>
            )}

            {/* Mobile Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(prev => !prev)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#50007c] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Shopping Cart Icon with Purple/Indigo Badge */}
            <button
              type="button"
              onClick={onOpenCartModal}
              className="relative p-2 text-slate-700 hover:text-[#50007c] hover:bg-slate-100 rounded-xl transition-colors flex items-center cursor-pointer"
              aria-label={`View Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 bg-[#50007c] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Expandable Search Input Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden py-2.5 border-t border-slate-100 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Visiting Cards, T-shirts, Standees, Stamps..."
                  className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-100 rounded-xl border border-slate-200 outline-hidden focus:border-[#50007c] focus:bg-white text-slate-900"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {searchQuery.trim() && (
                <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {filtered.length > 0 ? (
                    filtered.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectResult(p)}
                        className="w-full px-3 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-purple-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <img 
                            src={p.images[0]?.url} 
                            alt={p.title} 
                            loading="lazy" 
                            decoding="async" 
                            className="w-7 h-7 rounded object-cover" 
                          />
                          <span>{p.title}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                          ⚡ Free Quote
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-500">
                      No results for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Horizontal Navigation Menu Bar (Printo Style) */}
        <nav 
          aria-label="Category Navigation"
          className="border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-1 py-1.5 text-xs font-bold text-slate-600"
        >
          {CATEGORIES.map(cat => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#50007c] text-white shadow-2xs font-extrabold'
                    : 'hover:bg-purple-50 hover:text-[#50007c]'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#50007c]'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
