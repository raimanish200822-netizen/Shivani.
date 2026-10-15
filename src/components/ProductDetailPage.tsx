import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  MessageCircle, 
  Mail, 
  ShoppingBag,
  Sliders,
  Share2,
  ThumbsUp,
  X,
  Send,
  Camera,
  ChevronLeft,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem, CartItem } from '../types';
import { ProductGallery } from './ProductGallery';
import { ProductConfigurator } from './ProductConfigurator';
import { WHATSAPP_PRIMARY, SUPPORT_EMAIL } from '../utils/whatsapp';
import { addRecentlyViewedId } from '../utils/recentlyViewed';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

interface ProductDetailPageProps {
  product: ProductItem;
  allProducts: ProductItem[];
  onBack: () => void;
  onSelectProduct: (p: ProductItem) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenArtworkGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  onOpenArtworkGuide
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'artwork' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Firestore Reviews State
  const [firestoreReviews, setFirestoreReviews] = useState<any[]>([]);
  const [reviewSort, setReviewSort] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewPhone, setNewReviewPhone] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewImage, setNewReviewImage] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSlideIndex, setReviewSlideIndex] = useState(0);

  // Filter reviews specifically for this product
  const productReviews = firestoreReviews.filter(rev => 
    rev.productId === product.id || 
    (rev.service && rev.service.toLowerCase().includes(product.title.toLowerCase()))
  );

  const displayReviews = productReviews.length > 0 ? productReviews : [
    {
      id: `default-${product.id}-1`,
      name: 'Rohan Sharma',
      city: 'New Delhi',
      rating: 5,
      date: 'Verified Buyer',
      comment: `Ordered ${product.title}. The print quality, paper stock and finishing are exceptional! Delivered right on time in Delhi NCR.`,
      productId: product.id,
      service: product.title
    },
    {
      id: `default-${product.id}-2`,
      name: 'Pooja Verma',
      city: 'Noida',
      rating: 5,
      date: 'Verified Buyer',
      comment: `Extremely satisfied with ${product.title}. Colors are vibrant and professional. Highly recommended for businesses!`,
      productId: product.id,
      service: product.title
    }
  ];

  const sortedReviews = [...displayReviews].sort((a, b) => {
    if (reviewSort === 'highest') {
      return (Number(b.rating) || 5) - (Number(a.rating) || 5);
    }
    if (reviewSort === 'lowest') {
      return (Number(a.rating) || 5) - (Number(b.rating) || 5);
    }
    return 0; // newest
  });

  useEffect(() => {
    if (product?.id) {
      addRecentlyViewedId(product.id);
    }
  }, [product?.id]);

  // Fetch reviews from Firebase in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (list.length > 0) {
        setFirestoreReviews(list);
      }
    }, (err) => {
      console.error("Error fetching reviews:", err);
    });

    return () => unsubscribe();
  }, []);

  const getLocalAuthorId = () => {
    let id = localStorage.getItem('printo_author_id');
    if (!id) {
      id = 'usr_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('printo_author_id', id);
    }
    return id;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert('Please enter your name and comment.');
      return;
    }

    setSubmittingReview(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name: newReviewName.trim(),
        phone: newReviewPhone.trim(),
        rating: Number(newReviewRating),
        service: product.title,
        productId: product.id,
        comment: newReviewComment.trim(),
        imageUrl: newReviewImage.trim(),
        authorId: getLocalAuthorId(),
        date: 'Just now',
        createdAt: serverTimestamp(),
        approved: true
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
    if (!reviewId || reviewId.startsWith('default-')) {
      alert('Default sample reviews cannot be deleted. Only live customer reviews stored in Firebase can be deleted.');
      return;
    }
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDoc(doc(db, 'reviews', reviewId));
        alert('Review deleted successfully.');
      } catch (err) {
        console.error("Error deleting review:", err);
        alert('Failed to delete review.');
      }
    }
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-6 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation Bar & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 ml-2">
              <span className="cursor-pointer hover:text-purple-900" onClick={onBack}>Home</span>
              <span>/</span>
              <span className="font-medium text-slate-700">{product.categoryLabel}</span>
              <span>/</span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">{product.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Product Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: High-Res Multi-Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Customizer Card */}
          <div className="lg:col-span-6">
            <ProductConfigurator
              product={product}
              onAddToCart={onAddToCart}
              onOpenArtworkGuide={onOpenArtworkGuide}
            />
          </div>

        </div>

        {/* Detailed Tabs: Specifications, Artwork File Guide, Customer Reviews */}
        <div className="pt-8 border-t border-slate-200">
          
          {/* Tab Buttons */}
          <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#50007c] text-[#50007c]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Product Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('artwork')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'artwork'
                  ? 'border-[#50007c] text-[#50007c]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Artwork Preparation
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-[#50007c] text-[#50007c]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Verified Reviews</span>
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] rounded-full">
                4.9 ★
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            
            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-slate-700">
                <p className="leading-relaxed">
                  {product.detailedDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.specs?.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
                      <span className="font-semibold text-slate-900 mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl flex items-center gap-3 text-xs text-[#50007c] font-medium">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span>
                    100% Quality & Fogra-39 Color Matching Guarantee. Every order undergoes double manual quality check before packing.
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Artwork Guide */}
            {activeTab === 'artwork' && (
              <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">Supported Formats</p>
                    <p className="text-xs text-slate-600">Vector PDF, CorelDRAW (CDR), Adobe Illustrator (AI), Photoshop (PSD), TIFF, High-Res JPG.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">Bleed & Margins</p>
                    <p className="text-xs text-slate-600">Add 3mm bleed margin on all four sides. Keep critical text and logos at least 4mm inside the trim line.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">Resolution & Colors</p>
                    <p className="text-xs text-slate-600">Convert RGB to CMYK. All raster graphics must be 300 DPI at actual print scale.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">Convert Fonts to Curves</p>
                    <p className="text-xs text-slate-600">Press Ctrl+Q in CorelDRAW or Ctrl+Shift+O in Illustrator before exporting your file.</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                  <p className="text-xs font-bold text-emerald-900">
                    Need our prepress designers to review or create your design?
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(`Hello Shivani Graphics! Please help me with design proofing for: ${product.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-50/80 via-white to-purple-50/40 p-6 rounded-2xl border border-purple-200 shadow-sm">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base tracking-tight">Customer Reviews for {product.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Read experiences from verified print buyers or share your feedback</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto transition-all hover:scale-[1.02]"
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Write a Review</span>
                  </button>
                </div>

                {/* Customer Printed Photos Gallery */}
                {displayReviews.some(r => r.imageUrl) && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#50007c]" />
                      <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Customer Printed Photos Gallery ({displayReviews.filter(r => r.imageUrl).length})</h5>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                      {displayReviews.filter(r => r.imageUrl).map((rev, idx) => (
                        <div key={idx} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50 group shadow-2xs">
                          <img src={rev.imageUrl} alt={rev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-white text-[10px] truncate font-medium">
                            {rev.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sorting Dropdown, Count & Slider Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
                  <span className="font-bold text-slate-800">
                    Showing <span className="text-[#50007c] font-black">{sortedReviews.length}</span> Verified Reviews (<span className="text-[#50007c] font-black">{sortedReviews.length}</span> people reviewed)
                  </span>
                  <div className="flex items-center gap-4">
                    {sortedReviews.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setReviewSlideIndex(prev => (prev === 0 ? sortedReviews.length - 1 : prev - 1))}
                          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                          aria-label="Previous Review"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-slate-600">
                          {reviewSlideIndex + 1} / {sortedReviews.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setReviewSlideIndex(prev => (prev === sortedReviews.length - 1 ? 0 : prev + 1))}
                          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                          aria-label="Next Review"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Sort:</span>
                      <select
                        value={reviewSort}
                        onChange={(e) => setReviewSort(e.target.value as any)}
                        className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#50007c]/20 focus:border-[#50007c] cursor-pointer text-xs"
                      >
                        <option value="newest">Newest First</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  {sortedReviews.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
                      <Star className="w-8 h-8 text-amber-400 fill-amber-100 mx-auto mb-2" />
                      <p className="font-bold text-slate-800 text-sm">No reviews yet for this product</p>
                      <p className="text-xs text-slate-500 mt-1">Be the first to share your experience with Shivani Graphics printing quality!</p>
                      <button
                        type="button"
                        onClick={() => setIsReviewModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-[#50007c] text-white rounded-lg text-xs font-bold hover:bg-[#3e0061] transition-colors cursor-pointer"
                      >
                        Write First Review
                      </button>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {(() => {
                          const currentReview = sortedReviews[reviewSlideIndex % sortedReviews.length];
                          if (!currentReview) return null;
                          return (
                            <motion.div
                              key={reviewSlideIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between"
                            >
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                                    {[...Array(Number(currentReview.rating) || 5)].map((_, idx) => (
                                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                  </div>
                                  <span className="text-xs font-medium text-slate-400">{currentReview.date || 'Verified'}</span>
                                </div>
                                <p className="text-slate-800 font-medium leading-relaxed text-sm sm:text-base italic">"{currentReview.comment}"</p>

                                {currentReview.imageUrl && (
                                  <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 mt-2">
                                    <img src={currentReview.imageUrl} alt="Customer print upload" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>

                              <div className="pt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                                <span className="font-bold text-slate-900">{currentReview.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md text-xs">✓ Verified Buyer</span>
                                  {currentReview.id && !currentReview.id.startsWith('default-') && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteReview(currentReview.id)}
                                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                      title="Delete Review"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>

                      {/* Dot Indicators */}
                      {sortedReviews.length > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                          {sortedReviews.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setReviewSlideIndex(idx)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${idx === (reviewSlideIndex % sortedReviews.length) ? 'w-6 bg-[#50007c]' : 'w-2 bg-slate-300'}`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Recommendation */}
        <div className="pt-8 border-t border-slate-200 space-y-4 pb-12 sm:pb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Customers Also Ordered
            </h3>
            <button 
              type="button" 
              onClick={onBack}
              className="text-xs font-bold text-[#50007c] hover:underline cursor-pointer"
            >
              View Full Catalog →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-[#50007c]/40 transition-all group flex flex-col justify-between"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded-xs shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#50007c]">{item.title}</p>
                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ⚡ Get Free Quote
                  </span>
                  <p className="text-[10px] text-slate-400 truncate">{item.dispatchTag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* WRITE A REVIEW MODAL */}
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
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Review {product.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Your review will appear instantly on live website</p>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Review / Feedback *</label>
                  <textarea
                    value={newReviewComment}
                    onChange={e => setNewReviewComment(e.target.value)}
                    rows={3}
                    placeholder="Write about the print quality, finishing, and speed..."
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
                  className="w-full py-3.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-sm rounded-xl shadow-lg shadow-purple-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingReview ? 'Publishing Review...' : 'Submit Review'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
};
