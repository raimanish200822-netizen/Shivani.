import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, MessageCircle, Sparkles, Image as ImageIcon, ZoomIn, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../../types';
import { CATEGORIES } from '../../data/products';
import { WHATSAPP_PRIMARY } from '../../utils/whatsapp';
import { storage } from '../../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

interface ProductsGalleryPageProps {
  products: ProductItem[];
  onBackToHome: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem, qty: number) => void;
}

interface StorageImage {
  url: string;
  name: string;
  path: string;
}

export const ProductsGalleryPage: React.FC<ProductsGalleryPageProps> = ({
  products,
  onBackToHome,
  onSelectProduct,
  onAddToCart
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [storageImages, setStorageImages] = useState<StorageImage[]>([]);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Fetch high-resolution images dynamically from Firebase Storage
  useEffect(() => {
    async function fetchFirebaseStorageImages() {
      try {
        const folders = ['banners', 'products', 'quick_icons', 'shivanigraphics_uploads'];
        let allImages: StorageImage[] = [];

        for (const folder of folders) {
          try {
            const folderRef = ref(storage, folder);
            const res = await listAll(folderRef);
            const urls = await Promise.all(
              res.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                  url,
                  name: itemRef.name,
                  path: folder
                };
              })
            );
            allImages = [...allImages, ...urls];
          } catch (err) {
            // Folder might be empty or restricted, continue
          }
        }

        setStorageImages(allImages);
      } catch (e) {
        console.warn('Error fetching Firebase Storage images:', e);
      } finally {
        setLoadingStorage(false);
      }
    }

    fetchFirebaseStorageImages();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
                          p.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredStorageImages = storageImages.filter(img => 
    img.name.toLowerCase().includes(search.toLowerCase()) || 
    img.path.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuickWhatsApp = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Shivani Graphics! I am looking at your Products Gallery and want to order "${product.title}" in Delhi NCR. Please share price quotes and digital proof.`
    );
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          ✨ Firebase Cloud Storage & Products Gallery ({filteredProducts.length + filteredStorageImages.length} Assets)
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-[#50007c] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-[11px] font-black uppercase tracking-wider">
          Shivani Graphics Cloud Studio
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          High-Resolution Firebase Storage Gallery
        </h1>
        <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
          Dynamic assets loaded in real-time from Firebase Storage paired with category-filtered commercial print products and hover-zoom inspection.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or cloud images..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:border-[#50007c] focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCat('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === 'all' ? 'bg-[#50007c] text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Assets
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat.id ? 'bg-[#50007c] text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Firebase Storage High-Res Assets Section */}
      {filteredStorageImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#50007c]" />
              <span>Firebase Storage Dynamic Assets ({filteredStorageImages.length})</span>
            </h2>
            <span className="text-[11px] text-slate-500 font-semibold">Hover to zoom · Click to preview</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {filteredStorageImages.map((img, idx) => (
                <motion.div
                  key={img.url || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={() => setLightboxImage(img.url)}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs cursor-pointer aspect-square flex items-center justify-center"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono rounded truncate max-w-[85%]">
                    {img.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Products Grid with Hover-Zoom Effect */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-black text-slate-900">Commercial Print Products Catalog ({filteredProducts.length})</h2>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-sm font-black text-slate-800">No print products found matching your search.</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setSelectedCat('all'); }}
              className="px-4 py-2 bg-[#50007c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => onSelectProduct(p)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden cursor-pointer hover:shadow-2xl hover:border-[#50007c]/40 transition-shadow duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                      <img
                        src={p.images[0]?.url}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center text-white">
                        <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-xs shadow-lg">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </span>
                      </div>
                      {p.featureBadge && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-orange-600 text-white text-[10px] font-black rounded-md shadow-xs">
                          {p.featureBadge}
                        </span>
                      )}
                      {p.badge && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-purple-900 text-white text-[10px] font-bold rounded-md shadow-xs">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {p.categoryLabel}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-[#50007c] line-clamp-1">
                        {p.title}
                      </h3>
                      {p.subtitle && (
                        <p className="text-[11px] text-orange-600 font-medium line-clamp-1">
                          {p.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      {p.dispatchTag || '⚡ Express Ready'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleQuickWhatsApp(p, e)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                        title="Quick WhatsApp Order"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-black text-[#50007c] group-hover:translate-x-0.5 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox Modal for High-Res Image Preview */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-80 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-orange-400 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="High-resolution preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

    </div>
  );
};
