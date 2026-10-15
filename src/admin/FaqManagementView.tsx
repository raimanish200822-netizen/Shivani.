import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, Edit3, Save, X, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { FaqItem } from '../types';

export const FaqManagementView: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<FaqItem['category']>('ordering');
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('ordering');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (editingFaq) {
      await updateFaq({
        ...editingFaq,
        question,
        answer,
        category
      });
      setSuccessMsg('FAQ updated successfully in Firestore!');
    } else {
      const newId = `faq-${Date.now()}`;
      await addFaq({
        id: newId,
        question,
        answer,
        category
      });
      setSuccessMsg('New FAQ added successfully to Firestore!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">FAQ Knowledgebase Management</h2>
          <p className="text-xs text-slate-500">Add, edit, and organize frequently asked questions stored real-time in Firebase Firestore.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New FAQ
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* FAQ Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                <th className="p-4">Category</th>
                <th className="p-4">Question</th>
                <th className="p-4">Answer Snippet</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-slate-50/80">
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg uppercase tracking-wider text-[10px]">
                      {faq.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 max-w-xs">{faq.question}</td>
                  <td className="p-4 text-slate-600 max-w-sm truncate">{faq.answer}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 bg-slate-100 hover:bg-purple-100 hover:text-[#50007c] text-slate-700 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFaq(faq.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400 font-medium">
                    No FAQs found in Firestore database. Click "Add New FAQ" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
                >
                  <option value="artwork">Artwork & Files</option>
                  <option value="ordering">WhatsApp Ordering</option>
                  <option value="delivery">Delhi NCR Delivery</option>
                  <option value="corporate">GST & Corporate</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What file formats do you accept?"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Answer</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide comprehensive instructions..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
