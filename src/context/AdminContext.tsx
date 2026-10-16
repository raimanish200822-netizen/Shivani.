import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductItem, FaqItem, AboutUsItem } from '../types';
import { FAQS } from '../data/faqs';
import { db, handleFirestoreError, OperationType, isFirestoreQuotaExceeded } from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { preloadCoreBrandAssets, preloadImages, recordImageLoaded } from '../services/imageService';

export interface AdminUser {
  email: string;
  name: string;
  role: 'Super Admin' | 'Manager' | 'Staff' | 'Designer';
}

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  productTitle: string;
  quantity: number;
  options: string;
  totalAmount: number;
  status: 'New' | 'Confirmed' | 'Design Pending' | 'Designing' | 'Printing' | 'Quality Check' | 'Ready' | 'Ready for Pickup' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  files?: string[];
}

export interface AdminQuote {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  quantity: number;
  specifications: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  quotedPrice?: number;
  date: string;
}

export interface WebsiteImage {
  id: string;
  title: string;
  section: string;
  url: string;
  alt: string;
  desktopUrl?: string;
  mobileUrl?: string;
  enabled: boolean;
  sortOrder: number;
  subtitle?: string;
  badge?: string;
  minQty?: string;
  ctaText?: string;
  productId?: string;
  categoryId?: string;
}

export interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  trafficByDay: { day: string; visitors: number; inquiries: number; orders: number }[];
}

const INITIAL_REVIEWS: ReviewItem[] = [
  { id: 'rev-1', name: 'Rohan Sharma', rating: 5, review: 'Amazing quality visiting cards ready in just 5 minutes at Mahavir Enclave store!', date: '2026-10-06', approved: true },
  { id: 'rev-2', name: 'Neha Gupta', rating: 5, review: 'Best flex banner printing in Delhi NCR. Very prompt service.', date: '2026-10-07', approved: true }
];

export interface CouponItem {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  active: boolean;
}

export interface InventoryItem {
  id: string;
  item: string;
  sku: string;
  currentStock: number;
  minStock: number;
  unit: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  approved: boolean;
  photo?: string;
  authorId?: string;
}

export interface AuditLog {
  id: string;
  admin: string;
  action: string;
  date: string;
  time: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  productTitle: string;
  quantity: number;
  options?: string;
  totalAmount: number;
  paymentStatus: string;
  date: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt?: string;
}

