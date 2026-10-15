import React from 'react';
import { FileText, CheckCircle, XCircle, Clock, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const QuotesView: React.FC = () => {
  const { quotes, updateQuoteStatus, deleteQuote } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Custom & Bulk Quote Inquiries ({quotes.length})</h2>
          <p className="text-xs text-slate-500">Corporate bulk printing inquiries submitted via frontend catalog & quote modal.</p>
        </div>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No quote requests yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">When corporate clients submit bulk printing or custom quote requests on the website, they will appear here instantly.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-black text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-lg">{q.id}</span>
                  <span className="text-xs font-black text-slate-900">{q.customerName}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    q.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : q.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {q.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {q.phone}
                  </span>
                  {q.email && q.email !== 'Not provided' && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {q.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {q.date}
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-bold">Product / Service: <span className="text-blue-600">{q.service}</span> · Est. Qty: <span className="text-slate-900">{q.quantity}</span></p>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">Specs / Notes: {q.specifications}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {q.status === 'Pending' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuoteStatus(q.id, 'Approved', 2500)}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      Approve Quote
                    </button>
                    <button
                      onClick={() => updateQuoteStatus(q.id, 'Rejected')}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {q.status !== 'Pending' && (
                  <button
                    onClick={() => updateQuoteStatus(q.id, 'Pending')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Reset to Pending
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this quote inquiry?')) {
                      deleteQuote(q.id);
                    }
                  }}
                  className="p-2 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                  title="Delete quote inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
