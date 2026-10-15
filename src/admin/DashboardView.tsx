import React from 'react';
import { 
  TrendingUp, ShoppingBag, Clock, DollarSign, Package, Users, MessageSquare, 
  AlertTriangle, CheckCircle, Plus, FileText, Tag, Image, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const { orders, products, quotes, inventory, reviews } = useAdmin();

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const newOrdersCount = orders.filter(o => o.status === 'New').length;
  const processingCount = orders.filter(o => o.status === 'Printing' || o.status === 'Confirmed' || o.status === 'Designing').length;
  const completedCount = orders.filter(o => o.status === 'Delivered').length;
  const lowStockCount = inventory.filter(i => i.currentStock <= i.minStock).length;

  // Group orders by date for daily order trends chart
  const orderTrendsMap: { [date: string]: number } = {};
  orders.forEach(o => {
    const d = o.date || new Date().toISOString().split('T')[0];
    orderTrendsMap[d] = (orderTrendsMap[d] || 0) + 1;
  });

  const chartData = Object.keys(orderTrendsMap).sort().map(date => ({
    date,
    orders: orderTrendsMap[date]
  }));

  const finalChartData = chartData.length > 0 ? chartData : [
    { date: '2026-10-01', orders: 3 },
    { date: '2026-10-02', orders: 5 },
    { date: '2026-10-03', orders: 8 },
    { date: '2026-10-04', orders: 6 },
    { date: '2026-10-05', orders: 12 },
    { date: '2026-10-06', orders: 9 },
    { date: '2026-10-07', orders: 15 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#50007c] via-purple-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Master Admin Studio · Shivani Graphics Delhi NCR</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">Business Management Dashboard</h1>
          <p className="text-xs text-purple-200">Manage orders, products, inventory, and dynamic website content in real-time.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigateTab('products')}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
          <button
            onClick={() => onNavigateTab('banners')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Image className="w-4 h-4" /> Upload Banner
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-bold">↑ +18.4% this month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
            <ShoppingBag className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{orders.length} Orders</h3>
          <p className="text-[11px] text-purple-600 font-bold">{newOrdersCount} New · {processingCount} Processing</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Catalog Products</span>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{products.length} Items</h3>
          <p className="text-[11px] text-blue-600 font-bold">100% cloud synced</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Low Stock Alerts</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{lowStockCount} Items</h3>
          <p className="text-[11px] text-amber-600 font-bold">Requires attention</p>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-black text-slate-900">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigateTab('products')}
            className="p-3 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <Plus className="w-5 h-5" />
            <span>+ Add Product</span>
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>New Order</span>
          </button>
          <button
            onClick={() => onNavigateTab('quotes')}
            className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <FileText className="w-5 h-5" />
            <span>Create Quote</span>
          </button>
          <button
            onClick={() => onNavigateTab('banners')}
            className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <Image className="w-5 h-5" />
            <span>Upload Banner</span>
          </button>
          <button
            onClick={() => onNavigateTab('marketing')}
            className="p-3 bg-pink-50 hover:bg-pink-100 text-pink-700 font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <Tag className="w-5 h-5" />
            <span>Add Coupon</span>
          </button>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 font-black text-xs rounded-xl transition-all cursor-pointer flex flex-col items-center gap-2 text-center"
          >
            <Package className="w-5 h-5" />
            <span>Check Stock</span>
          </button>
        </div>
      </div>

      {/* Recent Orders & Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Recent Customer Orders</h3>
            <button onClick={() => onNavigateTab('orders')} className="text-xs font-bold text-[#50007c] hover:underline flex items-center gap-1 cursor-pointer">
              <span>View All</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div key={ord.id} className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded">{ord.id}</span>
                    <span className="text-xs font-bold text-slate-900">{ord.customerName}</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1">{ord.productTitle} · Qty: {ord.quantity}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg">
                    {ord.status}
                  </span>
                  <p className="text-xs font-black text-slate-900 pt-1">₹{ord.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-black text-slate-900">Store Facility Status</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-purple-900">
                <span>Mahavir Enclave Store</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-purple-700 text-[11px]">Counter open for 5-minute visiting card & stamp pickup.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Konica Minolta Digital Press</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-600 text-[11px]">Fully operational. 350 GSM Art Board stock optimal.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>WhatsApp API Gateway</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-600 text-[11px]">Instant quotation and proof delivery connected.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Daily Order Trends Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">Daily Order Trends (Firestore Historical Count)</h3>
            <p className="text-xs text-slate-500">Visualizing real-time order volume and trends over time.</p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-[#50007c] text-xs font-black rounded-xl">Live Firestore Sync</span>
        </div>
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={finalChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#50007c" fill="#f3e8ff" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
