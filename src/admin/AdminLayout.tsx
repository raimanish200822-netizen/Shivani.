import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Image, FileText, Users, CreditCard, 
  PackageOpen, Tag, Star, BarChart2, ShieldCheck, Settings, Activity, LogOut, Menu, X, ExternalLink, Layers, Database, HelpCircle, Building2, Sparkles, User, Rocket 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { LogoSettingsView } from './LogoSettingsView';
import { DashboardView } from './DashboardView';
import { ProductsView } from './ProductsView';
import { BannersImagesView } from './BannersImagesView';
import { CategoriesView } from './CategoriesView';
import { OrdersView } from './OrdersView';
import { QuotesView } from './QuotesView';
import { CmsView } from './CmsView';
import { FaqManagementView } from './FaqManagementView';
import { AboutUsManagementView } from './AboutUsManagementView';
import { InventoryView, MarketingView, ReviewsView, UsersView, AuditLogsView, DatabaseView } from './AdditionalViews';
import { InvoicesHistoryView } from './InvoicesHistoryView';
import { AnalyticsView } from './AnalyticsView';
import { CustomersView } from './CustomersView';
import { CrmOrdersView } from './CrmOrdersView';
import { FounderManagementView } from './FounderManagementView';
import { LaunchCountdownView } from './LaunchCountdownView';
import { CachedImage } from '../services/imageService';

interface AdminLayoutProps {
  onBackToWebsite: () => void;
  onNavigateFounder?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToWebsite, onNavigateFounder }) => {
  const { currentAdminUser, logout, products, invoices, siteLogo } = useAdmin();
  const [historyStack, setHistoryStack] = useState<string[]>(['dashboard']);
  const historyRef = React.useRef(historyStack);
  historyRef.current = historyStack;

  const activeTab = historyStack[historyStack.length - 1];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (tabId: string) => {
    if (tabId === 'dashboard') {
      setHistoryStack(['dashboard']);
    } else if (historyStack[historyStack.length - 1] !== tabId) {
      setHistoryStack(prev => [...prev, tabId]);
    }
  };

  const goBack = () => {
    setHistoryStack(prev => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
  };

  // Intercept browser back button within admin panel to prevent exiting the app
  React.useEffect(() => {
    window.history.pushState({ adminPanel: true }, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState({ adminPanel: true }, '', window.location.href);
      if (historyRef.current.length > 1) {
        setHistoryStack(prev => prev.length > 1 ? prev.slice(0, prev.length - 1) : prev);
      } else {
        onBackToWebsite();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBackToWebsite]);

  const navSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'analytics', label: 'Analytics (Recharts)', icon: <BarChart2 className="w-4 h-4 text-emerald-400" /> },
        { id: 'database', label: 'Database & JSON', icon: <Database className="w-4 h-4 text-orange-400" /> },
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'orders', label: 'Orders & Tracking ID', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'crm-orders', label: 'CRM Orders Pipeline', icon: <Layers className="w-4 h-4 text-orange-400" /> },
        { id: 'customers', label: 'Customer Database', icon: <Users className="w-4 h-4 text-purple-400" /> },
        { id: 'invoices', label: `Invoice History (${invoices.length})`, icon: <FileText className="w-4 h-4" /> },
        { id: 'quotes', label: 'Quote Requests', icon: <FileText className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Catalog & Banners',
      items: [
        { id: 'products', label: `Products (${products.length})`, icon: <Package className="w-4 h-4" /> },
        { id: 'logo', label: 'Logo & Branding', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
        { id: 'banners', label: 'Hero Banners', icon: <Image className="w-4 h-4" /> },
        { id: 'categories', label: 'Category Cards', icon: <Layers className="w-4 h-4" /> },
        { id: 'images', label: 'Image Library', icon: <Image className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Marketing & Stock',
      items: [
        { id: 'inventory', label: 'Inventory Stock', icon: <PackageOpen className="w-4 h-4" /> },
        { id: 'marketing', label: 'Coupons & Offers', icon: <Tag className="w-4 h-4" /> },
        { id: 'reviews', label: 'Customer Reviews', icon: <Star className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Store Launch & Live Mode',
      items: [
        { id: 'launch-countdown', label: 'Launch Countdown Mode 🚀', icon: <Rocket className="w-4 h-4 text-amber-400" /> },
      ]
    },
    {
      title: 'System & Admin',
      items: [
        { id: 'founder', label: 'Founder & Photo (Ranjan Roy)', icon: <User className="w-4 h-4 text-purple-400" /> },
        { id: 'cms', label: 'Website CMS & About Us', icon: <Settings className="w-4 h-4" /> },
        { id: 'about-us', label: 'About Us Collection', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
        { id: 'faqs', label: 'FAQ Management', icon: <HelpCircle className="w-4 h-4 text-blue-400" /> },
        { id: 'users', label: 'Admin Roles', icon: <Users className="w-4 h-4" /> },
        { id: 'audit', label: 'Activity Logs', icon: <Activity className="w-4 h-4" /> },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView onNavigateTab={(tab) => navigateTo(tab)} />;
      case 'launch-countdown': return <LaunchCountdownView />;
      case 'analytics': return <AnalyticsView />;
      case 'database': return <DatabaseView />;
      case 'orders': return <OrdersView />;
      case 'crm-orders': return <CrmOrdersView />;
      case 'customers': return <CustomersView />;
      case 'invoices': return <InvoicesHistoryView />;
      case 'products': return <ProductsView />;
      case 'logo': return <LogoSettingsView />;
      case 'banners': return <BannersImagesView />;
      case 'categories': return <CategoriesView />;
      case 'images': return <BannersImagesView />;
      case 'quotes': return <QuotesView />;
      case 'inventory': return <InventoryView />;
      case 'marketing': return <MarketingView />;
      case 'reviews': return <ReviewsView />;
      case 'founder': return <FounderManagementView onPreviewFounderPage={onNavigateFounder || onBackToWebsite} />;
      case 'cms': return <CmsView />;
      case 'about-us': return <AboutUsManagementView />;
      case 'faqs': return <FaqManagementView />;
      case 'users': return <UsersView />;
      case 'audit': return <AuditLogsView />;
      default: return <DashboardView onNavigateTab={(tab) => navigateTo(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900 selection:bg-purple-600 selection:text-white">
      
      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1 shadow-lg">
              <CachedImage src={siteLogo} fallbackSrc="/logo.jpg" alt="Shivani Graphics" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs sm:text-sm tracking-tight leading-none">
                <span className="text-white">Shivani</span> <span className="text-purple-400">Graphics</span>
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Admin Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-5 overflow-y-auto">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">{section.title}</h4>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-[#50007c] to-purple-800 text-white shadow-lg shadow-purple-950/40' 
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <button
            onClick={onBackToWebsite}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-orange-400" />
            <span>Preview Public Website</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Studio</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Drawer */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between lg:hidden sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-purple-200 flex items-center justify-center">
                <CachedImage src={siteLogo} fallbackSrc="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-sm text-slate-900">Admin Studio</span>
            </div>
          </div>
          <button onClick={logout} className="p-2 text-red-600">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex lg:hidden">
            <div className="w-72 bg-slate-900 text-slate-300 flex flex-col h-full p-4 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-white font-black text-sm">Navigation Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-5">
                {navSections.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{section.title}</h4>
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { navigateTo(item.id); setIsMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          activeTab === item.id ? 'bg-[#50007c] text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Admin Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

    </div>
  );
};
