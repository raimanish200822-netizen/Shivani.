import React, { useState } from 'react';
import { FileText, Printer, Trash2, Search, Plus, Calendar, User, Phone, CheckCircle } from 'lucide-react';
import { useAdmin, InvoiceRecord } from '../context/AdminContext';
import { InvoiceModal } from './InvoiceModal';

export const InvoicesHistoryView: React.FC = () => {
  const { invoices, deleteInvoice, saveInvoice, orders } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<any | null>(null);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual invoice form state
  const [manualForm, setManualForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    productTitle: 'Custom Commercial Print Job',
    quantity: 3,
    unitPrice: 500,
    paymentStatus: 'Paid' as const
  });

  const subtotal = Number(manualForm.quantity) * Number(manualForm.unitPrice);
  const gstAmount = subtotal * 0.18;
  const calculatedGrandTotal = subtotal + gstAmount;

  const filteredInvoices = invoices.filter(inv => 
    inv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.phone?.includes(searchTerm)
  );

  const handleCreateManualInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice: InvoiceRecord = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      invoiceNumber: `SG-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: manualForm.customerName || 'Walk-in Customer',
      phone: manualForm.phone || '9810157695',
      email: manualForm.email || 'customer@gmail.com',
      address: manualForm.address || 'New Delhi',
      productTitle: manualForm.productTitle,
      quantity: Number(manualForm.quantity),
      options: `Unit Price: ₹${manualForm.unitPrice} | 18% GST Included`,
      totalAmount: Math.round(calculatedGrandTotal * 100) / 100,
      paymentStatus: manualForm.paymentStatus,
      date: new Date().toISOString().split('T')[0]
    };

    await saveInvoice(newInvoice);
    setShowManualModal(false);
    setManualForm({
      customerName: '',
      phone: '',
      email: '',
      address: '',
      productTitle: 'Custom Commercial Print Job',
      quantity: 3,
      unitPrice: 500,
      paymentStatus: 'Paid'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Invoice History & Tax Records ({invoices.length})</h2>
          <p className="text-xs text-slate-500">View, print, download, or delete official tax invoices generated for customers and orders.</p>
        </div>
        <button
          onClick={() => setShowManualModal(true)}
          className="px-4 py-2 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> Create Manual Invoice
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-2xs">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone or invoice ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs outline-none text-slate-900 font-medium placeholder:text-slate-400"
        />
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {filteredInvoices.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#50007c] flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-900">No saved invoices found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Invoices generated from Orders or created manually will be securely stored here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black">
                  <th className="p-4">Invoice ID / No</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Service / Product</th>
                  <th className="p-4 text-center">Amount (₹)</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-black text-purple-900 font-mono">
                      {inv.id}
                    </td>
                    <td className="p-4 text-slate-600 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {inv.date || 'Today'}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{inv.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {inv.phone}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      {inv.productTitle || 'Custom Print Invoice'}
                      <div className="text-[11px] text-slate-500 font-normal">{inv.options || '18% GST Compliant'}</div>
                    </td>
                    <td className="p-4 text-center font-black text-slate-900">
                      ₹{inv.totalAmount}
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {inv.paymentStatus || 'Paid'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInvoiceForModal(inv)}
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                          title="View & Print Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete invoice ${inv.id}?`)) {
                              deleteInvoice(inv.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer transition-colors"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Invoice Modal Viewer */}
      {selectedInvoiceForModal && (
        <InvoiceModal
          order={selectedInvoiceForModal}
          onClose={() => setSelectedInvoiceForModal(null)}
        />
      )}

      {/* Manual Invoice Creation Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-black text-slate-900">Create Manual Tax Invoice</h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateManualInvoice} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={manualForm.customerName}
                  onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 9810157695"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Address / Company Location</label>
                <input
                  type="text"
                  required
                  placeholder="Mahavir Enclave, New Delhi 110045"
                  value={manualForm.address}
                  onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Service / Product Description</label>
                <input
                  type="text"
                  required
                  placeholder="Visiting Cards 350 GSM + Spot UV (500 pcs)"
                  value={manualForm.productTitle}
                  onChange={(e) => setManualForm({ ...manualForm, productTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={manualForm.quantity}
                    onChange={(e) => setManualForm({ ...manualForm, quantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={manualForm.unitPrice}
                    onChange={(e) => setManualForm({ ...manualForm, unitPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] outline-none"
                  />
                </div>
              </div>

              {/* Auto Calculator Live Summary Box */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="font-black text-[#50007c] uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>⚡ Auto-Calculator Summary</span>
                  <span>GST 18% Included</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({manualForm.quantity} × ₹{manualForm.unitPrice}):</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%):</span>
                  <span className="font-bold text-slate-900">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-purple-200">
                  <span>Grand Total:</span>
                  <span className="text-[#50007c]">₹{calculatedGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#50007c] text-white font-black rounded-xl hover:bg-purple-900 cursor-pointer shadow-md"
                >
                  Save & Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
