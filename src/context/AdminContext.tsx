import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductItem, FaqItem, AboutUsItem } from '../types';
import { FAQS } from '../data/faqs';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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

interface AdminContextType {
  isAdminLoggedIn: boolean;
  currentAdminUser: AdminUser | null;
  login: (user: AdminUser) => void;
  logout: () => void;
  products: ProductItem[];
  updateProduct: (product: ProductItem) => Promise<void>;
  addProduct: (product: ProductItem) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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
  logAction: (action: string, adminName: string) => void;
  isFirebaseLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);

  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [categories, setCategories] = useState<any[]>(CATEGORIES);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [siteLogo, setSiteLogo] = useState<string>('https://img.sanishtech.com/u/5467f9a9329e92601bbe9217b2523cff.jpg');
  const [websiteImages, setWebsiteImages] = useState<WebsiteImage[]>([
    { id: 'img-1', title: 'Homepage Hero Main', section: 'Hero', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80', alt: 'Visiting Cards', enabled: true, sortOrder: 1 },
    { id: 'img-2', title: 'Outdoor Flex Banner', section: 'Hero', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', alt: 'Flex Banners', enabled: true, sortOrder: 2 }
  ]);
  const [websiteContent, setWebsiteContent] = useState({
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
    founderImageUrl: '',
    companyImageUrl: '',
    founderBio: 'Ranjan Roy founded Shivani Graphics in 1996 with a singular pledge: to give every business, creator, and individual pristine commercial print quality with personal accountability.',
    founderQuote: 'To me, printing is never just paper and ink. It is someone\'s first business card, a startup\'s pitch deck, an author\'s book, or an enterprise\'s grand banner. Since 1996, that promise has never changed.',
    seoTitle: 'Shivani Graphics · Custom Print & Signage | Delhi NCR',
    seoDescription: 'Premium commercial digital printing in Delhi NCR & Pan-India. Visiting cards, banners, standees, corporate stationery, photo frames, and customized merchandising with instant WhatsApp ordering.',
    seoKeywords: 'printing press, visiting cards, flex banners, signages, delhi ncr, shivani graphics, print shop'
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

  // Real-time Firestore onSnapshot listeners
  useEffect(() => {
    // 1. Products Listener
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const firestoreItems = snapshot.docs.map(doc => doc.data() as ProductItem);
      const firestoreIds = new Set(firestoreItems.map(p => p.id));
      const merged = [...firestoreItems];
      PRODUCTS.forEach(p => {
        if (!firestoreIds.has(p.id)) {
          merged.push(p);
          setDoc(doc(db, 'products', p.id), p).catch(() => {});
        }
      });
      setProducts(merged);
      setIsFirebaseLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'products');
    });

    // 2. Banners / Website Images Listener
    const unsubBanners = onSnapshot(collection(db, 'banners'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as WebsiteImage));
      setWebsiteImages(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'banners');
    });

    // 3. Orders Listener
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminOrder));
      setOrders(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'orders');
    });

    // 4. Invoices Listener
    const unsubInvoices = onSnapshot(collection(db, 'invoices'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as InvoiceRecord));
      setInvoices(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'invoices');
    });

    // 4b. Customers Listener
    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminCustomer));
      setCustomers(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'customers');
    });

    // 5. Quotes Listener
    const unsubQuotes = onSnapshot(collection(db, 'quotes'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as AdminQuote));
      setQuotes(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'quotes');
    });

    // 6. Reviews Listener
    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const firestoreReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as ReviewItem));
      const merged = [...firestoreReviews];
      const firestoreIds = new Set(firestoreReviews.map(r => r.id));
      INITIAL_REVIEWS.forEach(r => {
        if (!firestoreIds.has(r.id)) {
          merged.push(r);
          setDoc(doc(db, 'reviews', r.id), r).catch(() => {});
        }
      });
      setReviews(merged);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'reviews');
    });

    // 7. Coupons Listener
    const unsubCoupons = onSnapshot(collection(db, 'coupons'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as CouponItem));
      setCoupons(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'coupons');
    });

    // 8. Inventory Listener
    const unsubInventory = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as InventoryItem));
      setInventory(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'inventory');
    });

    // 8b. Categories Listener
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const firestoreCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const merged = [...firestoreCategories];
      CATEGORIES.forEach(c => {
        if (!merged.find((item: any) => item.id === c.id)) {
          merged.push(c);
          setDoc(doc(db, 'categories', c.id), c).catch(() => {});
        }
      });
      setCategories(merged);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'categories');
    });

    // 9. Website Content Listener
    const unsubContent = onSnapshot(doc(db, 'content', 'site_content'), (docSnap) => {
      if (docSnap.exists()) {
        setWebsiteContent(docSnap.data() as any);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'content/site_content');
    });

    // 10. FAQs Listener
    const unsubFaqs = onSnapshot(collection(db, 'faqs'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as FaqItem);
      setFaqs(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'faqs');
    });

    // 11. AboutUs Listener
    const unsubAboutUs = onSnapshot(collection(db, 'about_us'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as AboutUsItem);
      setAboutUs(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'about_us');
    });

    // 12. Visitor Stats Listener & Session Increment
    const unsubVisitors = onSnapshot(doc(db, 'analytics', 'visitor_stats'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as VisitorStats;
        setVisitorStats(data);
        if (!sessionStorage.getItem('shivani_visitor_tracked')) {
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
        setDoc(doc(db, 'analytics', 'visitor_stats'), initialStats).catch(() => {});
        setVisitorStats(initialStats);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'analytics/visitor_stats');
    });

    // 13. Logo Branding Listener
    const unsubLogo = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().url) {
        setSiteLogo(docSnap.data().url);
      } else {
        const defaultLogo = 'https://img.sanishtech.com/u/5467f9a9329e92601bbe9217b2523cff.jpg';
        setDoc(doc(db, 'settings', 'branding'), { url: defaultLogo }, { merge: true }).catch(() => {});
        setSiteLogo(defaultLogo);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/branding');
    });

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
      await setDoc(doc(db, 'settings', 'branding'), { url }, { merge: true });
      logAction(`Updated site logo branding`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'settings/branding');
    }
  };

  const deleteSiteLogo = async () => {
    try {
      const defaultLogo = 'https://img.sanishtech.com/u/5467f9a9329e92601bbe9217b2523cff.jpg';
      setSiteLogo(defaultLogo);
      await setDoc(doc(db, 'settings', 'branding'), { url: defaultLogo }, { merge: true });
      logAction(`Reset site logo branding to default`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, 'settings/branding');
    }
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
    try {
      setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
      await setDoc(doc(db, 'products', updatedProd.id), updatedProd, { merge: true });
      logAction(`Updated product: ${updatedProd.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `products/${updatedProd.id}`);
    }
  };

  const addProduct = async (newProd: ProductItem) => {
    try {
      setProducts(prev => [newProd, ...prev]);
      await setDoc(doc(db, 'products', newProd.id), newProd);
      logAction(`Added new product: ${newProd.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `products/${newProd.id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    const p = products.find(x => x.id === id);
    try {
      setProducts(prev => prev.filter(x => x.id !== id));
      await deleteDoc(doc(db, 'products', id));
      logAction(`Deleted product: ${p?.title || id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
    }
  };

  const updateOrderStatus = async (id: string, status: AdminOrder['status']) => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      await updateDoc(doc(db, 'orders', id), { status });
      logAction(`Updated order ${id} status to ${status}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `orders/${id}`);
    }
  };

  const saveOrder = async (order: AdminOrder) => {
    try {
      setOrders(prev => {
        const exists = prev.some(o => o.id === order.id);
        if (exists) return prev.map(o => o.id === order.id ? order : o);
        return [order, ...prev];
      });
      await setDoc(doc(db, 'orders', order.id), order, { merge: true });
      await setDoc(doc(db, 'invoices', order.id), {
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
      }, { merge: true });
      logAction(`Saved order & tracking ID: ${order.id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `orders/${order.id}`);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      setOrders(prev => prev.filter(o => o.id !== id));
      await deleteDoc(doc(db, 'orders', id));
      logAction(`Deleted order ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `orders/${id}`);
    }
  };

  const saveInvoice = async (invoice: InvoiceRecord) => {
    try {
      await setDoc(doc(db, 'invoices', invoice.id), invoice, { merge: true });
      logAction(`Saved invoice: ${invoice.id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `invoices/${invoice.id}`);
    }
  };

  const saveCustomer = async (customer: AdminCustomer) => {
    try {
      await setDoc(doc(db, 'customers', customer.id), customer, { merge: true });
      logAction(`Saved customer: ${customer.name}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `customers/${customer.id}`);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'customers', id));
      logAction(`Deleted customer ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `customers/${id}`);
    }
  };

  const updateCategory = async (category: any) => {
    try {
      await setDoc(doc(db, 'categories', category.id), category, { merge: true });
      logAction(`Updated category: ${category.label}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `categories/${category.id}`);
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'invoices', id));
      logAction(`Deleted invoice: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `invoices/${id}`);
    }
  };

  const updateQuoteStatus = async (id: string, status: AdminQuote['status'], price?: number) => {
    try {
      await updateDoc(doc(db, 'quotes', id), { status, quotedPrice: price });
      logAction(`Updated quote ${id} status to ${status}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `quotes/${id}`);
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'quotes', id));
      logAction(`Deleted quote: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `quotes/${id}`);
    }
  };

  const updateWebsiteImage = async (img: WebsiteImage) => {
    try {
      await setDoc(doc(db, 'banners', img.id), img, { merge: true });
      logAction(`Updated website image/banner: ${img.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `banners/${img.id}`);
    }
  };

  const addWebsiteImage = async (img: WebsiteImage) => {
    try {
      await setDoc(doc(db, 'banners', img.id), img);
      logAction(`Added website image/banner: ${img.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `banners/${img.id}`);
    }
  };

  const deleteWebsiteImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'banners', id));
      logAction(`Deleted website image/banner ID: ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `banners/${id}`);
    }
  };

  const updateWebsiteContent = async (content: any) => {
    try {
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
      await setDoc(doc(db, 'content', 'site_content'), content, { merge: true });
      setWebsiteContent(content);
      logAction(`Updated website CMS content`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, 'content/site_content');
    }
  };

  const addCoupon = async (c: CouponItem) => {
    try {
      await setDoc(doc(db, 'coupons', c.code), c);
      logAction(`Created coupon: ${c.code}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `coupons/${c.code}`);
    }
  };

  const updateInventory = async (id: string, qty: number) => {
    try {
      await updateDoc(doc(db, 'inventory', id), { currentStock: qty });
      logAction(`Updated inventory stock for item ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `inventory/${id}`);
    }
  };

  const toggleReviewApproval = async (id: string) => {
    const rev = reviews.find(r => r.id === id);
    if (!rev) return;
    const newStatus = !rev.approved;
    try {
      await updateDoc(doc(db, 'reviews', id), { approved: newStatus });
      logAction(`Toggled review approval for ID ${id} to ${newStatus}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `reviews/${id}`);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      logAction(`Deleted review ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `reviews/${id}`);
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
      await setDoc(doc(db, 'reviews', newRev.id), newRev);
      logAction(`Added public review by ${review.name}`, 'Customer');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `reviews/${newRev.id}`);
    }
  };

  const addFaq = async (faq: FaqItem) => {
    try {
      await setDoc(doc(db, 'faqs', faq.id), faq);
      logAction(`Added FAQ: ${faq.question}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `faqs/${faq.id}`);
    }
  };

  const updateFaq = async (faq: FaqItem) => {
    try {
      await setDoc(doc(db, 'faqs', faq.id), faq, { merge: true });
      logAction(`Updated FAQ: ${faq.question}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `faqs/${faq.id}`);
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'faqs', id));
      logAction(`Deleted FAQ ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `faqs/${id}`);
    }
  };

  const addAboutUs = async (item: AboutUsItem) => {
    try {
      await setDoc(doc(db, 'about_us', item.id), item);
      logAction(`Added About Us section: ${item.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `about_us/${item.id}`);
    }
  };

  const updateAboutUs = async (item: AboutUsItem) => {
    try {
      await setDoc(doc(db, 'about_us', item.id), item, { merge: true });
      logAction(`Updated About Us section: ${item.title}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `about_us/${item.id}`);
    }
  };

  const deleteAboutUs = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'about_us', id));
      logAction(`Deleted About Us section ID ${id}`, currentAdminUser?.name || 'Admin');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `about_us/${id}`);
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
      logAction,
      isFirebaseLoading
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
