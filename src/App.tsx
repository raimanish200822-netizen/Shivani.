import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { ProductItem, CartItem } from './types';
import { TopBanner } from './components/TopBanner';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { PrintoHomeFeed } from './components/PrintoHomeFeed';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CategoryPage } from './components/CategoryPage';
import { AboutUsPage } from './components/AboutUsPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { HelpCenter } from './components/HelpCenter';
import { Footer, PolicyRoute } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartModal } from './components/CartModal';
import { BulkQuoteModal } from './components/BulkQuoteModal';
import { CompareModal } from './components/CompareModal';
import { playWelcomeVoiceGreeting, hasBeenGreeted, isVoiceMuted } from './utils/voiceGreeting';
import { addRecentlyViewedId } from './utils/recentlyViewed';
import { useAdmin } from './context/AdminContext';

// Dedicated Separate Sub-Pages (Replacing Popups/Modals)
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { RefundPolicyPage } from './components/pages/RefundPolicyPage';
import { ArtworkGuidelinesPage } from './components/pages/ArtworkGuidelinesPage';
import { ContactPage } from './components/pages/ContactPage';

export type AppView = 
  | 'home' 
  | 'product' 
  | 'category' 
  | 'about' 
  | 'track' 
  | 'help'
  | 'admin'
  | 'terms'
  | 'privacy'
  | 'refund-policy'
  | 'artwork-guidelines'
  | 'contact';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const { products } = useAdmin();
  const [activeProductId, setActiveProductId] = useState<string>(PRODUCTS[0].id);
  const activeProduct = products.find(p => p.id === activeProductId) || products[0] || PRODUCTS[0];
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Sync view from hash / path on initial load and handle browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validViews: AppView[] = [
        'terms', 
        'privacy', 
        'refund-policy', 
        'artwork-guidelines', 
        'contact', 
        'about', 
        'track', 
        'help',
        'admin'
      ];
      if (hash === 'adminlogin') {
        setCurrentView('admin');
      } else if (validViews.includes(hash as AppView)) {
        setCurrentView(hash as AppView);
      } else if (!hash) {
        // default view remains if not navigating back to root
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Web Speech API Voice Greeting on First User Interaction (autoplay restriction compliant & once per session)
  useEffect(() => {
    const handleFirstInteraction = () => {
      playWelcomeVoiceGreeting(false);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    if (!hasBeenGreeted() && !isVoiceMuted()) {
      window.addEventListener('click', handleFirstInteraction, { passive: true });
      window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [item, ...prev]);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProduct = (product: ProductItem) => {
    addRecentlyViewedId(product.id);
    setActiveProductId(product.id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#/${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyNavigate = (route: PolicyRoute) => {
    navigateTo(route as AppView);
  };

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <AdminPanel onBackToHome={() => navigateTo('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#50007c] selection:text-white">
      
      {/* 1. Top Purple Announcement Bar */}
      <TopBanner />

      {/* 2. Main Printo-Style Navigation Header */}
      <Header
        products={products}
        selectedCategoryId={selectedCategoryId}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={handleSelectCategory}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        cartCount={cartItems.length}
        onOpenCartModal={() => setIsCartModalOpen(true)}
        onOpenStoreModal={() => navigateTo('contact')}
        onOpenHelpCenter={() => setIsHelpCenterModalOpen(true)}
        onNavigateHome={() => navigateTo('home')}
        onNavigateTrack={() => navigateTo('track')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateAdmin={() => navigateTo('admin')}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* 3. Mobile Slide-out Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedCategory={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
        products={products}
        onSelectProduct={handleSelectProduct}
        onOpenStoreModal={() => navigateTo('contact')}
        onOpenHelpCenter={() => setIsHelpCenterModalOpen(true)}
        onNavigateHome={() => navigateTo('home')}
        onNavigateTrack={() => navigateTo('track')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigatePolicy={handlePolicyNavigate}
      />

      {/* 4. Active View Rendering with Framer Motion Slide-Up Page Transitions */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={
              currentView === 'product'
                ? `product-${activeProduct.id}`
                : currentView === 'category'
                ? `category-${selectedCategoryId}`
                : currentView
            }
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1"
          >
            {/* Home Feed */}
            {currentView === 'home' && (
              <PrintoHomeFeed
                products={products}
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onOpenBulkModal={() => setIsBulkModalOpen(true)}
                onOpenStoreModal={() => navigateTo('contact')}
                onOpenArtworkGuide={() => navigateTo('artwork-guidelines')}
              />
            )}

            {/* Product Detail Subpage */}
            {currentView === 'product' && (
              <ProductDetailPage
                product={activeProduct}
                allProducts={products}
                onBack={() => navigateTo('home')}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onOpenArtworkGuide={() => navigateTo('artwork-guidelines')}
              />
            )}

            {/* Category Subpage */}
            {currentView === 'category' && (
              <CategoryPage
                categoryId={selectedCategoryId}
                products={products}
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* Dedicated Sub-Page 1: Terms of Service & 4-Hour Delivery */}
            {currentView === 'terms' && (
              <TermsPage
                onBackToHome={() => navigateTo('home')}
                onNavigateContact={() => navigateTo('contact')}
              />
            )}

            {/* Dedicated Sub-Page 2: Privacy Policy & Artwork Non-Disclosure */}
            {currentView === 'privacy' && (
              <PrivacyPage
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* Dedicated Sub-Page 3: Cancellation & 100% Free Reprint / Refund */}
            {currentView === 'refund-policy' && (
              <RefundPolicyPage
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* Dedicated Sub-Page 4: Prepress & Artwork Guidelines */}
            {currentView === 'artwork-guidelines' && (
              <ArtworkGuidelinesPage
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* Dedicated Sub-Page 5: Contact Us & Store Facility Location */}
            {currentView === 'contact' && (
              <ContactPage
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* About Us Page */}
            {currentView === 'about' && (
              <AboutUsPage
                onBackToHome={() => navigateTo('home')}
                onExploreCatalog={() => navigateTo('home')}
              />
            )}

            {/* Track Order Page */}
            {currentView === 'track' && (
              <TrackOrderPage
                onBackToHome={() => navigateTo('home')}
              />
            )}

            {/* Help Center Full Page */}
            {currentView === 'help' && (
              <div className="py-8">
                <HelpCenter isModal={false} />
              </div>
            )}


          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Printo-Style Footer with Dedicated Sub-Page Policy Routing */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenStoreModal={() => navigateTo('contact')}
        onOpenHelpCenter={() => navigateTo('help')}
        onOpenBulkModal={() => setIsBulkModalOpen(true)}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateTrack={() => navigateTo('track')}
        onNavigateAdmin={() => navigateTo('admin')}
        onNavigatePolicy={handlePolicyNavigate}
      />

      {/* 6. Round Green Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 7. Non-Disruptive Functional Utilities */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <HelpCenter
        isModal={true}
        isOpen={isHelpCenterModalOpen}
        onClose={() => setIsHelpCenterModalOpen(false)}
      />

      <BulkQuoteModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        allProducts={products}
        onSelectProduct={handleSelectProduct}
      />

    </div>
  );
}
