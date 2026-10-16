import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Package, 
  Image as ImageIcon, 
  DollarSign, 
  Check, 
  X, 
  RotateCcw, 
  Loader2, 
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { ProductItem } from '../types';
import { CATEGORIES } from '../data/products';
import { ImageUploader } from './ImageUploader';

export const ProductsView: React.FC = () => {
  const { products, updateProduct, addProduct, deleteProduct, resetToDefaultProducts, categories } = useAdmin();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [actionNotice, setActionNotice] = useState<string>('');
  const [deleteCandidate, setDeleteCandidate] = useState<ProductItem | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  // Use categories from context or fallback to static CATEGORIES
  const availableCategories = (categories && categories.length > 0) ? categories : CATEGORIES;

  const filtered = products.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryLabel?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      if (isNew) {
        await addProduct(editingProduct);
        setActionNotice(`✓ "${editingProduct.title}" added to catalog & saved to database.`);
      } else {
        await updateProduct(editingProduct);
        setActionNotice(`✓ "${editingProduct.title}" updated and synced.`);
      }
      setEditingProduct(null);
      setIsNew(false);
      setTimeout(() => setActionNotice(''), 4000);
    } catch (err: any) {
      console.error('Error saving product:', err);
      setActionNotice(`⚠ Error saving product: ${err.message || 'Please retry'}`);
      setTimeout(() => setActionNotice(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeleteProduct = async () => {
    if (!deleteCandidate) return;
    const title = deleteCandidate.title;
    try {
      await deleteProduct(deleteCandidate.id);
      setActionNotice(`✓ "${title}" deleted permanently.`);
      setTimeout(() => setActionNotice(''), 4000);
    } catch (err: any) {
      console.error('Error deleting product:', err);
      setActionNotice(`⚠ Error deleting product: ${err.message || 'Please retry'}`);
      setTimeout(() => setActionNotice(''), 4000);
    } finally {
      setDeleteCandidate(null);
    }
  };

  const confirmResetCatalog = async () => {
    if (resetToDefaultProducts) {
      try {
        await resetToDefaultProducts();
        setActionNotice('✓ Catalog successfully restored to default Shivani Graphics templates.');
        setTimeout(() => setActionNotice(''), 4000);
      } catch (err: any) {
        setActionNotice('⚠ Error resetting catalog.');
        setTimeout(() => setActionNotice(''), 4000);
      }
    }
    setShowResetModal(false);
  };

  const handleAddNew = () => {
    const newId = `prod-${Date.now()}`;
    const defaultCategory = availableCategories[0] || { id: 'paper-documents', label: 'Paper & Documents' };
    
    setEditingProduct({
      id: newId,
      slug: newId,
      title: 'New Custom Print Item',
      category: defaultCategory.id,
      categoryLabel: defaultCategory.label,
      shortDescription: 'High quality commercial digital printing with instant counter pickup.',
      detailedDescription: 'Full commercial printing with high-grade stock, vibrant inks, and express delivery in Delhi NCR.',
      rating: 5.0,
      reviewCount: 12,
      dispatchTag: '⚡ Same-Day Express',
      minPrice: 199,
      basePrice: 199,
      badge: '⚡ Same-Day Delivery',
      images: [
        { 
          url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80', 
          alt: 'Product Sample', 
          caption: 'Front View' 
        }
      ],
      specs: [
        { label: 'Paper / Material', value: '350 GSM Art Card' },
        { label: 'Turnaround Time', value: 'Same-Day / 5-Min Counter Pickup' },
        { label: 'Minimum Order', value: '1 unit' }
      ],
      config: {
        sizes: [{ id: 's1', name: 'Standard Custom Size', priceMultiplier: 1 }],
        materials: [{ id: 'm1', name: 'Premium Heavy Cardstock', priceMultiplier: 1 }],
        finishes: [{ id: 'f1', name: 'Matte Lamination', priceMultiplier: 1 }],
        sides: [{ id: 'sd1', name: 'Double Sided', priceMultiplier: 1 }],
        quantities: [
          { qty: 100, popular: true },
          { qty: 250, popular: false },
          { qty: 500, popular: false }
        ]
      }
    });
    setIsNew(true);
  };

  const handleCategorySelectChange = (catId: string) => {
    if (!editingProduct) return;
    const cat = availableCategories.find(c => c.id === catId);
    setEditingProduct({
      ...editingProduct,
      category: catId,
      categoryLabel: cat?.label || catId
    });
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', text: string) => {
    if (!editingProduct) return;
    const currentSpecs = editingProduct.specs ? [...editingProduct.specs] : [];
    if (currentSpecs[index]) {
      currentSpecs[index] = { ...currentSpecs[index], [field]: text };
      setEditingProduct({ ...editingProduct, specs: currentSpecs });
    }
  };

  const handleAddSpec = () => {
    if (!editingProduct) return;
    const currentSpecs = editingProduct.specs ? [...editingProduct.specs] : [];
    currentSpecs.push({ label: 'New Specification', value: 'Custom Details' });
    setEditingProduct({ ...editingProduct, specs: currentSpecs });
  };

  const handleRemoveSpec = (index: number) => {
    if (!editingProduct) return;
    const currentSpecs = (editingProduct.specs || []).filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, specs: currentSpecs });
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#50007c]" />
            <span>Products & Services Catalog ({products.length})</span>
          </h2>
          <p className="text-xs text-slate-500">
            Edit pricing, upload photos from device gallery, modify categories, and delete products with real-time database sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {resetToDefaultProducts && (
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              title="Reset catalog back to default sample items"
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Samples</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Action Notice (Replaces window.alert) */}
      {actionNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-xs animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by title, category, or ID..."
          className="w-full text-xs focus:outline-none font-medium"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Products List */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search ? `No product matching "${search}".` : 'Add your first product or click "Restore Samples" to load the catalog.'}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-[#50007c] text-white font-bold text-xs rounded-xl"
            >
              Add Product
            </button>
            {resetToDefaultProducts && (
              <button
                onClick={() => setShowResetModal(true)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Restore Samples
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((p) => {
            const displayImg = p.images?.[0]?.url || 'https://images.unsplash.com/photo-1593062096033-9a26b09da705';
            const price = p.basePrice || p.minPrice || 199;

            return (
              <div 
                key={p.id} 
                className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    <img 
                      src={displayImg} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-black text-slate-900 truncate">{p.title}</h4>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-black rounded-md whitespace-nowrap">
                        {p.badge || p.dispatchTag || '⚡ Same-Day'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-0.5">
                      <span className="font-semibold text-purple-900">{p.categoryLabel || p.category}</span>
                      <span className="mx-1.5">·</span>
                      <span>Starting from ₹{price}</span>
                      <span className="mx-1.5">·</span>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => { setEditingProduct(p); setIsNew(false); }}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-[#50007c] font-black text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCandidate(p)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
                    title="Delete product permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* In-App Delete Confirmation Modal (Replaces window.confirm) */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-80 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center animate-fadeIn">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Delete Product Permanently?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove <strong>"{deleteCandidate.title}"</strong>? It will be removed from your catalog and database.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-App Reset Confirmation Modal (Replaces window.confirm) */}
      {showResetModal && (
        <div className="fixed inset-0 z-80 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center animate-fadeIn">
            <div className="w-12 h-12 bg-purple-100 text-[#50007c] rounded-2xl flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Restore Sample Catalog?</h3>
            <p className="text-xs text-slate-500">
              This will restore all default print products (visiting cards, flex banners, standees, frames, corporate merchandise) with standard specs.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmResetCatalog}
                className="px-5 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl cursor-pointer shadow-md"
              >
                Restore Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-100 text-[#50007c]">
                  {isNew ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </span>
                <h3 className="text-base font-black text-slate-900">
                  {isNew ? 'Add New Product to Catalog' : `Edit Product: ${editingProduct.title}`}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setEditingProduct(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* Product Title */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  required
                  placeholder="e.g. Executive Visiting Cards (350 GSM)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                />
              </div>

              {/* Category Dropdown & Custom Category Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => handleCategorySelectChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                  >
                    {availableCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Display Label</label>
                  <input
                    type="text"
                    value={editingProduct.categoryLabel}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryLabel: e.target.value })}
                    required
                    placeholder="e.g. Paper & Documents"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Price & Speed Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Starting Base Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.basePrice || editingProduct.minPrice || 199}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditingProduct({ 
                        ...editingProduct, 
                        basePrice: val,
                        minPrice: val 
                      });
                    }}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Speed / Pickup Tag</label>
                  <select
                    value={editingProduct.badge || '⚡ Same-Day Delhi NCR Delivery'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value, dispatchTag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                  >
                    <option value="⚡ 5-Minute Store Pickup">⚡ 5-Minute Store Pickup</option>
                    <option value="⚡ 10-Minute Store Pickup">⚡ 10-Minute Store Pickup</option>
                    <option value="⚡ 15-Minute Store Pickup">⚡ 15-Minute Store Pickup</option>
                    <option value="⚡ 2-Hour Express Printing">⚡ 2-Hour Express Printing</option>
                    <option value="⚡ Same-Day Delhi NCR Delivery">⚡ Same-Day Delhi NCR Delivery</option>
                    <option value="⚡ 24-Hour Express Dispatch">⚡ 24-Hour Express Dispatch</option>
                    <option value="⚡ Custom Bulk Order">⚡ Custom Bulk Order</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Summary (Shown on Cards)</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  placeholder="Brief 1-sentence product summary"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] focus:outline-none"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description (Shown on Product Page)</label>
                <textarea
                  rows={2}
                  value={editingProduct.detailedDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, detailedDescription: e.target.value })}
                  placeholder="Full specifications, material details, and delivery options..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#50007c] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Photo Upload with ImageUploader */}
              <div>
                <ImageUploader
                  value={editingProduct.images?.[0]?.url || ''}
                  onChange={(newUrl) => {
                    const imgs = editingProduct.images ? [...editingProduct.images] : [];
                    if (imgs[0]) {
                      imgs[0] = { ...imgs[0], url: newUrl };
                    } else {
                      imgs.push({ url: newUrl, alt: editingProduct.title, caption: 'Main' });
                    }
                    setEditingProduct({ ...editingProduct, images: imgs });
                  }}
                  label="Product Photo (Device Gallery Upload or Image Link)"
                  folder="products"
                />
              </div>

              {/* Specifications List */}
              <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-black text-slate-800 text-[11px] uppercase tracking-wider">
                    Product Specifications
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-[10px] font-bold text-[#50007c] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Spec Line
                  </button>
                </div>

                {(editingProduct.specs || []).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec.label}
                      onChange={(e) => handleUpdateSpec(sIdx, 'label', e.target.value)}
                      placeholder="Spec Label (e.g. Paper)"
                      className="w-1/3 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-xs"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleUpdateSpec(sIdx, 'value', e.target.value)}
                      placeholder="Spec Detail (e.g. 350 GSM Art Board)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(sIdx)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? 'Saving to Database...' : (isNew ? 'Create Product' : 'Save Changes')}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
