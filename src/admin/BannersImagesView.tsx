import React, { useState } from 'react';
import { Image, Plus, Trash2, Edit3, Upload, Check, X } from 'lucide-react';
import { useAdmin, WebsiteImage } from '../context/AdminContext';
import { ImageUploader } from './ImageUploader';

export const BannersImagesView: React.FC = () => {
  const { websiteImages, updateWebsiteImage, addWebsiteImage, deleteWebsiteImage } = useAdmin();
  const [editingImage, setEditingImage] = useState<WebsiteImage | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;
    if (isNew) {
      addWebsiteImage(editingImage);
    } else {
      updateWebsiteImage(editingImage);
    }
    setEditingImage(null);
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingImage({
      id: `img-${Date.now()}`,
      title: 'New Website Banner',
      section: 'Hero',
      url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
      alt: 'Banner',
      enabled: true,
      sortOrder: websiteImages.length + 1
    });
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Website Image & Banner Library ({websiteImages.length})</h2>
          <p className="text-xs text-slate-500">Manage every image on the public website without coding. Changes update instantly.</p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Upload New Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {websiteImages.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
            <div className="relative">
              <img src={img.url} alt={img.alt} className="w-full h-36 object-cover" />
              <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                {img.section}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-xs font-black text-slate-900">{img.title}</h4>
              <p className="text-[11px] text-slate-500 font-mono truncate">{img.url}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${img.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                  {img.enabled ? 'Active on Site' : 'Hidden'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setEditingImage(img); setIsNew(false); }}
                    className="p-1.5 bg-purple-50 hover:bg-purple-100 text-[#50007c] rounded-lg cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete image "${img.title}"?`)) {
                        deleteWebsiteImage(img.id);
                      }
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isNew ? 'Upload Website Image' : 'Edit Website Image'}
              </h3>
              <button onClick={() => setEditingImage(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Image Title</label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Website Section</label>
                <select
                  value={editingImage.section}
                  onChange={(e) => setEditingImage({ ...editingImage, section: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
                >
                  <option value="Hero">Hero / Banner Slider</option>
                  <option value="Category">Category Card</option>
                  <option value="Service">Services Section</option>
                  <option value="Gallery">Gallery</option>
                  <option value="Logo">Logo & Favicon</option>
                </select>
              </div>

              <div>
                <ImageUploader
                  value={editingImage.url}
                  onChange={(newUrl) => setEditingImage({ ...editingImage, url: newUrl })}
                  label="Banner Image (Gallery Upload or URL)"
                  folder="banners"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alt Text (SEO)</label>
                <input
                  type="text"
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Banner Subtitle / Description (For Hero Sliders)</label>
                <input
                  type="text"
                  value={editingImage.subtitle || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, subtitle: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge (e.g. ⚡ 5-Mins Pickup)</label>
                  <input
                    type="text"
                    value={editingImage.badge || ''}
                    onChange={(e) => setEditingImage({ ...editingImage, badge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingImage.ctaText || ''}
                    onChange={(e) => setEditingImage({ ...editingImage, ctaText: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="enabledCheck"
                  checked={editingImage.enabled}
                  onChange={(e) => setEditingImage({ ...editingImage, enabled: e.target.checked })}
                  className="rounded text-[#50007c] focus:ring-[#50007c]"
                />
                <label htmlFor="enabledCheck" className="font-bold text-slate-700 cursor-pointer">Enable on Public Website</label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#50007c] hover:bg-purple-900 text-white font-black rounded-xl cursor-pointer shadow-md"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
