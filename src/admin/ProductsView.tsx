import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Search, Package, Image, DollarSign, Check, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { ProductItem, ProductCategory } from '../types';
import { ImageUploader } from './ImageUploader';

export const ProductsView: React.FC = () => {
  const { products, updateProduct, addProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (isNew) {
      addProduct(editingProduct);
    } else {
      updateProduct(editingProduct);
    }
    setEditingProduct(null);
    setIsNew(false);
  };

  const handleAddNew = () => {
    const newId = `prod-${Date.now()}`;
    setEditingProduct({
      id: newId,
      slug: newId,
      title: 'New Custom Print Item',
      category: 'paper-documents',
      categoryLabel: 'Paper & Documents',
      shortDescription: 'High quality commercial digital printing.',
      detailedDescription: 'Full specification printing with express Delhi NCR delivery.',
      rating: 5.0,
      reviewCount: 1,
      dispatchTag: '⚡ Same-Day Express',
      minPrice: 199,
      badge: '⚡ Same-Day Delivery',
      images: [{ url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80', alt: 'Item', caption: 'Front' }],
      specs: [{ label: 'Paper Quality', value: '350 GSM Art Board' }],
      config: {
        sizes: [{ id: 's1', name: 'Standard' }],
        materials: [{ id: 'm1', name: 'Gloss Art Card' }],
        finishes: [{ id: 'f1', name: 'Matte Lamination' }],
        sides: [{ id: 'sd1', name: 'Both Sides' }],
        quantities: [{ qty: 100, unitPrice: 2, label: '100 pcs' }]
      }
    });
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Products & Services Catalog ({products.length})</h2>
          <p className="text-xs text-slate-500">Manage pricing, specifications, categories, and multi-image galleries.</p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or category..."
          className="w-full text-xs focus:outline-none font-medium"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <img src={p.images[0]?.url || 'https://images.unsplash.com/photo-1593062096033-9a26b09da705'} alt={p.title} className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-slate-900">{p.title}</h4>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-black rounded-md">{p.badge || p.dispatchTag}</span>
                </div>
                <p className="text-[11px] text-slate-500">{p.categoryLabel} · Starting from ₹{p.minPrice || 199}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setEditingProduct(p); setIsNew(false); }}
                className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                    deleteProduct(p.id);
                  }
                }}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isNew ? 'Add New Product' : `Edit Product: ${editingProduct.title}`}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Label</label>
                  <input
                    type="text"
                    value={editingProduct.categoryLabel}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryLabel: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.minPrice || 199}
                    onChange={(e) => setEditingProduct({ ...editingProduct, minPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Speed / Pickup Badge</label>
                  <select
                    value={editingProduct.badge || '⚡ Same-Day Delhi NCR Delivery'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value, dispatchTag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="⚡ 5-Minute Store Pickup">5-Minute Store Pickup</option>
                    <option value="⚡ 15-Minute Store Pickup">15-Minute Store Pickup</option>
                    <option value="⚡ 2-Hour Express Printing">2-Hour Express Printing</option>
                    <option value="⚡ Same-Day Delhi NCR Delivery">Same-Day Delivery</option>
                    <option value="⚡ 24-Hour Express Dispatch">24-Hour Express Dispatch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <ImageUploader
                  value={editingProduct.images[0]?.url || ''}
                  onChange={(newUrl) => {
                    const imgs = [...editingProduct.images];
                    if (imgs[0]) imgs[0].url = newUrl;
                    else imgs.push({ url: newUrl, alt: editingProduct.title, caption: 'Main' });
                    setEditingProduct({ ...editingProduct, images: imgs });
                  }}
                  label="Product Image (Gallery Upload or URL)"
                  folder="products"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl cursor-pointer shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
