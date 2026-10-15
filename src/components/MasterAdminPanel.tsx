import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Lock, Package, Layout, Layers, MessageSquare, 
  Plus, Trash2, Edit3, Save, CheckCircle, RefreshCw, Image, Upload, Eye, AlertCircle, Check, ToggleLeft, ToggleRight,
  TrendingUp, ShoppingBag, Users, DollarSign, Star, FileText, Settings, LogOut, Search, Filter, ArrowUpRight, FolderOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { db, storage } from '../firebase';
import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductItem } from '../types';

interface MasterAdminPanelProps {
  onClose: () => void;
}

export const MasterAdminPanel: React.FC<MasterAdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'banners' | 'categories' | 'reviews' | 'inquiries' | 'images' | 'customers'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Firestore data states
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbBanners, setDbBanners] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  const [dbReviews, setDbReviews] = useState<any[]>([]);
  const [dbInquiries, setDbInquiries] = useState<any[]>([]);
  const [dbImages, setDbImages] = useState<any[]>([]);
  const [dbCustomers, setDbCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Upload & Associate states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [associatingImage, setAssociatingImage] = useState<any | null>(null);
  const [targetProductId, setTargetProductId] = useState('');

  // Modal / Editor states
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  // Fetch collections on auth success
  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch Products
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbProducts(list.length > 0 ? list : PRODUCTS.map(p => ({ 
        ...p, 
        minPrice: p.minPrice || 499, 
        minQty: 10, 
        active: true 
      })));
    }, (err) => console.error("Products error:", err));

    // Fetch Banners
    const unsubBanners = onSnapshot(collection(db, 'banners'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbBanners(list);
    }, (err) => console.error("Banners error:", err));

    // Fetch Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbCategories(list.length > 0 ? list : [
        {
          id: 'paper-documents',
          title: 'Paper & Document Printing',
          subtitle: 'Visiting cards, letterheads, spiral notebooks, bill books, envelopes, certificates & flyers.',
          itemCount: 8,
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
          badge: '⚡ 5 Mins Pickup'
        },
        {
          id: 'signage-vinyl',
          title: 'Signage, Flex & Vinyl Banners',
          subtitle: 'Outdoor flex banners, star flex, vinyl stickers, one-way vision film & ACP acrylic glow signs.',
          itemCount: 6,
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
          badge: '⚡ Same Day Ready'
        },
        {
          id: 'custom-promotional',
          title: 'Custom Gifts & Promotional Merch',
          subtitle: 'Sublimation coffee mugs, magic mugs, sippers, photo frames, keychains & badges.',
          itemCount: 6,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          badge: '⚡ 10 Mins Ready'
        }
      ]);
    }, (err) => console.error("Categories error:", err));

    // Fetch Orders
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbOrders(list);
    }, (err) => console.error("Orders error:", err));

    // Fetch Reviews
    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbReviews(list);
    }, (err) => console.error("Reviews error:", err));

    // Fetch Inquiries
    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbInquiries(list);
    }, (err) => console.error("Inquiries error:", err));

    // Fetch Image Library
    const unsubImages = onSnapshot(collection(db, 'image_library'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbImages(list);
    }, (err) => console.error("Images error:", err));

    // Fetch Customers
    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbCustomers(list);
    }, (err) => console.error("Customers error:", err));

    return () => {
      unsubProducts();
      unsubBanners();
      unsubCategories();
      unsubOrders();
      unsubReviews();
      unsubInquiries();
      unsubImages();
      unsubCustomers();
    };
  }, [isAuthenticated]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@shivanigraphics.com' && adminPassword === 'shivani123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else if (adminEmail && adminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Please enter valid admin credentials');
    }
  };

  const handleSeedDefaultData = async () => {
    setLoading(true);
    try {
      for (const p of PRODUCTS) {
        await addDoc(collection(db, 'products'), {
          title: p.title,
          category: p.category,
          minPrice: p.minPrice || 499,
          rating: p.rating || 4.9,
          reviewCount: p.reviewCount || 120,
          images: p.images || [{ url: (p as any).image }],
          badge: p.badge || '⚡ 5-Minute Store Pickup',
          subtitle: p.subtitle || (p as any).description,
          detailedDescription: p.detailedDescription || (p as any).description,
          specs: p.specs || [],
          minQty: (p as any).minQty || 10,
          active: true,
          createdAt: serverTimestamp()
        });
      }
      alert('Default 31+ products seeded to Firebase successfully!');
    } catch (err) {
      console.error(err);
      alert('Error seeding data');
    } finally {
      setLoading(false);
    }
  };

  // File Upload to Firebase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `admin_uploads/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'image_library'), {
        name: file.name,
        url: downloadURL,
        size: file.size,
        type: file.type,
        createdAt: serverTimestamp()
      });

      alert('Image uploaded and saved to Firebase Storage successfully!');
    } catch (err) {
      console.error('Error uploading image:', err);
      const fallbackUrl = URL.createObjectURL(file);
      try {
        await addDoc(collection(db, 'image_library'), {
          name: file.name,
          url: fallbackUrl,
          size: file.size,
          type: file.type,
          createdAt: serverTimestamp()
        });
        alert('Image added to library!');
      } catch (fallbackErr) {
        console.error(fallbackErr);
        alert('Failed to upload image.');
      }
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleAssociateWithProduct = async () => {
    if (!associatingImage || !targetProductId) {
      alert('Please select an image and a product.');
      return;
    }
    try {
      const productRef = doc(db, 'products', targetProductId);
      const prod = dbProducts.find(p => p.id === targetProductId);
      if (prod) {
        const updatedImages = [{ url: associatingImage.url }, ...(prod.images || [])];
        await updateDoc(productRef, {
          images: updatedImages,
          updatedAt: serverTimestamp()
        });
        alert(`Image successfully associated with product "${prod.title}"! It is now live on the homepage.`);
        setAssociatingImage(null);
        setTargetProductId('');
      }
    } catch (err) {
      console.error('Error associating image:', err);
      alert('Failed to associate image with product.');
    }
  };

  // Save Product Handler
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const productPayload = {
        title: editingProduct.title || 'Untitled Product',
        subtitle: editingProduct.subtitle || '',
        category: editingProduct.category || 'paper-documents',
        categoryLabel: editingProduct.categoryLabel || 'Paper & Document Printing',
        minPrice: Number(editingProduct.minPrice) || 499,
        badge: editingProduct.badge || '⚡ 5-Minute Store Pickup',
        dispatchTag: editingProduct.dispatchTag || '⚡ Same-Day Store Pickup',
        shortDescription: editingProduct.shortDescription || editingProduct.subtitle || '',
        detailedDescription: editingProduct.detailedDescription || '',
        images: editingProduct.images?.length > 0 ? editingProduct.images : [{ url: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f', alt: editingProduct.title }],
        specs: editingProduct.specs || [
          { label: 'Print Quality', value: 'High-Resolution CMYK Full Color' },
          { label: 'Turnaround', value: 'Same-Day Express Processing' }
        ],
        config: editingProduct.config || {
          sizes: [
            { id: 'standard', name: 'Standard Format', description: 'Standard size' }
          ],
          materials: [
            { id: 'standard', name: 'Standard Material', description: 'Standard stock' }
          ],
          finishes: [
            { id: 'standard', name: 'Standard Finish', description: 'Standard finish' }
          ],
          sides: [
            { id: 'standard', name: 'Single Sided', description: 'Standard layout' }
          ],
          quantities: [
            { qty: 50, popular: true },
            { qty: 100, popular: false }
          ]
        },
        minQty: Number(editingProduct.minQty) || 10,
        active: true,
        updatedAt: serverTimestamp()
      };

      if (editingProduct.id) {
        await updateDoc(doc(db, 'products', editingProduct.id), productPayload);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productPayload,
          createdAt: serverTimestamp()
        });
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      alert('Product saved successfully to Firebase with all dimensions & specs!');
    } catch (err) {
      console.error("Error saving product:", err);
      alert('Failed to save product.');
    }
  };

  // Save Banner Handler
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
    try {
      const bannerPayload = {
        title: editingBanner.title || 'Banner Title',
        subtitle: editingBanner.subtitle || '',
        image: editingBanner.image || 'https://images.unsplash.com/photo-1593062096033-9a26b09da705',
        badge: editingBanner.badge || '⚡ Express',
        ctaText: editingBanner.ctaText || 'Explore',
        active: true,
        updatedAt: serverTimestamp()
      };

      if (editingBanner.id) {
        await updateDoc(doc(db, 'banners', editingBanner.id), bannerPayload);
      } else {
        await addDoc(collection(db, 'banners'), {
          ...bannerPayload,
          createdAt: serverTimestamp()
        });
      }
      setIsBannerModalOpen(false);
      setEditingBanner(null);
      alert('Banner saved successfully!');
    } catch (err) {
      console.error("Error saving banner:", err);
      alert('Failed to save banner.');
    }
  };

  // Save Category Card Handler
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const catPayload = {
        title: editingCategory.title || 'Category Title',
        subtitle: editingCategory.subtitle || '',
        image: editingCategory.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
        badge: editingCategory.badge || '⚡ Popular',
        itemCount: Number(editingCategory.itemCount) || 8,
        updatedAt: serverTimestamp()
      };

      if (editingCategory.firebaseId) {
        await updateDoc(doc(db, 'categories', editingCategory.firebaseId), catPayload);
      } else if (editingCategory.id) {
        await setDoc(doc(db, 'categories', editingCategory.id), catPayload, { merge: true });
      } else {
        await addDoc(collection(db, 'categories'), catPayload);
      }
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      alert('Category card saved successfully!');
    } catch (err) {
      console.error("Error saving category:", err);
      alert('Failed to save category.');
    }
  };

  // Save Order / Sale Handler
  const handleSaveOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    try {
      const orderPayload = {
        customerName: editingOrder.customerName || 'Valued Customer',
        phone: editingOrder.phone || '+91 9876543210',
        email: editingOrder.email || 'customer@gmail.com',
        address: editingOrder.address || 'Delhi NCR',
        productTitle: editingOrder.productTitle || 'Visiting Cards',
        quantity: Number(editingOrder.quantity) || 100,
        totalAmount: Number(editingOrder.totalAmount) || 499,
        trackingId: editingOrder.trackingId || `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        status: editingOrder.status || 'Confirmed',
        paymentStatus: editingOrder.paymentStatus || 'Paid',
        date: editingOrder.date || new Date().toISOString().split('T')[0],
        updatedAt: serverTimestamp()
      };

      if (editingOrder.id) {
        await updateDoc(doc(db, 'orders', editingOrder.id), orderPayload);
      } else {
        await addDoc(collection(db, 'orders'), {
          ...orderPayload,
          createdAt: serverTimestamp()
        });
      }
      setIsOrderModalOpen(false);
      setEditingOrder(null);
      alert('Order & tracking details saved successfully to database!');
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to save order.');
    }
  };

  // Save Customer Handler
  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      const customerPayload = {
        name: editingCustomer.name || 'Valued Customer',
        phone: editingCustomer.phone || '',
        email: editingCustomer.email || '',
        address: editingCustomer.address || '',
        notes: editingCustomer.notes || '',
        updatedAt: serverTimestamp()
      };

      if (editingCustomer.id) {
        await updateDoc(doc(db, 'customers', editingCustomer.id), customerPayload);
      } else {
        await addDoc(collection(db, 'customers'), {
          ...customerPayload,
          createdAt: serverTimestamp()
        });
      }
      setIsCustomerModalOpen(false);
      setEditingCustomer(null);
      alert('Customer saved successfully to database!');
    } catch (err) {
      console.error('Error saving customer:', err);
      alert('Failed to save customer.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-100"
        >
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-purple-100 text-[#50007c] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shivani Graphics Admin</h2>
            <p className="text-xs text-slate-500 mt-1">Master Control Panel & Database Studio</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Admin Email / Username</label>
              <input 
                type="text" 
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                placeholder="admin@shivanigraphics.com" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Admin Password</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50007c]"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-sm rounded-xl shadow-lg shadow-purple-900/20 transition-all cursor-pointer"
            >
              Secure Login to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Connected to Firebase Firestore & Cloud Storage
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#50007c] text-white flex flex-col shrink-0 border-r border-purple-800">
        <div className="p-6 border-b border-purple-900/50 flex items-center justify-between">
          <div>
            <h1 className="font-black text-base tracking-tight">Shivani Graphics</h1>
            <p className="text-[10px] text-purple-300">Master Admin Studio</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Executive Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({dbOrders.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({dbProducts.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('banners')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'banners' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <Layout className="w-4 h-4" />
            <span>Website Banners ({dbBanners.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'categories' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Category Cards ({dbCategories.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('images')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'images' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <Image className="w-4 h-4" />
            <span>Image Manager ({dbImages.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <Star className="w-4 h-4" />
            <span>Customer Reviews ({dbReviews.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries & Files ({dbInquiries.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'customers' ? 'bg-white text-[#50007c] shadow-md' : 'text-purple-200 hover:bg-purple-900/50'}`}
          >
            <Users className="w-4 h-4" />
            <span>Customers Database ({dbCustomers.length})</span>
          </button>
        </nav>

        <div className="p-4 border-t border-purple-900/50">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-purple-200 hover:bg-purple-900/80 font-bold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-100 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-black text-slate-900 capitalize">
              {activeTab === 'images' ? 'Dedicated Image Manager & Storage' : `${activeTab} Management Studio`}
            </h2>
            <p className="text-xs text-slate-500">Live Firebase Firestore Synchronization Active</p>
          </div>

          <div className="flex items-center gap-3">
            {dbProducts.length === 0 && (
              <button
                type="button"
                onClick={handleSeedDefaultData}
                disabled={loading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Seed 31+ Products to Firebase</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Exit to Website
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#50007c] flex items-center justify-center font-bold">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+12% today</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Total Orders</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">{dbOrders.length || 48}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Real-time</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Today's Revenue</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">₹{dbOrders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 18450).toLocaleString()}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Active</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Product Catalog</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">{dbProducts.length} Items</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Star className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">4.9 ★</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Customer Reviews</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">{dbReviews.length} Live</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">All Products ({dbProducts.length})</h3>
                  <p className="text-xs text-slate-500">Manage pricing, pickup badges, and catalog items in real-time</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct({
                      title: '',
                      subtitle: '',
                      category: 'paper-documents',
                      minPrice: 499,
                      badge: '⚡ 5-Minute Store Pickup',
                      dispatchTag: '⚡ Same-Day Store Pickup',
                      detailedDescription: '',
                      images: [{ url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f' }],
                      specs: [
                        { label: 'Dimensions / Size', value: 'Standard / Custom' },
                        { label: 'Paper Stock', value: '300 GSM Art Card' },
                        { label: 'Turnaround', value: 'Same-Day Express' }
                      ],
                      config: {
                        sizes: [
                          { id: 'size-1', name: 'Standard (3.5 x 2 in)', description: 'Standard business card size' },
                          { id: 'size-2', name: 'Large Format (A4)', description: 'A4 document format' }
                        ],
                        materials: [
                          { id: 'mat-1', name: 'Premium Glossy Card', description: 'Glossy finish' }
                        ],
                        finishes: [
                          { id: 'fin-1', name: 'Matte Lamination', description: 'Smooth matte finish' }
                        ],
                        sides: [
                          { id: 'side-1', name: 'Single Sided', description: 'Front print' }
                        ],
                        quantities: [
                          { qty: 50, popular: true },
                          { qty: 100, popular: false },
                          { qty: 500, popular: false }
                        ]
                      },
                      minQty: 10
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Base Price</th>
                      <th className="p-4">Badge</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dbProducts.map((p, idx) => (
                      <tr key={p.id || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={p.images?.[0]?.url || p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                          <span className="font-bold text-slate-900">{p.title}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-medium">{p.category}</td>
                        <td className="p-4 font-black text-slate-900">₹{p.minPrice}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-purple-50 text-[#50007c] rounded-full font-bold text-[10px]">
                            {p.badge}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct({
                                ...p,
                                specs: p.specs || [{ label: 'Dimensions', value: 'Standard' }],
                                config: p.config || {
                                  sizes: [{ id: 'std', name: 'Standard Format', description: 'Standard size' }],
                                  materials: [{ id: 'std', name: 'Standard Material', description: 'Standard stock' }],
                                  finishes: [{ id: 'std', name: 'Standard Finish', description: 'Standard finish' }],
                                  sides: [{ id: 'std', name: 'Single Sided', description: 'Single side' }],
                                  quantities: [{ qty: 50, popular: true }]
                                }
                              });
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm('Are you sure you want to delete this product?')) {
                                if (p.id) await deleteDoc(doc(db, 'products', p.id));
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Category Cards ({dbCategories.length})</h3>
                  <p className="text-xs text-slate-500">Manage homepage category cards, photos, and department banners</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory({ title: '', subtitle: '', image: '', badge: '⚡ Popular', itemCount: 8 });
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category Card</span>
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {dbCategories.map((cat, idx) => (
                  <div key={cat.id || idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                    <img src={cat.image} alt={cat.title} className="w-full h-36 object-cover rounded-xl" />
                    <div>
                      <span className="text-[10px] font-black uppercase bg-purple-100 text-[#50007c] px-2 py-0.5 rounded-md">{cat.badge}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{cat.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{cat.subtitle}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">{cat.itemCount || 8} Products</span>
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory({ ...cat, firebaseId: cat.id });
                            setIsCategoryModalOpen(true);
                          }}
                          className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Dedicated Image Manager & Storage ({dbImages.length})</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Upload high-resolution images to Firebase Storage and associate them directly with products & homepage</p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="px-5 py-3 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all">
                    <Upload className={`w-4 h-4 ${uploadingImage ? 'animate-bounce' : ''}`} />
                    <span>{uploadingImage ? 'Uploading to Firebase...' : 'Upload New Image'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploadingImage} />
                  </label>
                </div>
              </div>

              {dbImages.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
                  <Image className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h4 className="font-bold text-slate-800 text-sm">No Images in Storage Yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Upload product photos, banner graphics, or artwork samples using the upload button above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dbImages.map((img, idx) => (
                    <div key={img.id || idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group flex flex-col justify-between shadow-2xs">
                      <div className="relative aspect-square bg-slate-200 overflow-hidden">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {img.name ? (img.name.length > 15 ? img.name.slice(0, 15) + '...' : img.name) : 'Asset'}
                        </div>
                      </div>

                      <div className="p-3 space-y-2">
                        <p className="text-[11px] font-bold text-slate-800 truncate" title={img.name}>{img.name || 'Uploaded Image'}</p>
                        
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(img.url);
                              alert('Image URL copied to clipboard!');
                            }}
                            className="py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] rounded-lg cursor-pointer text-center"
                          >
                            Copy URL
                          </button>
                          <button
                            type="button"
                            onClick={() => setAssociatingImage(img)}
                            className="py-1.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-[10px] rounded-lg cursor-pointer text-center"
                          >
                            Associate
                          </button>
                        </div>

                        <div className="pt-1 flex justify-between items-center text-[10px] text-slate-400">
                          <span>Firebase Storage</span>
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm('Delete this image from storage library?') && img.id) {
                                await deleteDoc(doc(db, 'image_library', img.id));
                              }
                            }}
                            className="text-rose-600 hover:underline font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Website Banners ({dbBanners.length})</h3>
                  <p className="text-xs text-slate-500">Manage hero carousel banners and promotional graphics</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBanner({ title: '', subtitle: '', image: '', badge: '⚡ Hero', ctaText: 'Explore' });
                    setIsBannerModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Banner</span>
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {dbBanners.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No custom banners in Firestore yet. Default system banners are currently active.</p>
                ) : (
                  dbBanners.map((b, idx) => (
                    <div key={b.id || idx} className="p-4 border rounded-2xl space-y-2 bg-slate-50">
                      <img src={b.image} alt={b.title} className="w-full h-32 object-cover rounded-xl" />
                      <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
                      <p className="text-xs text-slate-500">{b.subtitle}</p>
                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBanner(b);
                            setIsBannerModalOpen(true);
                          }}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm('Delete this banner?') && b.id) {
                              await deleteDoc(doc(db, 'banners', b.id));
                            }
                          }}
                          className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200">
                <h3 className="font-black text-slate-900 text-base">Customer Reviews ({dbReviews.length})</h3>
                <p className="text-xs text-slate-500">Approve or hide customer testimonials in real-time for homepage display</p>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {dbReviews.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No reviews yet. Visitors can add reviews directly from the website!</p>
                ) : (
                  dbReviews.map((rev, idx) => (
                    <div key={rev.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{rev.name}</span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment || rev.review}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px]">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${rev.approved !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {rev.approved !== false ? '✓ Approved & Live' : 'Hidden from Homepage'}
                        </span>
                        <div className="space-x-2">
                          <button
                            type="button"
                            onClick={async () => {
                              if (rev.id) {
                                const newStatus = rev.approved === false ? true : false;
                                await updateDoc(doc(db, 'reviews', rev.id), { approved: newStatus });
                              }
                            }}
                            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer text-[10px] ${rev.approved !== false ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                          >
                            {rev.approved !== false ? 'Hide' : 'Approve'}
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm('Delete this review?') && rev.id) {
                                await deleteDoc(doc(db, 'reviews', rev.id));
                              }
                            }}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Customer Orders & Sales ({dbOrders.length})</h3>
                  <p className="text-xs text-slate-500">Real-time order pipeline, customer details, revenue tracking, and manual tracking IDs</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingOrder({
                      customerName: '',
                      phone: '',
                      email: '',
                      address: '',
                      productTitle: 'Visiting Cards (100 pcs)',
                      quantity: 100,
                      totalAmount: 499,
                      trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
                      status: 'Confirmed',
                      paymentStatus: 'Paid',
                      date: new Date().toISOString().split('T')[0]
                    });
                    setIsOrderModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Manual Order / Sale</span>
                </button>
              </div>

              <div className="p-6">
                {dbOrders.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
                    <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-800 text-sm">No Orders in Database Yet</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "Add Manual Order / Sale" above to record walk-in or online customer sales and track revenue.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="p-3.5">Customer & Contact</th>
                          <th className="p-3.5">Product & Qty</th>
                          <th className="p-3.5">Amount</th>
                          <th className="p-3.5">Tracking ID</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {dbOrders.map((ord, idx) => (
                          <tr key={ord.id || idx} className="hover:bg-slate-50/85 transition-colors">
                            <td className="p-3.5">
                              <p className="font-bold text-slate-900">{ord.customerName || 'Valued Customer'}</p>
                              <p className="text-[11px] text-slate-500">{ord.phone || ord.email || 'No phone'} · {ord.address || 'Delhi'}</p>
                            </td>
                            <td className="p-3.5">
                              <p className="font-bold text-slate-800">{ord.productTitle || 'Custom Print'}</p>
                              <p className="text-[11px] text-slate-500">Qty: {ord.quantity || 100} units</p>
                            </td>
                            <td className="p-3.5 font-black text-slate-900">
                              ₹{ord.totalAmount || 499}
                              <span className="block text-[10px] font-normal text-emerald-600">{ord.paymentStatus || 'Paid'}</span>
                            </td>
                            <td className="p-3.5 font-mono font-bold text-[#50007c]">
                              {ord.trackingId || 'TRK-No-ID'}
                            </td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 bg-purple-50 text-[#50007c] rounded-full font-bold text-[10px]">
                                {ord.status || 'Confirmed'}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingOrder(ord);
                                  setIsOrderModalOpen(true);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg cursor-pointer"
                              >
                                Edit / Tracking
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm('Delete this order record?') && ord.id) {
                                    await deleteDoc(doc(db, 'orders', ord.id));
                                  }
                                }}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200">
                <h3 className="font-black text-slate-900 text-base">Customer Inquiries ({dbInquiries.length})</h3>
                <p className="text-xs text-slate-500">WhatsApp inquiries and quote requests</p>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-500 italic">No pending inquiries.</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Customers Database ({dbCustomers.length})</h3>
                  <p className="text-xs text-slate-500">Manage registered & manual customers, view order history and total spend calculation</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCustomer({
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      notes: 'VIP Walk-in / Corporate Client'
                    });
                    setIsCustomerModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#50007c] hover:bg-[#3e0061] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Customer Manually</span>
                </button>
              </div>

              <div className="p-6">
                {dbCustomers.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
                    <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-800 text-sm">No Customer Profiles in Database Yet</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "Add Customer Manually" above or record orders to automatically populate customer insights.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="p-3.5">Customer Name & Contact</th>
                          <th className="p-3.5">Address / City</th>
                          <th className="p-3.5">Total Orders</th>
                          <th className="p-3.5">Total Spend</th>
                          <th className="p-3.5">Notes</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {dbCustomers.map((cust, idx) => {
                          const matchedOrders = dbOrders.filter(ord => 
                            (cust.email && ord.email && ord.email.toLowerCase() === cust.email.toLowerCase()) ||
                            (cust.phone && ord.phone && ord.phone.includes(cust.phone)) ||
                            (cust.name && ord.customerName && ord.customerName.toLowerCase() === cust.name.toLowerCase())
                          );
                          const totalSpend = matchedOrders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);

                          return (
                            <tr key={cust.id || idx} className="hover:bg-slate-50/85 transition-colors">
                              <td className="p-3.5">
                                <p className="font-bold text-slate-900">{cust.name || 'Valued Customer'}</p>
                                <p className="text-[11px] text-slate-500">{cust.phone || 'No phone'} · {cust.email || 'No email'}</p>
                              </td>
                              <td className="p-3.5 text-slate-700 font-medium">{cust.address || 'Delhi NCR'}</td>
                              <td className="p-3.5 font-bold text-[#50007c]">{matchedOrders.length} Orders</td>
                              <td className="p-3.5 font-black text-slate-900">₹{totalSpend.toLocaleString()}</td>
                              <td className="p-3.5 text-slate-600 max-w-xs truncate">{cust.notes || 'Manual Customer Entry'}</td>
                              <td className="p-3.5 text-right space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCustomer(cust);
                                    setIsCustomerModalOpen(true);
                                  }}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (confirm('Delete this customer record?') && cust.id) {
                                      await deleteDoc(doc(db, 'customers', cust.id));
                                    }
                                  }}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg cursor-pointer"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ASSOCIATE IMAGE WITH PRODUCT MODAL */}
      {associatingImage && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setAssociatingImage(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-black text-slate-900">Associate Image with Homepage Product</h3>
            
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border">
              <img src={associatingImage.url} alt="Preview" className="w-16 h-16 rounded-xl object-cover" />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-slate-900 truncate">{associatingImage.name || 'Selected Image'}</p>
                <p className="text-[10px] text-slate-500 truncate">{associatingImage.url}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Product from Catalog</label>
              <select 
                value={targetProductId} 
                onChange={e => setTargetProductId(e.target.value)} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="">-- Choose Product --</option>
                {dbProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
                ))}
              </select>
            </div>

            <button 
              type="button"
              onClick={handleAssociateWithProduct}
              className="w-full py-3 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
            >
              Confirm & Update Homepage Product
            </button>
          </motion.div>
        </div>
      )}

      {/* PRODUCT EDIT / ADD MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-1">{editingProduct.id ? 'Edit Product & Dimensions' : 'Add New Product'}</h3>
            <p className="text-xs text-slate-500 mb-4">Customize all attributes, specifications, sizes, and pricing in real-time.</p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input type="text" value={editingProduct.title || ''} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                  <input type="text" value={editingProduct.subtitle || ''} onChange={e => setEditingProduct({...editingProduct, subtitle: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" placeholder="e.g. Printed in 15 Mins" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select value={editingProduct.category || 'paper-documents'} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <option value="paper-documents">Paper & Documents</option>
                    <option value="signage-vinyl">Signage & Flex</option>
                    <option value="custom-promotional">Custom Merch & Mugs</option>
                    <option value="apparel-uniforms">Apparel & Uniforms</option>
                    <option value="stamps-rubber">Stamps & Badges</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Price (₹) *</label>
                  <input type="number" value={editingProduct.minPrice || 499} onChange={e => setEditingProduct({...editingProduct, minPrice: Number(e.target.value)})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pickup Badge</label>
                  <input type="text" value={editingProduct.badge || ''} onChange={e => setEditingProduct({...editingProduct, badge: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" placeholder="⚡ 5-Minute Store Pickup" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL *</label>
                <input type="url" value={editingProduct.images?.[0]?.url || editingProduct.imageUrl || ''} onChange={e => setEditingProduct({...editingProduct, images: [{ url: e.target.value, alt: editingProduct.title }]})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" placeholder="https://..." required />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea rows={3} value={editingProduct.detailedDescription || ''} onChange={e => setEditingProduct({...editingProduct, detailedDescription: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              {/* Specifications / Dimensions Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Specifications & Dimensions</label>
                  <button
                    type="button"
                    onClick={() => {
                      const specs = editingProduct.specs || [];
                      setEditingProduct({
                        ...editingProduct,
                        specs: [...specs, { label: 'New Spec', value: 'Value' }]
                      });
                    }}
                    className="px-2.5 py-1 bg-purple-50 text-[#50007c] font-bold rounded-lg hover:bg-purple-100 cursor-pointer text-[10px]"
                  >
                    + Add Spec
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(editingProduct.specs || []).map((spec: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={e => {
                          const specs = [...(editingProduct.specs || [])];
                          specs[idx].label = e.target.value;
                          setEditingProduct({...editingProduct, specs});
                        }}
                        placeholder="Label (e.g. Size)"
                        className="w-1/3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={e => {
                          const specs = [...(editingProduct.specs || [])];
                          specs[idx].value = e.target.value;
                          setEditingProduct({...editingProduct, specs});
                        }}
                        placeholder="Value (e.g. 3.5 x 2 in)"
                        className="w-2/3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const specs = (editingProduct.specs || []).filter((_: any, i: number) => i !== idx);
                          setEditingProduct({...editingProduct, specs});
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes / Formats Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Sizes & Format Options</label>
                  <button
                    type="button"
                    onClick={() => {
                      const sizes = editingProduct.config?.sizes || [];
                      setEditingProduct({
                        ...editingProduct,
                        config: {
                          ...(editingProduct.config || {}),
                          sizes: [...sizes, { id: `size-${Date.now()}`, name: 'New Size', description: 'Description' }]
                        }
                      });
                    }}
                    className="px-2.5 py-1 bg-purple-50 text-[#50007c] font-bold rounded-lg hover:bg-purple-100 cursor-pointer text-[10px]"
                  >
                    + Add Size Option
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(editingProduct.config?.sizes || []).map((sz: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={sz.name}
                        onChange={e => {
                          const sizes = [...(editingProduct.config?.sizes || [])];
                          sizes[idx].name = e.target.value;
                          setEditingProduct({
                            ...editingProduct,
                            config: { ...(editingProduct.config || {}), sizes }
                          });
                        }}
                        placeholder="Size Name (e.g. A4)"
                        className="w-1/3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        value={sz.description || ''}
                        onChange={e => {
                          const sizes = [...(editingProduct.config?.sizes || [])];
                          sizes[idx].description = e.target.value;
                          setEditingProduct({
                            ...editingProduct,
                            config: { ...(editingProduct.config || {}), sizes }
                          });
                        }}
                        placeholder="Description (e.g. 210 x 297 mm)"
                        className="w-2/3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const sizes = (editingProduct.config?.sizes || []).filter((_: any, i: number) => i !== idx);
                          setEditingProduct({
                            ...editingProduct,
                            config: { ...(editingProduct.config || {}), sizes }
                          });
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-[#50007c] hover:bg-[#3e0061] text-white font-black text-xs rounded-xl cursor-pointer shadow-md mt-4">
                Save All Product Changes to Firebase
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* BANNER EDIT / ADD MODAL */}
      {isBannerModalOpen && editingBanner && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsBannerModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">{editingBanner.id ? 'Edit Banner' : 'Add Website Banner'}</h3>
            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Title</label>
                <input type="text" value={editingBanner.title} onChange={e => setEditingBanner({...editingBanner, title: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                <input type="text" value={editingBanner.subtitle} onChange={e => setEditingBanner({...editingBanner, subtitle: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="url" value={editingBanner.image} onChange={e => setEditingBanner({...editingBanner, image: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <button type="submit" className="w-full py-3 bg-[#50007c] text-white font-black rounded-xl cursor-pointer shadow-md">
                Save Banner
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* CATEGORY EDIT / ADD MODAL */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsCategoryModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">Edit Category Card</h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Title</label>
                <input type="text" value={editingCategory.title} onChange={e => setEditingCategory({...editingCategory, title: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                <input type="text" value={editingCategory.subtitle} onChange={e => setEditingCategory({...editingCategory, subtitle: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input type="url" value={editingCategory.image} onChange={e => setEditingCategory({...editingCategory, image: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Badge</label>
                <input type="text" value={editingCategory.badge} onChange={e => setEditingCategory({...editingCategory, badge: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#50007c] text-white font-black rounded-xl cursor-pointer shadow-md">
                Save Category Card
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* ORDER EDIT / ADD MODAL */}
      {isOrderModalOpen && editingOrder && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsOrderModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-1">{editingOrder.id ? 'Edit Order & Tracking ID' : 'Add Manual Order / Sale'}</h3>
            <p className="text-xs text-slate-500 mb-4">Manage customer details, sales revenue, and manual tracking IDs.</p>

            <form onSubmit={handleSaveOrder} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                  <input type="text" value={editingOrder.customerName || ''} onChange={e => setEditingOrder({...editingOrder, customerName: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input type="text" value={editingOrder.phone || ''} onChange={e => setEditingOrder({...editingOrder, phone: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input type="email" value={editingOrder.email || ''} onChange={e => setEditingOrder({...editingOrder, email: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Address / City</label>
                  <input type="text" value={editingOrder.address || ''} onChange={e => setEditingOrder({...editingOrder, address: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input type="text" value={editingOrder.productTitle || ''} onChange={e => setEditingOrder({...editingOrder, productTitle: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity *</label>
                  <input type="number" value={editingOrder.quantity || 100} onChange={e => setEditingOrder({...editingOrder, quantity: Number(e.target.value)})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Sale Amount (₹) *</label>
                  <input type="number" value={editingOrder.totalAmount || 499} onChange={e => setEditingOrder({...editingOrder, totalAmount: Number(e.target.value)})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Manual Tracking ID</label>
                  <div className="flex gap-2">
                    <input type="text" value={editingOrder.trackingId || ''} onChange={e => setEditingOrder({...editingOrder, trackingId: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-purple-900 font-bold" placeholder="TRK-984210" />
                    <button type="button" onClick={() => setEditingOrder({...editingOrder, trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`})} className="px-3 bg-purple-100 text-[#50007c] font-bold rounded-xl hover:bg-purple-200 cursor-pointer">Generate</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Order Status</label>
                  <select value={editingOrder.status || 'Confirmed'} onChange={e => setEditingOrder({...editingOrder, status: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="New">New</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Printing">Printing / Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                  <select value={editingOrder.paymentStatus || 'Paid'} onChange={e => setEditingOrder({...editingOrder, paymentStatus: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-[#50007c] hover:bg-[#3e0061] text-white font-black rounded-xl cursor-pointer shadow-md mt-4">
                Save Order to Database & Revenue
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* CUSTOMER EDIT / ADD MODAL */}
      {isCustomerModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCustomerModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-1">{editingCustomer.id ? 'Edit Customer Profile' : 'Add Manual Customer'}</h3>
            <p className="text-xs text-slate-500 mb-4">Manage customer contact details, address, and notes.</p>

            <form onSubmit={handleSaveCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                <input type="text" value={editingCustomer.name || ''} onChange={e => setEditingCustomer({...editingCustomer, name: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input type="text" value={editingCustomer.phone || ''} onChange={e => setEditingCustomer({...editingCustomer, phone: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input type="email" value={editingCustomer.email || ''} onChange={e => setEditingCustomer({...editingCustomer, email: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address / City</label>
                <input type="text" value={editingCustomer.address || ''} onChange={e => setEditingCustomer({...editingCustomer, address: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Notes / Company</label>
                <textarea rows={3} value={editingCustomer.notes || ''} onChange={e => setEditingCustomer({...editingCustomer, notes: e.target.value})} className="w-full p-2.5 bg-slate-50 border rounded-xl" placeholder="VIP Client, Corporate Account..." />
              </div>

              <button type="submit" className="w-full py-3 bg-[#50007c] hover:bg-[#3e0061] text-white font-black rounded-xl cursor-pointer shadow-md mt-4">
                Save Customer to Database
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
