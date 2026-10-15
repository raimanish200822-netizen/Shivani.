import React, { useState } from 'react';
import { Building2, Plus, Trash2, Edit3, Check, X, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AboutUsItem } from '../types';

export const AboutUsManagementView: React.FC = () => {
  const { aboutUs, addAboutUs, updateAboutUs, deleteAboutUs } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AboutUsItem | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [sectionKey, setSectionKey] = useState('mission');
  const [imageUrl, setImageUrl] = useState('');
  const [order, setOrder] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setSectionKey('mission');
    setImageUrl('');
    setOrder(aboutUs.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AboutUsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSubtitle(item.subtitle || '');
    setDescription(item.description);
    setSectionKey(item.sectionKey || 'mission');
    setImageUrl(item.imageUrl || '');
    setOrder(item.order || 1);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingItem) {
      await updateAboutUs({
        ...editingItem,
        title,
        subtitle,
        description,
        sectionKey,
        imageUrl,
        order
      });
      setSuccessMsg('About Us section updated successfully in Firestore!');
    } else {
      const newId = `about-${Date.now()}`;
      await addAboutUs({
        id: newId,
        title,
        subtitle,
        description,
        sectionKey,
        imageUrl,
        order
      });
      setSuccessMsg('New About Us section added successfully to Firestore!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#50007c]" />
            <span>About Us Collection Management (Firestore CRUD)</span>
          </h2>
          <p className="text-xs text-slate-500">Manage company history, pillars, mission, vision, and workshop details stored real-time in Firebase.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add About Us Section
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* About Us Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aboutUs.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg uppercase tracking-wider text-[10px]">
                  Section: {item.sectionKey}
                </span>
                <span className="text-xs font-bold text-slate-400">Order: #{item.order}</span>
              </div>
              <h3 className="font-black text-sm text-slate-900">{item.title}</h3>
              {item.subtitle && <p className="text-xs font-bold text-[#50007c]">{item.subtitle}</p>}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {item.imageUrl ? (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Image attached
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">No Image</span>
              )}
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-purple-100 hover:text-[#50007c] text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => deleteAboutUs(item.id)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {aboutUs.length === 0 && (
          <div className="col-span-2 p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
            No About Us sections found in Firestore database. Click "Add About Us Section" to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">
                {editingItem ? 'Edit About Us Section' : 'Add New About Us Section'}
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
                <label className="font-bold text-slate-700 block mb-1">Section Key / Category</label>
                <select
                  value={sectionKey}
                  onChange={(e) => setSectionKey(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
                >
                  <option value="hero">Hero / Main Banner Intro</option>
                  <option value="mission">Mission & Quality Promise</option>
                  <option value="vision">Vision Statement</option>
                  <option value="story">Founding Story & Milestones</option>
                  <option value="infrastructure">Press Infrastructure & Machinery</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Section Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  placeholder="e.g. 5-Min Counter & Same-Day Speed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Highlight (Optional)</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  placeholder="e.g. Mahavir Enclave, New Delhi"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description / Content</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  placeholder="Detailed explanation of this section..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Sort Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {editingItem ? 'Save Changes' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