export interface LaunchCountdownSettings {
  enabled: boolean;
  targetDate: string; // ISO format e.g. "2026-10-25T10:00:00"
  title: string;
  subtitle: string;
  badgeText: string;
  showWhatsAppButton: boolean;
  showPhoneCall: boolean;
  showStoreAddress: boolean;
  allowAdminBypass: boolean;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  currentAdminUser: AdminUser | null;
  login: (user: AdminUser) => void;
  logout: () => void;
  products: ProductItem[];
  updateProduct: (product: ProductItem) => Promise<void>;
  addProduct: (product: ProductItem) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetToDefaultProducts?: () => Promise<void>;
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: AdminOrder['status']) => Promise<void>;
  saveOrder: (order: AdminOrder) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  invoices: InvoiceRecord[];
  saveInvoice: (invoice: InvoiceRecord) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  customers: AdminCustomer[];
  saveCustomer: (customer: AdminCustomer) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  quotes: AdminQuote[];
  updateQuoteStatus: (id: string, status: AdminQuote['status'], price?: number) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
  websiteImages: WebsiteImage[];
  updateWebsiteImage: (image: WebsiteImage) => Promise<void>;
  addWebsiteImage: (image: WebsiteImage) => Promise<void>;
  deleteWebsiteImage: (id: string) => Promise<void>;
  websiteContent: {
    heroHeading: string;
    heroSubtitle: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    businessName: string;
    aboutTitle?: string;
    aboutDescription?: string;
    aboutMission?: string;
    aboutVision?: string;
    aboutStory?: string;
    aboutImageUrl?: string;
    founderName?: string;
    founderRole?: string;
    founderPhone?: string;
    founderWhatsapp?: string;
    founderImageUrl?: string;
    companyImageUrl?: string;
    founderBio?: string;
    founderQuote?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
  updateWebsiteContent: (content: any) => Promise<void>;
  faqs: FaqItem[];
  addFaq: (faq: FaqItem) => Promise<void>;
  updateFaq: (faq: FaqItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  aboutUs: AboutUsItem[];
  addAboutUs: (item: AboutUsItem) => Promise<void>;
  updateAboutUs: (item: AboutUsItem) => Promise<void>;
  deleteAboutUs: (id: string) => Promise<void>;
  coupons: CouponItem[];
  addCoupon: (coupon: CouponItem) => Promise<void>;
  inventory: InventoryItem[];
  updateInventory: (id: string, qty: number) => Promise<void>;
  reviews: ReviewItem[];
  toggleReviewApproval: (id: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  addPublicReview: (review: { name: string; rating: number; review: string; photo?: string }) => Promise<void>;
  categories: any[];
  updateCategory: (category: any) => Promise<void>;
  auditLogs: AuditLog[];
  visitorStats: VisitorStats;
  siteLogo: string;
  updateSiteLogo: (url: string) => Promise<void>;
  deleteSiteLogo: () => Promise<void>;
  launchCountdown: LaunchCountdownSettings;
  updateLaunchCountdown: (settings: LaunchCountdownSettings) => Promise<void>;
  toggleLaunchCountdown: (enabled: boolean) => Promise<void>;
  logAction: (action: string, adminName: string) => void;
  isFirebaseLoading: boolean;
  isQuotaExceeded: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);

  // Local Cache keys to eliminate 2-second flash of old images on page load
  const CACHE_KEY_LOGO = 'shivani_cached_site_logo';
  const CACHE_KEY_BANNERS = 'shivani_cached_website_images';
  const CACHE_KEY_CONTENT = 'shivani_cached_website_content';
  const CACHE_KEY_PRODUCTS = 'shivani_cached_products';

  async function apiCall(endpoint: string, method: string = 'GET', body?: any) {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn(`[API] ${method} ${endpoint} error:`, err);
    }
    return null;
  }

  const DEFAULT_LAUNCH_COUNTDOWN: LaunchCountdownSettings = {
    enabled: false,
    targetDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    title: '🚀 Shivani Graphics Digital Webstore Launching Soon!',
    subtitle: 'We are preparing Delhi NCR\'s most advanced 5-minute digital printing counter & online catalog. Stay tuned for our grand opening!',
    badgeText: 'Official Grand Opening Countdown',
    showWhatsAppButton: true,
    showPhoneCall: true,
    showStoreAddress: true,
    allowAdminBypass: true
  };

  const [launchCountdown, setLaunchCountdown] = useState<LaunchCountdownSettings>(DEFAULT_LAUNCH_COUNTDOWN);

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const rawDeleted = localStorage.getItem('shivani_deleted_product_ids');
      const deletedIds: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];
      const cached = localStorage.getItem(CACHE_KEY_PRODUCTS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(p => p && p.id && !deletedIds.includes(p.id));
        }
      }
      return PRODUCTS.filter(p => p && p.id && !deletedIds.includes(p.id));
    } catch {}
    return PRODUCTS;
  });

  const [categories, setCategories] = useState<any[]>(CATEGORIES);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);

  const [siteLogo, setSiteLogo] = useState<string>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY_LOGO);
      if (cached && cached.trim()) return cached;
    } catch {}
    return '/logo.jpg';
  });

  const [websiteImages, setWebsiteImages] = useState<WebsiteImage[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY_BANNERS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      { id: 'img-1', title: 'Homepage Hero Main', section: 'Hero', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80', alt: 'Visiting Cards', enabled: true, sortOrder: 1 },
      { id: 'img-2', title: 'Outdoor Flex Banner', section: 'Hero', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', alt: 'Flex Banners', enabled: true, sortOrder: 2 }
    ];
  });

  const [websiteContent, setWebsiteContent] = useState(() => {
    const baseContent = {
      heroHeading: 'Shivani Graphics · Printo-Style Commercial Printing',
      heroSubtitle: 'Premium digital printing, visiting cards, flex banners, 3D acrylic LED boards & corporate merch in Delhi NCR.',
      phone: '+91-9266944315',
      whatsapp: '919266944315',
      email: 'shivanidigitalprints@gmail.com',
      address: 'D3/50, Gali No. 8A, Mahavir Enclave, New Delhi, Delhi 110045',
      businessName: 'Shivani Graphics',
      aboutTitle: 'About Shivani Graphics - Delhi NCRs Premier Commercial Printing Press',
      aboutDescription: 'Established with a commitment to lightning-fast printing, superior 350 GSM card stock, and state-of-the-art Konica Minolta digital printing press in Mahavir Enclave, Delhi.',
      aboutMission: 'To provide 5-minute visiting cards, bulk flex banners, and 3D acrylic LED boards with unmatched precision and wholesale pricing.',
      aboutVision: 'To be India\'s most trusted digital print & signage partner for small businesses, agencies, and retail brands.',
      aboutStory: 'Founded in Mahavir Enclave, New Delhi, Shivani Graphics started as a boutique digital print desk and grew into a full-fledged high-speed production printing house.',
      aboutImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      founderName: 'Ranjan Roy',
      founderRole: 'Founder & Managing Director',
      founderPhone: '+91-9810157695',
      founderWhatsapp: '919810157695',
      founderImageUrl: (typeof window !== 'undefined' ? localStorage.getItem('shivani_founder_photo') : '') || '',
      companyImageUrl: (typeof window !== 'undefined' ? localStorage.getItem('shivani_company_photo') : '') || '',
      founderBio: 'Ranjan Roy founded Shivani Graphics in 1996 with a singular pledge: to give every business, creator, and individual pristine commercial print quality with personal accountability.',
      founderQuote: 'To me, printing is never just paper and ink. It is someone\'s first business card, a startup\'s pitch deck, an author\'s book, or an enterprise\'s grand banner. Since 1996, that promise has never changed.',
      seoTitle: 'Shivani Graphics · Custom Print & Signage | Delhi NCR',
      seoDescription: 'Premium commercial digital printing in Delhi NCR & Pan-India. Visiting cards, banners, standees, corporate stationery, photo frames, and customized merchandising with instant WhatsApp ordering.',
      seoKeywords: 'printing press, visiting cards, flex banners, signages, delhi ncr, shivani graphics, print shop'
    };

    try {
      const cached = localStorage.getItem(CACHE_KEY_CONTENT);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...baseContent, ...parsed };
      }
    } catch {}
    return baseContent;
  });
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'inv-1', item: '350 GSM Art Card Reams', sku: 'PAPER-350GSM', currentStock: 45, minStock: 10, unit: 'Reams' },
    { id: 'inv-2', item: 'Star Flex Vinyl Roll 340 GSM', sku: 'FLEX-340GSM', currentStock: 12, minStock: 3, unit: 'Rolls' },
    { id: 'inv-3', item: 'Matte Lamination Roll', sku: 'LAM-MATTE', currentStock: 8, minStock: 2, unit: 'Rolls' }
  ]);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQS);
  const [aboutUs, setAboutUs] = useState<AboutUsItem[]>([
    { id: 'about-1', title: '5-Min Counter & Same-Day Speed', subtitle: 'Mahavir Enclave, New Delhi', description: '5-minute counter pickup and same-day express bike courier delivery across Delhi NCR for urgent meetings and events.', sectionKey: 'mission', order: 1 },
    { id: 'about-2', title: '1200 DPI Industrial Output', subtitle: 'Heavy Art Cardboards', description: 'Heavy 350-400 GSM art cardboards, velvet touch laminations, and raised spot UV tactile embossing.', sectionKey: 'infrastructure', order: 2 }
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'log-1', admin: 'Ranjan Roy', action: 'Master Admin Studio Initialized (Firestore Realtime Sync)', date: '2026-10-07', time: '19:10' }
  ]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisitors: 4450,
    todayVisitors: 342,
    trafficByDay: [
      { day: 'Mon', visitors: 420, inquiries: 45, orders: 12 },
      { day: 'Tue', visitors: 530, inquiries: 60, orders: 18 },
      { day: 'Wed', visitors: 610, inquiries: 75, orders: 24 },
      { day: 'Thu', visitors: 580, inquiries: 68, orders: 20 },
      { day: 'Fri', visitors: 720, inquiries: 92, orders: 32 },
      { day: 'Sat', visitors: 890, inquiries: 110, orders: 45 },
      { day: 'Sun', visitors: 650, inquiries: 80, orders: 28 },
    ]
  });

  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(() => isFirestoreQuotaExceeded());

  // Real-time Firestore onSnapshot listeners + Server db.json synchronization
  useEffect(() => {
    // Preload core brand assets into session storage immediately
    preloadCoreBrandAssets(siteLogo);

    // Primary Database Sync: Hydrate all collections from server db.json first
    const syncServerDb = async () => {
      try {
        const res = await fetch('/api/db');
        if (res.ok) {
          const serverDb = await res.json();
          let deletedIds: string[] = [];
          try {
            const raw = localStorage.getItem('shivani_deleted_product_ids');
            if (raw) deletedIds = JSON.parse(raw);
          } catch {}

          if (Array.isArray(serverDb.products) && serverDb.products.length > 0) {
            const valid = serverDb.products.filter((p: any) => p && p.id && !deletedIds.includes(p.id));
            setProducts(valid);
            try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(valid)); } catch {}
          }
          if (Array.isArray(serverDb.categories) && serverDb.categories.length > 0) {
            setCategories(serverDb.categories);
          }
          if (Array.isArray(serverDb.banners) && serverDb.banners.length > 0) {
            setWebsiteImages(serverDb.banners);
          }
          if (serverDb.content) {
            setWebsiteContent((prev: any) => ({ ...prev, ...serverDb.content }));
          }
          if (serverDb.settings?.branding?.url) {
            setSiteLogo(serverDb.settings.branding.url);
          }
          if (Array.isArray(serverDb.orders)) setOrders(serverDb.orders);
          if (Array.isArray(serverDb.quotes)) setQuotes(serverDb.quotes);
          if (Array.isArray(serverDb.invoices)) setInvoices(serverDb.invoices);
          if (Array.isArray(serverDb.customers)) setCustomers(serverDb.customers);
          if (Array.isArray(serverDb.faqs) && serverDb.faqs.length > 0) setFaqs(serverDb.faqs);
          if (Array.isArray(serverDb.about_us) && serverDb.about_us.length > 0) setAboutUs(serverDb.about_us);
          if (Array.isArray(serverDb.inventory) && serverDb.inventory.length > 0) setInventory(serverDb.inventory);
          if (Array.isArray(serverDb.reviews) && serverDb.reviews.length > 0) setReviews(serverDb.reviews);
          if (Array.isArray(serverDb.coupons)) setCoupons(serverDb.coupons);
        }
      } catch (err) {
        console.warn('[AdminContext] Server DB fetch notice:', err);
      } finally {
        setIsFirebaseLoading(false);
      }
    };
    syncServerDb();

    // If quota was already hit today, run in offline local cache mode without throwing
    if (isFirestoreQuotaExceeded()) {
      setIsQuotaExceeded(true);
      setIsFirebaseLoading(false);
      console.warn('[AdminContext] Running in Local Storage / Offline Cache mode (Firestore quota limit).');
      return;
    }

    const onListenerError = (path: string) => (error: any) => {
      const err = handleFirestoreError(error, OperationType.GET, path);
      if (err?.code === 'resource-exhausted' || isFirestoreQuotaExceeded()) {
        setIsQuotaExceeded(true);
      }
      setIsFirebaseLoading(false);
    };

    // 1. Products Listener (Source of Truth: Firestore, Deleted items stay deleted)
    const unsubProducts = onSnapshot(collection(db, 'products'), async (snapshot) => {
      let deletedIds: string[] = [];
      try {
        const raw = localStorage.getItem('shivani_deleted_product_ids');
        if (raw) deletedIds = JSON.parse(raw);
      } catch {}

      if (snapshot.empty) {
        try {
          const initDoc = await getDoc(doc(db, 'settings', 'catalog_init'));
          if (!initDoc || !initDoc.exists()) {
            const initialSeed = PRODUCTS.filter(p => !deletedIds.includes(p.id));
            for (const p of initialSeed) {
              setDoc(doc(db, 'products', p.id), p).catch(() => {});
            }
            await setDoc(doc(db, 'settings', 'catalog_init'), { initialized: true, date: new Date().toISOString() }).catch(() => {});
            setProducts(initialSeed);
            try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(initialSeed)); } catch {}
            setIsFirebaseLoading(false);
            return;
          }
        } catch {
          // In case settings check errors, don't block
        }
      }

      const firestoreItems = snapshot.docs
        .map(doc => doc.data() as ProductItem)
        .filter(p => p && p.id && !deletedIds.includes(p.id));

      if (firestoreItems.length > 0) {
        setProducts(firestoreItems);
        try {
          localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(firestoreItems));
        } catch {}
        preloadImages(firestoreItems.slice(0, 10).map(p => p.images?.[0]?.url));
      }
      setIsFirebaseLoading(false);
    }, onListenerError('products'));

    // 2. Banners / Website Images Listener
    const unsubBanners = onSnapshot(collection(db, 'banners'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as WebsiteImage));
      if (items.length > 0) {
        setWebsiteImages(items);
        try {
          localStorage.setItem(CACHE_KEY_BANNERS, JSON.stringify(items));
        } catch {}
        preloadImages(items.map(b => b.url));
      }
    }, onListenerError('banners'));

    // 3. Orders Listener
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminOrder));
      if (items.length > 0) {
        setOrders(items);
      }
    }, onListenerError('orders'));

    // 4. Invoices Listener
    const unsubInvoices = onSnapshot(collection(db, 'invoices'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as InvoiceRecord));
      if (items.length > 0) {
        setInvoices(items);
      }
    }, onListenerError('invoices'));

    // 4b. Customers Listener
    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminCustomer));
      if (items.length > 0) {
        setCustomers(items);
      }
    }, onListenerError('customers'));

    // 5. Quotes Listener
    const unsubQuotes = onSnapshot(collection(db, 'quotes'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminQuote));
      if (items.length > 0) {
        setQuotes(items);
      }
    }, onListenerError('quotes'));

    // 6. Reviews Listener (Deleted reviews stay deleted)
    const unsubReviews = onSnapshot(collection(db, 'reviews'), async (snapshot) => {
      if (snapshot.empty) {
        try {
          const initDoc = await getDoc(doc(db, 'settings', 'reviews_init'));
          if (!initDoc || !initDoc.exists()) {
            for (const r of INITIAL_REVIEWS) {
              setDoc(doc(db, 'reviews', r.id), r).catch(() => {});
            }
            await setDoc(doc(db, 'settings', 'reviews_init'), { initialized: true }).catch(() => {});
            setReviews(INITIAL_REVIEWS);
            return;
          }
        } catch {}
      }
      const firestoreReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as ReviewItem));
      if (firestoreReviews.length > 0) {
        setReviews(firestoreReviews);
      }
    }, onListenerError('reviews'));

    // 7. Coupons Listener
    const unsubCoupons = onSnapshot(collection(db, 'coupons'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as CouponItem));
      if (items.length > 0) {
        setCoupons(items);
      }
    }, onListenerError('coupons'));

    // 8. Inventory Listener
    const unsubInventory = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as InventoryItem));
      if (items.length > 0) {
        setInventory(items);
      }
    }, onListenerError('inventory'));

    // 8b. Categories Listener (Deleted categories stay deleted)
    const unsubCategories = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      if (snapshot.empty) {
        try {
          const initDoc = await getDoc(doc(db, 'settings', 'categories_init'));
          if (!initDoc || !initDoc.exists()) {
            for (const c of CATEGORIES) {
              setDoc(doc(db, 'categories', c.id), c).catch(() => {});
            }
            await setDoc(doc(db, 'settings', 'categories_init'), { initialized: true }).catch(() => {});
            setCategories(CATEGORIES);
            return;
          }
        } catch {}
      }
      const firestoreCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (firestoreCategories.length > 0) {
        setCategories(firestoreCategories);
      }
    }, onListenerError('categories'));

    // 9. Website Content Listener
    const unsubContent = onSnapshot(doc(db, 'content', 'site_content'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        setWebsiteContent(data);
        try {
          localStorage.setItem(CACHE_KEY_CONTENT, JSON.stringify(data));
          if (data.founderImageUrl) localStorage.setItem('shivani_founder_photo', data.founderImageUrl);
          if (data.companyImageUrl) localStorage.setItem('shivani_company_photo', data.companyImageUrl);
        } catch {}
      }
    }, onListenerError('content/site_content'));

    // 10. FAQs Listener
    const unsubFaqs = onSnapshot(collection(db, 'faqs'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as FaqItem);
      if (items.length > 0) {
        setFaqs(items);
      }
    }, onListenerError('faqs'));

    // 11. AboutUs Listener
    const unsubAboutUs = onSnapshot(collection(db, 'about_us'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as AboutUsItem);
      if (items.length > 0) {
        setAboutUs(items);
      }
    }, onListenerError('about_us'));

    // 12. Visitor Stats Listener & Session Increment
    const unsubVisitors = onSnapshot(doc(db, 'analytics', 'visitor_stats'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as VisitorStats;
        setVisitorStats(data);
        if (!sessionStorage.getItem('shivani_visitor_tracked') && !isFirestoreQuotaExceeded()) {
          sessionStorage.setItem('shivani_visitor_tracked', 'true');
          const newTotal = (data.totalVisitors || 4450) + 1;
          const newToday = (data.todayVisitors || 342) + 1;
          setDoc(doc(db, 'analytics', 'visitor_stats'), {
            ...data,
            totalVisitors: newTotal,
            todayVisitors: newToday
          }, { merge: true }).catch(() => {});
        }
      } else {
        const initialStats: VisitorStats = {
          totalVisitors: 4450,
          todayVisitors: 342,
          trafficByDay: [
            { day: 'Mon', visitors: 420, inquiries: 45, orders: 12 },
            { day: 'Tue', visitors: 530, inquiries: 60, orders: 18 },
            { day: 'Wed', visitors: 610, inquiries: 75, orders: 24 },
            { day: 'Thu', visitors: 580, inquiries: 68, orders: 20 },
            { day: 'Fri', visitors: 720, inquiries: 92, orders: 32 },
            { day: 'Sat', visitors: 890, inquiries: 110, orders: 45 },
            { day: 'Sun', visitors: 650, inquiries: 80, orders: 28 },
          ]
        };
        if (!isFirestoreQuotaExceeded()) {
          setDoc(doc(db, 'analytics', 'visitor_stats'), initialStats).catch(() => {});
        }
        setVisitorStats(initialStats);
      }
    }, onListenerError('analytics/visitor_stats'));

    // 13. Logo Branding Listener
    const unsubLogo = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().url) {
        const logoUrl = docSnap.data().url;
        setSiteLogo(logoUrl);
        recordImageLoaded(logoUrl);
        try {
          localStorage.setItem(CACHE_KEY_LOGO, logoUrl);
        } catch {}
      } else {
        const defaultLogo = '/logo.jpg';
        recordImageLoaded(defaultLogo);
        if (!isFirestoreQuotaExceeded()) {
          setDoc(doc(db, 'settings', 'branding'), { url: defaultLogo }, { merge: true }).catch(() => {});
        }
        setSiteLogo(defaultLogo);
      }
    }, onListenerError('settings/branding'));

    return () => {
      unsubProducts();
      unsubBanners();
      unsubOrders();
      unsubInvoices();
      unsubCustomers();
      unsubQuotes();
      unsubReviews();
      unsubCoupons();
      unsubInventory();
      unsubContent();
      unsubFaqs();
      unsubAboutUs();
      unsubVisitors();
      unsubLogo();
    };
  }, []);

  const updateSiteLogo = async (url: string) => {
    try {
      setSiteLogo(url);
      recordImageLoaded(url);
      try {
        localStorage.setItem(CACHE_KEY_LOGO, url);
      } catch {}
      await apiCall('/api/settings', 'POST', { id: 'branding', url });
      await apiCall('/api/content', 'POST', { siteLogo: url });
      try {
        await setDoc(doc(db, 'settings', 'branding'), { url }, { merge: true });
      } catch {}
      logAction(`Updated site logo branding`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateSiteLogo notice', e);
    }
  };

  const deleteSiteLogo = async () => {
    try {
      const defaultLogo = '/logo.jpg';
      setSiteLogo(defaultLogo);
      try {
        localStorage.removeItem(CACHE_KEY_LOGO);
      } catch {}
      await apiCall('/api/settings', 'POST', { id: 'branding', url: defaultLogo });
      try {
        await setDoc(doc(db, 'settings', 'branding'), { url: defaultLogo }, { merge: true });
      } catch {}
      logAction(`Reset site logo branding to default`, currentAdminUser?.name || 'Admin');
    } catch (e) {}
  };

  const updateLaunchCountdown = async (settings: LaunchCountdownSettings) => {
    setLaunchCountdown({ ...settings, enabled: false });
    logAction(`Launch Countdown Disabled`, currentAdminUser?.name || 'Admin');
  };

  const toggleLaunchCountdown = async (_enabled: boolean) => {
    setLaunchCountdown(prev => ({ ...prev, enabled: false }));
  };

  const login = (user: AdminUser) => {
    setIsAdminLoggedIn(true);
    setCurrentAdminUser(user);
    logAction(`Logged in as ${user.role} (${user.email})`, user.name);
  };

  const logout = () => {
    if (currentAdminUser) logAction(`Logged out`, currentAdminUser.name);
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
  };

  const logAction = (action: string, adminName: string) => {
    const now = new Date();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      admin: adminName,
      action,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateProduct = async (updatedProd: ProductItem) => {
    console.log(`[Admin] Updating product ${updatedProd.id} (${updatedProd.title})...`);
    // 1. Immediately update state & cache
    setProducts(prev => {
      const next = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(next)); } catch {}
      return next;
    });
    logAction(`Updated product: ${updatedProd.title}`, currentAdminUser?.name || 'Admin');

    // 2. Persist to server db.json via API
    await apiCall(`/api/products/${updatedProd.id}`, 'PUT', updatedProd);

    // 3. Sync to Firestore if available
    try {
      await setDoc(doc(db, 'products', updatedProd.id), updatedProd, { merge: true });
    } catch (e) {}
  };

  const addProduct = async (newProd: ProductItem) => {
    console.log(`[Admin] Adding new product ${newProd.id} (${newProd.title})...`);
    try {
      const raw = localStorage.getItem('shivani_deleted_product_ids');
      if (raw) {
        const deleted: string[] = JSON.parse(raw);
        const filtered = deleted.filter(x => x !== newProd.id);
        localStorage.setItem('shivani_deleted_product_ids', JSON.stringify(filtered));
      }
    } catch {}

    setProducts(prev => {
      const next = [newProd, ...prev.filter(p => p.id !== newProd.id)];
      try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(next)); } catch {}
      return next;
    });
    logAction(`Added new product: ${newProd.title}`, currentAdminUser?.name || 'Admin');

    // 2. Persist to server db.json via API
    await apiCall('/api/products', 'POST', newProd);

    // 3. Sync to Firestore if available
    try {
      await setDoc(doc(db, 'products', newProd.id), newProd);
    } catch (e) {}
  };

  const deleteProduct = async (id: string) => {
    const p = products.find(x => x.id === id);
    console.log(`[Admin] Deleting product ${id} (${p?.title || 'Unknown'})...`);
    // 1. Immediately remove from active state
    setProducts(prev => {
      const next = prev.filter(x => x.id !== id);
      try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(next)); } catch {}
      return next;
    });

    // 2. Track permanently in localStorage
    try {
      const raw = localStorage.getItem('shivani_deleted_product_ids');
      const deleted: string[] = raw ? JSON.parse(raw) : [];
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem('shivani_deleted_product_ids', JSON.stringify(deleted));
      }
    } catch {}

    logAction(`Deleted product: ${p?.title || id}`, currentAdminUser?.name || 'Admin');

    // 3. Persist to server db.json via API
    await apiCall(`/api/products/${id}`, 'DELETE');

    // 4. Delete from Firestore if available
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {}
  };

  const resetToDefaultProducts = async () => {
    console.log('[Admin] Resetting product catalog to default templates...');
    localStorage.removeItem('shivani_deleted_product_ids');
    setProducts(PRODUCTS);
    try { localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(PRODUCTS)); } catch {}
    logAction(`Reset products catalog to default templates`, currentAdminUser?.name || 'Admin');

    await apiCall('/api/products/reset', 'POST');

    try {
      for (const p of PRODUCTS) {
        setDoc(doc(db, 'products', p.id), p).catch(() => {});
      }
    } catch (e) {}
  };

  const updateOrderStatus = async (id: string, status: AdminOrder['status']) => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      await apiCall(`/api/orders/${id}`, 'POST', { id, status });
      try { await updateDoc(doc(db, 'orders', id), { status }); } catch {}
      logAction(`Updated order ${id} status to ${status}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateOrderStatus error:', e);
    }
  };

  const saveOrder = async (order: AdminOrder) => {
    try {
      setOrders(prev => {
        const exists = prev.some(o => o.id === order.id);
        if (exists) return prev.map(o => o.id === order.id ? order : o);
        return [order, ...prev];
      });
      await apiCall(`/api/orders/${order.id}`, 'POST', order);
      await apiCall(`/api/invoices/${order.id}`, 'POST', {
        id: order.id,
        invoiceNumber: `INV-${order.id}`,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email,
        address: order.address,
        productTitle: order.productTitle,
        quantity: order.quantity,
        options: order.options,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        date: order.date
      });
      try {
        await setDoc(doc(db, 'orders', order.id), order, { merge: true });
      } catch {}
      logAction(`Saved order & tracking ID: ${order.id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('saveOrder error:', e);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      setOrders(prev => prev.filter(o => o.id !== id));
      await apiCall(`/api/orders/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'orders', id)); } catch {}
      logAction(`Deleted order ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteOrder error:', e);
    }
  };

  const saveInvoice = async (invoice: InvoiceRecord) => {
    try {
      setInvoices(prev => {
        const exists = prev.some(i => i.id === invoice.id);
        if (exists) return prev.map(i => i.id === invoice.id ? invoice : i);
        return [invoice, ...prev];
      });
      await apiCall(`/api/invoices/${invoice.id}`, 'POST', invoice);
      try { await setDoc(doc(db, 'invoices', invoice.id), invoice, { merge: true }); } catch {}
      logAction(`Saved invoice: ${invoice.id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('saveInvoice error:', e);
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      setInvoices(prev => prev.filter(i => i.id !== id));
      await apiCall(`/api/invoices/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'invoices', id)); } catch {}
      logAction(`Deleted invoice: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteInvoice error:', e);
    }
  };

  const saveCustomer = async (customer: AdminCustomer) => {
    try {
      setCustomers(prev => {
        const exists = prev.some(c => c.id === customer.id);
        if (exists) return prev.map(c => c.id === customer.id ? customer : c);
        return [customer, ...prev];
      });
      await apiCall(`/api/customers/${customer.id}`, 'POST', customer);
      try { await setDoc(doc(db, 'customers', customer.id), customer, { merge: true }); } catch {}
      logAction(`Saved customer: ${customer.name}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('saveCustomer error:', e);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      setCustomers(prev => prev.filter(c => c.id !== id));
      await apiCall(`/api/customers/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'customers', id)); } catch {}
      logAction(`Deleted customer ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteCustomer error:', e);
    }
  };

  const updateCategory = async (category: any) => {
    try {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
      await apiCall(`/api/categories/${category.id}`, 'POST', category);
      try { await setDoc(doc(db, 'categories', category.id), category, { merge: true }); } catch {}
      logAction(`Updated category: ${category.label || category.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateCategory error:', e);
    }
  };

  const updateQuoteStatus = async (id: string, status: AdminQuote['status'], price?: number) => {
    try {
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status, quotedPrice: price } : q));
      await apiCall(`/api/quotes/${id}`, 'POST', { id, status, quotedPrice: price });
      try { await updateDoc(doc(db, 'quotes', id), { status, quotedPrice: price }); } catch {}
      logAction(`Updated quote ${id} status to ${status}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateQuoteStatus error:', e);
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      setQuotes(prev => prev.filter(q => q.id !== id));
      await apiCall(`/api/quotes/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'quotes', id)); } catch {}
      logAction(`Deleted quote: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteQuote error:', e);
    }
  };

  const updateWebsiteImage = async (img: WebsiteImage) => {
    try {
      setWebsiteImages(prev => {
        const next = prev.map(b => b.id === img.id ? img : b);
        try { localStorage.setItem(CACHE_KEY_BANNERS, JSON.stringify(next)); } catch {}
        return next;
      });
      await apiCall(`/api/banners/${img.id}`, 'POST', img);
      try { await setDoc(doc(db, 'banners', img.id), img, { merge: true }); } catch {}
      logAction(`Updated website image/banner: ${img.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateWebsiteImage error:', e);
    }
  };

  const addWebsiteImage = async (img: WebsiteImage) => {
    try {
      setWebsiteImages(prev => {
        const next = [img, ...prev];
        try { localStorage.setItem(CACHE_KEY_BANNERS, JSON.stringify(next)); } catch {}
        return next;
      });
      await apiCall(`/api/banners`, 'POST', img);
      try { await setDoc(doc(db, 'banners', img.id), img); } catch {}
      logAction(`Added website image/banner: ${img.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('addWebsiteImage error:', e);
    }
  };

  const deleteWebsiteImage = async (id: string) => {
    try {
      setWebsiteImages(prev => {
        const next = prev.filter(b => b.id !== id);
        try { localStorage.setItem(CACHE_KEY_BANNERS, JSON.stringify(next)); } catch {}
        return next;
      });
      await apiCall(`/api/banners/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'banners', id)); } catch {}
      logAction(`Deleted website image/banner ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteWebsiteImage error:', e);
    }
  };

  const updateWebsiteContent = async (content: any) => {
    try {
      try {
        localStorage.setItem(CACHE_KEY_CONTENT, JSON.stringify(content));
      } catch {}
      if (content.founderImageUrl !== undefined) {
        if (content.founderImageUrl) {
          localStorage.setItem('shivani_founder_photo', content.founderImageUrl);
        } else {
          localStorage.removeItem('shivani_founder_photo');
        }
      }
      if (content.companyImageUrl !== undefined) {
        if (content.companyImageUrl) {
          localStorage.setItem('shivani_company_photo', content.companyImageUrl);
        } else {
          localStorage.removeItem('shivani_company_photo');
        }
      }
      setWebsiteContent(content);
      await apiCall('/api/content', 'POST', content);
      try { await setDoc(doc(db, 'content', 'site_content'), content, { merge: true }); } catch {}
      logAction(`Updated website CMS content`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateWebsiteContent error:', e);
    }
  };

  const addCoupon = async (c: CouponItem) => {
    try {
      setCoupons(prev => [...prev.filter(item => item.code !== c.code), c]);
      await apiCall(`/api/coupons/${c.code}`, 'POST', c);
      try { await setDoc(doc(db, 'coupons', c.code), c); } catch {}
      logAction(`Created coupon: ${c.code}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('addCoupon error:', e);
    }
  };

  const updateInventory = async (id: string, qty: number) => {
    try {
      setInventory(prev => prev.map(inv => inv.id === id ? { ...inv, currentStock: qty } : inv));
      await apiCall(`/api/inventory/${id}`, 'POST', { id, currentStock: qty });
      try { await updateDoc(doc(db, 'inventory', id), { currentStock: qty }); } catch {}
      logAction(`Updated inventory stock for item ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateInventory error:', e);
    }
  };

  const toggleReviewApproval = async (id: string) => {
    const rev = reviews.find(r => r.id === id);
    if (!rev) return;
    const newStatus = !rev.approved;
    try {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: newStatus } : r));
      await apiCall(`/api/reviews/${id}`, 'POST', { id, approved: newStatus });
      try { await updateDoc(doc(db, 'reviews', id), { approved: newStatus }); } catch {}
      logAction(`Toggled review approval for ID ${id} to ${newStatus}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('toggleReviewApproval error:', e);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      setReviews(prev => prev.filter(r => r.id !== id));
      await apiCall(`/api/reviews/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'reviews', id)); } catch {}
      logAction(`Deleted review ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteReview error:', e);
    }
  };

  const addPublicReview = async (review: { name: string; rating: number; review: string; photo?: string }) => {
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: review.name,
      rating: review.rating,
      review: review.review,
      date: new Date().toISOString().split('T')[0],
      approved: true,
      photo: review.photo
    };
    try {
      setReviews(prev => [newRev, ...prev]);
      await apiCall('/api/reviews', 'POST', newRev);
      try { await setDoc(doc(db, 'reviews', newRev.id), newRev); } catch {}
      logAction(`Added public review by ${review.name}`, 'Customer');
    } catch (e) {
      console.warn('addPublicReview error:', e);
    }
  };

  const addFaq = async (faq: FaqItem) => {
    try {
      setFaqs(prev => [...prev.filter(f => f.id !== faq.id), faq]);
      await apiCall('/api/faqs', 'POST', faq);
      try { await setDoc(doc(db, 'faqs', faq.id), faq); } catch {}
      logAction(`Added FAQ: ${faq.question}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('addFaq error:', e);
    }
  };

  const updateFaq = async (faq: FaqItem) => {
    try {
      setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
      await apiCall(`/api/faqs/${faq.id}`, 'POST', faq);
      try { await setDoc(doc(db, 'faqs', faq.id), faq, { merge: true }); } catch {}
      logAction(`Updated FAQ: ${faq.question}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateFaq error:', e);
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      setFaqs(prev => prev.filter(f => f.id !== id));
      await apiCall(`/api/faqs/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'faqs', id)); } catch {}
      logAction(`Deleted FAQ ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteFaq error:', e);
    }
  };

  const addAboutUs = async (item: AboutUsItem) => {
    try {
      setAboutUs(prev => [...prev.filter(a => a.id !== item.id), item]);
      await apiCall('/api/about_us', 'POST', item);
      try { await setDoc(doc(db, 'about_us', item.id), item); } catch {}
      logAction(`Added About Us section: ${item.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('addAboutUs error:', e);
    }
  };

  const updateAboutUs = async (item: AboutUsItem) => {
    try {
      setAboutUs(prev => prev.map(a => a.id === item.id ? item : a));
      await apiCall(`/api/about_us/${item.id}`, 'POST', item);
      try { await setDoc(doc(db, 'about_us', item.id), item, { merge: true }); } catch {}
      logAction(`Updated About Us section: ${item.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('updateAboutUs error:', e);
    }
  };

  const deleteAboutUs = async (id: string) => {
    try {
      setAboutUs(prev => prev.filter(a => a.id !== id));
      await apiCall(`/api/about_us/${id}`, 'DELETE');
      try { await deleteDoc(doc(db, 'about_us', id)); } catch {}
      logAction(`Deleted About Us section ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      console.warn('deleteAboutUs error:', e);
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      currentAdminUser,
      login,
      logout,
      products,
      updateProduct,
      addProduct,
      deleteProduct,
      resetToDefaultProducts,
      orders,
      updateOrderStatus,
      saveOrder,
      deleteOrder,
      invoices,
      saveInvoice,
      deleteInvoice,
      customers,
      saveCustomer,
      deleteCustomer,
      quotes,
      updateQuoteStatus,
      deleteQuote,
      websiteImages,
      updateWebsiteImage,
      addWebsiteImage,
      deleteWebsiteImage,
      websiteContent,
      updateWebsiteContent,
      faqs,
      addFaq,
      updateFaq,
      deleteFaq,
      aboutUs,
      addAboutUs,
      updateAboutUs,
      deleteAboutUs,
      coupons,
      addCoupon,
      inventory,
      updateInventory,
      reviews,
      toggleReviewApproval,
      deleteReview,
      addPublicReview,
      categories,
      updateCategory,
      auditLogs,
      visitorStats,
      siteLogo,
      updateSiteLogo,
      deleteSiteLogo,
      launchCountdown,
      updateLaunchCountdown,
      toggleLaunchCountdown,
      logAction,
      isFirebaseLoading,
      isQuotaExceeded
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};
