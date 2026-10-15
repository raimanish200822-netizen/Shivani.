import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, DollarSign, Phone, Mail, MapPin, Search, Award, Trash2, Plus, Download } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const CustomersView: React.FC = () => {
  const { customers, deleteCustomer, saveCustomer, orders } = useAdmin();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('');

  // Auto-sync customers from orders if none in Firestore
  useEffect(() => {
    if (customers.length === 0 && orders.length > 0) {
      const uniqueMap = new Map();
      orders.forEach(ord => {
        const key = ord.phone || ord.customerName;
        if (!key || uniqueMap.has(key)) return;
        uniqueMap.set(key, {
          id: `cust-${ord.phone || Date.now()}`,
          name: ord.customerName || 'Valued Customer',
          phone: ord.phone || 'N/A',
          email: ord.email || 'customer@shivanigraphics.com',
          address: ord.address || 'Delhi NCR',
          createdAt: new Date().toISOString().split('T')[0]
        });
      });
      uniqueMap.forEach(c => saveCustomer(c));
    }
  }, [orders.length, customers.length]);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    const custId = `cust-${Date.now()}`;
    await saveCustomer({
      id: custId,
      name: newName,
      phone: newPhone,
      email: newEmail || 'customer@shivanigraphics.com',
      address: newAddress || 'Delhi NCR',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewAddress('');
    setShowAddModal(false);
  };

  // Build customer stats combining Firestore customer records and orders
  const customerList = customers.map(cust => {
    const custOrders = orders.filter(o => o.phone === cust.phone || o.customerName.toLowerCase() === cust.name.toLowerCase());
    const totalSpend = custOrders.reduce((acc, o) => acc + Number(o.totalAmount || 0), 0);
    const lastOrderDate = custOrders.length > 0 ? custOrders.reduce((latest, o) => o.date > latest ? o.date : latest, custOrders[0].date) : (cust.createdAt || 'N/A');
    return {
      ...cust,
      ordersCount: custOrders.length,
      totalSpend,
      lastOrderDate,
      ordersList: custOrders
    };
  }).sort((a, b) => b.totalSpend - a.totalSpend);

  const filtered = customerList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));
  const totalRevenueAll = customerList.reduce((acc, c) => acc + c.totalSpend, 0);

  const handleExportCSV = () => {
    const headers = ['ID', 'Customer Name', 'Phone', 'Email', 'Address', 'Total Orders', 'Lifetime Spend (INR)', 'Created Date', 'Last Order Date'];
    const rows = customerList.map(c => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.address.replace(/"/g, '""')}"`,
      c.ordersCount,
      c.totalSpend,
      `"${c.createdAt || 'N/A'}"`,
      `"${c.lastOrderDate}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shivani_graphics_crm_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Customer Database & CRM ({customerList.length})</h2>
          <p className="text-xs text-slate-500">Real-time Firestore customer collection with order tracking, lifetime spend, and persistence.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 text-[#50007c] px-4 py-2 rounded-2xl font-black text-xs">
            Lifetime Spend: ₹{totalRevenueAll.toLocaleString()}
          </div>
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
            title="Export all CRM data to downloadable CSV"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#50007c] hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers by name or phone number..."
          className="w-full text-xs focus:outline-none font-medium"
        />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">Add New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="e.g. +91 9810157695"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="e.g. rajesh@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address / Location</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  placeholder="e.g. Mahavir Enclave, New Delhi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#50007c] text-white font-bold cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((cust) => (
          <div key={cust.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#50007c] font-black text-xs flex items-center justify-center shrink-0">
                  {cust.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{cust.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-purple-600" /> {cust.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-purple-600" /> {cust.email}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-purple-600" /> {cust.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Total Spend</span>
                  <p className="text-base font-black text-emerald-600">₹{cust.totalSpend.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Orders</span>
                  <p className="text-base font-black text-[#50007c]">{cust.ordersCount}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete customer ${cust.name}?`)) {
                      deleteCustomer(cust.id);
                    }
                  }}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                  title="Delete Customer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {cust.ordersList.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Order History</span>
                <div className="space-y-2">
                  {cust.ordersList.map((ord, oIdx) => (
                    <div key={oIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded mr-2">{ord.id}</span>
                        <span className="font-bold text-slate-900">{ord.productTitle}</span>
                        <span className="text-slate-500 ml-2">(Qty: {ord.quantity})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">{ord.status}</span>
                        <span className="font-black text-slate-900">₹{ord.totalAmount}</span>
                        <span className="text-slate-400 text-[11px]">{ord.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
