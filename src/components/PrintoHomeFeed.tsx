import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  BookOpen, 
  Shirt, 
  Gift, 
  Package, 
  Sparkles, 
  Coffee, 
  ArrowRight, 
  Plus, 
  Minus,
  CheckCircle2,
  Star,
  MessageCircle,
  Truck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Megaphone,
  Heart,
  Camera,
  Layers,
  Printer,
  History,
  FileText,
  Stamp,
  FolderOpen,
  X,
  Send,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';
import { WHATSAPP_PRIMARY } from '../utils/whatsapp';
import { getRecentlyViewedIds, addRecentlyViewedId } from '../utils/recentlyViewed';
import { CATEGORIES } from '../data/products';
import { useAdmin } from '../context/AdminContext';
import { CachedImage } from '../services/imageService';

interface PrintoHomeFeedProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onSelectCategory?: (categoryId: string) => void;
  onOpenBulkModal: () => void;
  onOpenStoreModal?: () => void;
  onOpenArtworkGuide?: () => void;
}

export const PrintoHomeFeed: React.FC<PrintoHomeFeedProps> = ({
  products,
  onSelectProduct,
  onSelectCategory,
  onOpenBulkModal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => getRecentlyViewedIds());

  const { websiteImages, reviews: firestoreReviews, addPublicReview, deleteReview } = useAdmin();
  const approvedReviews = firestoreReviews.filter(r => r.approved !== false);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewPhone, setNewReviewPhone] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewService, setNewReviewService] = useState('Visiting Cards');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewImage, setNewReviewImage] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSlideIndex, setReviewSlideIndex] = useState(0);

  const [firestoreCategories] = useState<any[]>([]);

  const getLocalAuthorId = () => {
    let id = localStorage.getItem('printo_author_id');
    if (!id) {
      id = 'usr_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('printo_author_id', id);
    }
    return id;
  };

  // Submit new review to Firestore via AdminContext
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert('Please enter your name and comment.');
      return;
    }

    setSubmittingReview(true);
    try {
      await addPublicReview({
        name: newReviewName.trim(),
        rating: Number(newReviewRating),
        review: newReviewComment.trim(),
        photo: newReviewImage.trim()
      });
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setIsReviewModalOpen(false);
        setNewReviewName('');
        setNewReviewPhone('');
        setNewReviewComment('');
        setNewReviewImage('');
      }, 2000);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        alert('Review deleted successfully.');
      } catch (err) {
        console.error("Error deleting review:", err);
        alert('Failed to delete review.');
      }
    }
  };

  // Keep recently viewed in sync with localStorage and custom window events
  useEffect(() => {
    const handleUpdate = () => {
      setRecentlyViewedIds(getRecentlyViewedIds());
    };
    window.addEventListener('recently-viewed-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('recently-viewed-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getProduct = (id: string) => products.find(p => p.id === id) || products[0];

  const handleProductClick = (productId: string) => {
    addRecentlyViewedId(productId);
    const item = getProduct(productId);
    onSelectProduct(item);
  };

  const handleCategoryNavigate = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  // Flagship Hero Promo Banners (Dynamic from Firestore WebsiteImages / Admin panel)
  const defaultBanners = [
    {
      id: 'user-uploaded-hero',
      productId: 'visiting-cards-premium',
      categoryId: 'paper-documents',
      title: 'Shivani Graphics · Custom Print & Signage',
      featureTag: '⚡ Same-Day Express Printing & Store Pickup in Delhi NCR',
      subtitle: 'Premium commercial printing, visiting cards, flex banners, acrylic glow signs, and custom merchandise',
      badge: '⚡ Live Store Highlight',
      minQty: 'Min. Qty: 1 unit',
      image: '/promo-banner.png',
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: 'Explore Catalog'
    },
    {
      id: 'visiting-cards-hero',
      productId: 'visiting-cards-premium',
      categoryId: 'paper-documents',
      title: 'Visiting Cards & Corporate Stationery',
      featureTag: 'Executive Visiting Cards · Ready in 5 Minutes',
      subtitle: 'Premium 350 GSM Art Board with Velvet Touch, Gold Foil & Raised Spot UV, plus Bond Letterheads',
      badge: '⚡ 5-Minute Store Pickup',
      minQty: 'Min. Qty: 100 cards',
      image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: 'Explore Visiting Cards'
    },
    {
      id: 'flex-banner-hero',
      productId: 'flex-printing-banner-boards',
      categoryId: 'signage-vinyl',
      title: 'Outdoor Flex Banners & 3D Sign Boards',
      featureTag: 'Heavy 340 GSM Star Flex & Backlit ACP Glow Signs',
      subtitle: 'Heavy-duty Star Flex with folded hemmed borders, brass eyelets & 3D acrylic LED boards',
      badge: '⚡ 2-Hour Express Printing',
      minQty: 'Min. Qty: 1 Board',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: 'Explore Outdoor Signage'
    },
    {
      id: 'notebooks-envelopes-hero',
      productId: 'custom-notebooks-spiral',
      categoryId: 'paper-documents',
      title: 'Custom Spiral Notebooks & Envelopes',
      featureTag: 'Corporate Diaries, Spiral Notebooks & Office Envelopes',
      subtitle: 'Hardcover journals, wire-o metal spiral binding, peel & seal envelopes, and GST bill books',
      badge: '⚡ 24-Hour Express Dispatch',
      minQty: 'Min. Qty: 25 books',
      image: 'https://kommodo.ai/i/Ivg3kEpp3DOokw3RRrsu',
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: 'Explore Custom Notebooks'
    },
    {
      id: 'promotional-hero',
      productId: 'mug-print-services',
      categoryId: 'custom-promotional',
      title: 'Custom Merch, Photo Mugs & T-Shirts',
      featureTag: 'Panoramic Ceramic Mugs & DTF Cotton T-Shirts',
      subtitle: 'Sublimation ceramic coffee mugs ready in 10 minutes, bio-washed cotton tees, and rubber stamps',
      badge: '⚡ 10-Minute Express Pickup',
      minQty: 'Min. Qty: 1 piece',
      image: 'https://user43118.na.imgto.link/public/20261010/25d44d334ecb99dd49c515f2-1000046836.avif',
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: 'Explore Mugs & Merch'
    }
  ];

  const firestoreHeroBanners = websiteImages
    .filter(img => img.section === 'Hero' && img.enabled !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(img => ({
      id: img.id,
      productId: img.productId || 'visiting-cards-premium',
      categoryId: img.categoryId || 'paper-documents',
      title: img.title,
      featureTag: img.alt || '⚡ Same-Day Express Printing & Store Pickup in Delhi NCR',
      subtitle: img.subtitle || 'Premium commercial printing, visiting cards, flex banners, acrylic glow signs, and custom merchandise',
      badge: img.badge || '⚡ Live Store Highlight',
      minQty: img.minQty || 'Min. Qty: 1 unit',
      image: img.url,
      gradient: 'from-black/90 via-black/60 to-black/35',
      ctaText: img.ctaText || 'Explore Catalog'
    }));

  const heroBanners = firestoreHeroBanners.length > 0 ? firestoreHeroBanners : defaultBanners;

  // Auto-advance banner carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, heroBanners.length]);

  const activeHero = heroBanners[bannerIndex];

  // Recently viewed products mapping
  const recentlyViewedProducts = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as ProductItem[];

  // 6 Instant 5-Minute Products
  const express5MinProducts = products.filter(p => 
    ['visiting-cards-premium', 'pvc-aadhaar-smart-card', 'round-neck-tshirt', 'self-inking-stamp', 'mug-print-services', 'lanyard-id-card-print'].includes(p.id)
  ).slice(0, 6);

  // Official Category Portals merged with Firestore category edits
  const defaultPortals = [
    {
      id: 'paper-documents',
      title: 'Paper & Document Printing',
      subtitle: 'Visiting cards, letterheads, spiral notebooks, bill books, envelopes, certificates & flyers.',
      itemCount: products.filter(p => p.category === 'paper-documents').length || 8,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      badge: '⚡ 5 Mins Pickup',
      tagColor: 'bg-amber-500 text-white'
    },
    {
      id: 'signage-vinyl',
      title: 'Signage, Flex & Vinyl Banners',
      subtitle: 'Outdoor flex banners, star flex, vinyl stickers, one-way vision film & ACP acrylic glow signs.',
      itemCount: products.filter(p => p.category === 'signage-vinyl').length || 6,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      badge: '⚡ Same Day Ready',
      tagColor: 'bg-purple-600 text-white'
    },
    {
      id: 'custom-promotional',
      title: 'Custom Gifts & Promotional Merch',
      subtitle: 'Sublimation coffee mugs, magic mugs, sippers, photo frames, keychains & badges.',
      itemCount: products.filter(p => p.category === 'custom-promotional').length || 6,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      badge: '⚡ 10 Mins Ready',
      tagColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'apparel-uniforms',
      title: 'Apparel & Uniform Printing',
      subtitle: 'Round neck t-shirts, polo collar t-shirts, hoodies, corporate caps & aprons with DTF print.',
      itemCount: products.filter(p => p.category === 'apparel-uniforms').length || 6,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      badge: '⚡ Express Dispatch',
      tagColor: 'bg-blue-600 text-white'
    },
    {
      id: 'stamps-rubber',
      title: 'Stamps, Badges & ID Solutions',
      subtitle: 'Self-inking pre-inked rubber stamps, pocket stamps, engraved acrylic nameplates & ID lanyards.',
      itemCount: products.filter(p => p.category === 'stamps-rubber').length || 6,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      badge: '⚡ 15 Mins Ready',
      tagColor: 'bg-indigo-600 text-white'
    }
  ];

  const officialCategoryPortals = defaultPortals.map(def => {
    const found = firestoreCategories.find(c => c.id === def.id || c.title?.toLowerCase() === def.title.toLowerCase());
    return found ? {
      ...def,
      title: found.title || def.title,
      subtitle: found.subtitle || def.subtitle,
      image: found.image || def.image,
      badge: found.badge || def.badge,
      itemCount: found.itemCount || def.itemCount
    } : def;
  });

  const faqs = [
    {
      q: 'Where is Shivani Graphics located for store pickup?',
      a: 'Our flagship print studio is located at Mahavir Enclave, New Delhi. You can walk in for 5-minute instant printing or order online for same-day delivery across Delhi NCR.'
    },
    {
      q: 'How fast can I get visiting cards or flex banners printed?',
      a: 'Visiting cards are ready in 5 minutes, rubber stamps in 15 minutes, and heavy star flex banners or acrylic sign boards within 2 hours!'
    },
    {
      q: 'Do you provide GST invoices for business & corporate orders?',
      a: 'Yes! We provide 18% GST invoices with complete Input Tax Credit (ITC) matching for all corporate and bulk printing orders.'
    },
    {
      q: 'Can I upload my own design file (PDF, CDR, AI, PNG)?',
      a: 'Absolutely. You can upload your design file directly on the product page or send it via WhatsApp to our print desk for instant pre-check.'
    }
  ];

  const handleQuickWhatsApp = (p: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Hello Shivani Graphics! I want to order "${p.title}" (₹${p.minPrice || 499}). Please share details.`;
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-16">

      {/* UPPER CATEGORY QUICK PILLS BAR */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-2xs overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-4 no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => handleCategoryNavigate('all')}
            className="px-3.5 py-1.5 bg-[#50007c] text-white rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>All Categories</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNavigate('paper-documents')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#50007c]" />
            <span>Visiting Cards & Paper</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNavigate('signage-vinyl')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-purple-700" />
            <span>Flex Banners & Signage</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNavigate('custom-promotional')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>Custom Mugs & Gifts</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNavigate('apparel-uniforms')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Shirt className="w-3.5 h-3.5 text-blue-600" />
            <span>T-Shirts & Apparel</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNavigate('stamps-rubber')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Stamp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Stamps & Badges</span>
          </button>
        </div>
      </div>

      {/* 2. FLAGSHIP HERO BANNER SLIDER */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between bg-slate-900 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Image with Clean Gradient Overlay */}
          <div className="absolute inset-0">
            <CachedImage
              src={activeHero.image}
              fallbackSrc="/promo-banner.png"
              alt={activeHero.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30 sm:to-transparent" />
          </div>

          {/* Top Bar inside Hero */}
          <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              {activeHero.badge}
            </span>

            {/* Slider Controls */}
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setBannerIndex(prev => (prev - 1 + heroBanners.length) % heroBanners.length)}
                className="p-1.5 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setBannerIndex(prev => (prev + 1) % heroBanners.length)}
                className="p-1.5 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10 my-auto max-w-2xl text-white pointer-events-auto">
            <div className="space-y-3">
              {activeHero.featureTag && (
                <span className="inline-block px-3 py-1 bg-blue-600/40 text-blue-200 text-xs sm:text-sm font-bold rounded-lg border border-blue-400/30 backdrop-blur-sm">
                  ⚡ {activeHero.featureTag}
                </span>
              )}

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white drop-shadow-md">
                {activeHero.title}
              </h1>

              <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
                {activeHero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate(activeHero.categoryId)}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{activeHero.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleQuickWhatsApp(getProduct(activeHero.productId), e)}
                  className="px-4 py-2.5 sm:px-5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="relative z-10 w-full p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
            <span className="text-xs text-slate-300 font-bold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {activeHero.minQty}
            </span>

            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {heroBanners.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setBannerIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === bannerIndex ? 'w-6 bg-orange-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              <span className="text-[10px] text-white/70 font-semibold pl-1 whitespace-nowrap">
                {isPaused ? '⏸ Paused' : `${bannerIndex + 1}/${heroBanners.length}`}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. RECENTLY VIEWED PRODUCTS (Horizontal 4-Card List from localStorage) */}
      {recentlyViewedProducts.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-slate-50/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-[#50007c]">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Recently Viewed
                    </h2>
                    <span className="px-2 py-0.5 bg-purple-100 text-[#50007c] text-[10px] font-bold rounded-full">
                      Last {recentlyViewedProducts.length} items
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    Quickly revisit products you recently checked out
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCategoryNavigate('all')}
                className="text-xs font-bold text-[#50007c] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal list of 4 products */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {recentlyViewedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -3 }}
                  onClick={() => handleProductClick(p.id)}
                  className="bg-white rounded-xl border border-slate-200/90 p-2.5 sm:p-3 hover:shadow-md hover:border-[#50007c]/40 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-square rounded-lg bg-slate-100 overflow-hidden mb-2.5">
                      <CachedImage
                        src={p.images[0]?.url || '/logo.jpg'}
                        fallbackSrc="/logo.jpg"
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.featureBadge && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-sm shadow-xs">
                          {p.featureBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {p.categoryLabel}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#50007c] line-clamp-1 mt-0.5">
                      {p.title}
                    </h3>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      {p.dispatchTag || '⚡ Fast Pickup'}
                    </span>
                    <span className="text-xs font-bold text-[#50007c] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SIGNATURE 5-MINUTE INSTANT EXPRESS COUNTER (Compact & Clean) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 via-amber-50/50 to-orange-50 p-5 sm:p-6 rounded-3xl border border-orange-200/90 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-200/80 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-2xs">
                <Clock className="w-3 h-3" />
                <span>Ready in Minutes · Express Counter</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <span>⚡ Instant Express Print Studio & Counter Delivery</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Get urgent visiting cards, rubber stamps, ID cards & photo mugs printed instantly while you wait at Mahavir Enclave, New Delhi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCategoryNavigate('all')}
              className="text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Clean Instant Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {express5MinProducts.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -3 }}
                onClick={() => handleProductClick(p.id)}
                className="bg-white rounded-xl border border-orange-200/90 overflow-hidden cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <CachedImage
                    src={p.images[0]?.url || '/logo.jpg'}
                    fallbackSrc="/logo.jpg"
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-orange-600 text-white text-[9px] font-black rounded-sm shadow-xs">
                    {p.featureBadge || '⚡ 5 Mins'}
                  </span>
                </div>

                <div className="p-2.5 space-y-1">
                  <p className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#50007c]">
                    {p.title}
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      ⚡ Ready
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleQuickWhatsApp(p, e)}
                      className="p-1 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Quick WhatsApp Order"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. EXPLORE OFFICIAL CATEGORIES PORTAL (Each Category Has Its Dedicated Separate Page) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#50007c] rounded-full text-[11px] font-black uppercase tracking-wider">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Official Product Categories</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Explore Our Dedicated Department Pages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Click any department below to open its dedicated page with complete specifications and ordering
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBulkModal}
            className="px-4 py-2 bg-gradient-to-r from-[#50007c] to-purple-800 hover:from-purple-900 hover:to-[#50007c] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Custom Bulk RFQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Spacious Category Gateway Cards (Photo-less Clean Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {officialCategoryPortals.map((portal) => (
            <motion.div
              key={portal.id}
              whileHover={{ y: -4 }}
              onClick={() => handleCategoryNavigate(portal.id)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#50007c]/40 transition-all duration-300 group flex flex-col justify-between p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-black rounded-lg shadow-xs uppercase tracking-wider ${portal.tagColor}`}>
                    {portal.badge}
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-[#50007c] transition-colors leading-snug">
                    {portal.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#50007c] flex items-center justify-center shrink-0 group-hover:bg-[#50007c] group-hover:text-white transition-colors">
                  <FolderOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {portal.subtitle}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {portal.itemCount} Verified Products
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#50007c] group-hover:text-orange-600 transition-colors">
                    <span>Open Category Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* 6. TRUST & STORE STRENGTHS (Clean, Non-congested 4-Card Grid) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">5-Min Counter</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">Walk-in instant prints</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#50007c] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Delhi NCR Express</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">Same-day courier delivery</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">18% GST Invoicing</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">Input Tax Credit (ITC)</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Free Mockup Proof</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">WhatsApp pre-check</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Corporate & Custom Bulk Quote Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#50007c] via-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-[11px] font-black uppercase tracking-wider">
              Corporate & Volume Deals
            </span>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              Need Bulk Printing for Your Company or Event?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Special wholesale rates for Corporate Identity kits, Exhibition Banners, Uniform Merch, and Annual Event Stationery with GST Billing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBulkModal}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-100 text-[#50007c] font-black text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Get Bulk Quote
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent('Hello Shivani Graphics! We have a corporate / bulk printing requirement in Delhi NCR.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 4.9 / 5.0 Rating Across Delhi NCR
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
              Trusted by Leading Businesses & Retail Customers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Real feedback from verified clients who got 5-minute printing & urgent signage at Mahavir Enclave.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (reviewsScrollRef.current) {
                    reviewsScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                  }
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (reviewsScrollRef.current) {
                    reviewsScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                  }
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {approvedReviews.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">No reviews published yet.</p>
            <p className="text-xs text-slate-500">Be the first to share your experience with Shivani Graphics!</p>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="mt-2 px-4 py-2 bg-[#50007c] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Add First Review
            </button>
          </div>
        ) : (
          <div 
            ref={reviewsScrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {approvedReviews.map((rev, index) => (
              <div 
                key={rev.id || index} 
                className="min-w-[300px] sm:min-w-[340px] max-w-[380px] shrink-0 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow snap-start"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < (rev.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date || 'Recent'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                    "{rev.review}"
                  </p>
                  {rev.photo && (
                    <div className="rounded-xl overflow-hidden w-20 h-20 border border-slate-200">
                      <img src={rev.photo} alt="Customer print work" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-black text-slate-900">{rev.name}</p>
                    <p className="text-[10px] text-slate-500">Verified Customer · Delhi NCR</p>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-[#50007c] font-bold px-2 py-0.5 rounded">
                    Verified Purchase
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. Frequently Asked Questions Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-2">
        <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-3 sm:py-4">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-500 ml-2">
                  {openFaqIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* WRITE A REVIEW MODAL FOR NORMAL PEOPLE */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-sm">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Share Your Experience</h3>
              <p className="text-xs text-slate-500 mt-1">Your review will appear instantly on Shivani Graphics website</p>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Thank You for Your Review!</h4>
                <p className="text-xs text-slate-600">Your feedback has been successfully published to Firebase Firestore.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={newReviewName}
                      onChange={e => setNewReviewName(e.target.value)}
                      placeholder="e.g. Rohit Kumar"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={newReviewPhone}
                      onChange={e => setNewReviewPhone(e.target.value)}
                      placeholder="9871234567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      value={newReviewRating}
                      onChange={e => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                      <option value={2}>⭐⭐ (2/5 Fair)</option>
                      <option value={1}>⭐ (1/5 Poor)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Service / Product</label>
                    <select
                      value={newReviewService}
                      onChange={e => setNewReviewService(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                    >
                      <option value="Visiting Cards & Stationery">Visiting Cards & Stationery</option>
                      <option value="Flex Banner & Signage">Flex Banner & Signage</option>
                      <option value="Custom Mugs & T-Shirts">Custom Mugs & T-Shirts</option>
                      <option value="Rubber Stamps & ID Badges">Rubber Stamps & ID Badges</option>
                      <option value="Spiral Notebooks & Diaries">Spiral Notebooks & Diaries</option>
                      <option value="General Printing Service">General Printing Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Review / Feedback *</label>
                  <textarea
                    value={newReviewComment}
                    onChange={e => setNewReviewComment(e.target.value)}
                    rows={3}
                    placeholder="Write about the print quality, speed, and service at Shivani Graphics..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Upload Photo of Printed Product (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (uploadEvt) => {
                          setNewReviewImage(uploadEvt.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-[#50007c] hover:file:bg-purple-100 cursor-pointer"
                  />
                  {newReviewImage && (
                    <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                      <img src={newReviewImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewReviewImage('')}
                        className="absolute top-1 right-1 bg-slate-900/80 text-white rounded-full p-1 text-[10px] cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-3.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-sm rounded-xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingReview ? 'Publishing Review...' : 'Submit Review to Live Website'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
};
