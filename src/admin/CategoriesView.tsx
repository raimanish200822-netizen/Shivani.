import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, X } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState(CATEGORIES);
  const [editingCat, setEditingCat] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900">Category Cards & Covers Manager</h2>
        <p className="text-xs text-slate-500">Manage category titles, card images, and navigation links for the public website catalog.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-black rounded-md font-mono">{cat.id}</span>
              <span className="text-xs font-bold text-slate-400">ID: {cat.id}</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">{cat.label}</h3>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditingCat(cat)}
                className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl cursor-pointer flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Category Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCat && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Edit Category: {editingCat.label}</h3>
              <button onClick={() => setEditingCat(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Title / Label</label>
                <input
                  type="text"
                  value={editingCat.label}
                  onChange={(e) => setEditingCat({ ...editingCat, label: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Card Image URL</label>
                <input
                  type="text"
                  value={editingCat.image || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingCat(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer">
                Cancel
              </button>
              <button onClick={() => {
                setCategories(categories.map(c => c.id === editingCat.id ? editingCat : c));
                setEditingCat(null);
                alert('Category updated successfully!');
              }} className="px-5 py-2 bg-[#50007c] text-white font-black rounded-xl cursor-pointer shadow-md">
                Save Category Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
