import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, ArrowLeft, QrCode } from 'lucide-react';
import { AdminOrder } from '../context/AdminContext';
import html2pdf from 'html2pdf.js';

interface InvoiceModalProps {
  order: AdminOrder;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById('invoice-pdf-container');
    if (!element) return;
    const opt = {
      margin: 10,
      filename: `Shivani_Graphics_Invoice_${order.id}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    (html2pdf() as any).from(element).set(opt).save();
  };

  const qty = order.quantity || 1;
  const total = order.totalAmount || 0;
  
  // Extract unit price or calculate auto
  let unitPrice = total / qty / 1.18;
  if (order.options && order.options.includes('Unit Price:')) {
    const match = order.options.match(/Unit Price:\s*₹([0-9.]+)/);
    if (match && match[1]) {
      unitPrice = Number(match[1]);
    }
  }

  const subtotal = qty * unitPrice;
  const gstTotal = subtotal * 0.18;
  const cgst = gstTotal / 2;
  const sgst = gstTotal / 2;
  const grandTotal = subtotal + gstTotal;

  return (
    <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-purple-100 text-[#50007c] hover:bg-purple-200 flex items-center gap-1.5 font-black text-xs cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#50007c] text-white flex items-center justify-center font-black text-xs">
                SG
              </div>
              <h3 className="text-sm font-black text-slate-900">Tax Invoice</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadPdf}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={onClose} className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable / Downloadable Invoice Container */}
        <div id="invoice-pdf-container" className="space-y-5 text-xs text-slate-700 p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs">
          
          {/* Company & Client Banner */}
          <div className="flex justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <p className="font-extrabold text-slate-900 uppercase tracking-wide text-xs mb-1">Billed To:</p>
              <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
              <p className="text-slate-600">{order.address || 'New Delhi, India'}</p>
              <p className="text-slate-600 font-medium">Phone: {order.phone}</p>
              {order.email && <p className="text-slate-600">Email: {order.email}</p>}
            </div>
            <div className="text-right space-y-1">
              <p className="font-extrabold text-slate-900 uppercase tracking-wide text-xs mb-1">Invoice Details:</p>
              <p><strong className="text-[#50007c]">Invoice ID:</strong> {order.id}</p>
              <p><strong className="text-[#50007c]">Date:</strong> {order.date || new Date().toISOString().split('T')[0]}</p>
              <p><strong className="text-[#50007c]">Payment:</strong> <span className="text-emerald-700 font-bold">{order.paymentStatus || 'Paid'}</span></p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-600 font-black">
                <th className="py-3 px-2">Item Description</th>
                <th className="py-3 px-2 text-center">Qty</th>
                <th className="py-3 px-2 text-right">Unit Price (₹)</th>
                <th className="py-3 px-2 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">
                  {order.productTitle || 'Custom Commercial Print Job'}
                  <div className="text-[11px] text-slate-500 font-normal">{order.options || 'Standard High-Quality Print'}</div>
                </td>
                <td className="py-3 px-2 text-center font-bold text-slate-800">{qty}</td>
                <td className="py-3 px-2 text-right font-semibold text-slate-700">₹{unitPrice.toFixed(2)}</td>
                <td className="py-3 px-2 text-right font-black text-slate-900">₹{subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Auto Calculator Summary Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-72 space-y-2 text-right bg-purple-50/40 p-4 rounded-2xl border border-purple-100">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Subtotal:</span>
                <span className="font-bold text-slate-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-semibold text-slate-700">₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-semibold text-slate-700">₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-purple-200">
                <span>Grand Total (Incl. GST):</span>
                <span className="text-[#50007c]">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* UPI & Terms Section (Replaced Bank Details) */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-[11px] text-slate-600 bg-slate-50/50 p-4 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#50007c]" /> UPI & Digital Payment
              </p>
              <p>UPI ID: <strong className="text-slate-900">shivanigraphics@paytm</strong></p>
              <p>GPay / PhonePe / Paytm: <strong className="text-slate-900">9810157695</strong></p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">✓ Verified Merchant Account</p>
            </div>
            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="font-bold text-slate-900 mb-1">Terms & Conditions:</p>
                <p className="text-[10px] text-slate-500">1. Goods once printed/customized cannot be returned.</p>
                <p className="text-[10px] text-slate-500">2. Subject to Delhi NCR jurisdiction.</p>
              </div>
              <div className="pt-2">
                <p className="font-bold text-slate-900">For Shivani Graphics</p>
                <p className="text-[10px] text-slate-400">Authorized Signatory</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 text-center space-y-0.5">
            <p className="font-bold text-slate-700">Shivani Graphics · Mahavir Enclave, New Delhi 110045 · Phone: +91-9810157695</p>
            <p>Thank you for your business! This is a computer-generated GST tax invoice.</p>
          </div>
        </div>

        {/* Bottom Close / Back Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close Invoice
          </button>
        </div>

      </div>
    </div>
  );
};

