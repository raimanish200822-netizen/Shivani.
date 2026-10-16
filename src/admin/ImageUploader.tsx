import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Image as ImageIcon, 
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Camera,
  Loader2
} from 'lucide-react';
import { uploadImageFile } from '../utils/firebaseStorage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Photo',
  folder = 'uploads',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [localPreview, setLocalPreview] = useState<string>('');
  
  // Optional URL mode toggle (collapsed by default)
  const [showUrlOption, setShowUrlOption] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Clear local preview if external value resets or changes
  useEffect(() => {
    if (!value) {
      setLocalPreview('');
    }
  }, [value]);

  // Gallery File Selection with Instant Preview + Resilient Multi-tier Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('Image size is too large. Please select a photo under 25MB.');
      return;
    }

    setErrorMsg('');
    setUploading(true);
    setStatusMessage('Compressing & uploading photo...');

    // Generate instant preview so user immediately sees their photo
    try {
      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);
    } catch {}

    try {
      const permanentUrl = await uploadImageFile(file, folder);
      setUploading(false);
      setLocalPreview('');
      onChange(permanentUrl);
      setStatusMessage('✓ Photo uploaded and permanently saved!');
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      setUploading(false);
      setErrorMsg(err?.message || 'Could not upload photo. Please try again.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = () => {
    setLocalPreview('');
    onChange('');
    setStatusMessage('');
    setErrorMsg('');
  };

  // Advanced: URL paste mode
  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setLocalPreview('');
    onChange(urlInput.trim());
    setStatusMessage('✓ Web image link applied.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const displayImage = localPreview || value;

  return (
    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
      
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="font-black text-slate-800 text-xs flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-[#50007c]" />
          <span>{label}</span>
        </label>
        {displayImage && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Photo Active
          </span>
        )}
      </div>

      {/* Main Upload Box (Pure Gallery / Device Upload) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        
        {/* Photo Thumbnail */}
        <div className="w-20 h-20 rounded-xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs relative">
          {displayImage ? (
            <img 
              src={displayImage} 
              alt="Current Preview" 
              className="w-full h-full object-cover" 
              onError={() => {
                if (localPreview) setLocalPreview('');
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ImageIcon className="w-7 h-7 text-slate-300" />
              <span className="text-[9px] mt-1 font-bold">No Photo</span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center text-white">
              <Loader2 className="w-6 h-6 animate-spin text-purple-300" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-1 w-full space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing & Saving...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{displayImage ? 'Change Photo from Gallery' : 'Upload from Phone Gallery / PC'}</span>
                </>
              )}
            </button>

            {displayImage && (
              <button
                type="button"
                disabled={uploading}
                onClick={handleRemovePhoto}
                className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Tap the button to pick any photo directly from your gallery or files. Permanent cloud storage ensures it never vanishes after refresh.
          </p>

          {statusMessage && (
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-fadeIn">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{statusMessage}</span>
            </p>
          )}

          {errorMsg && (
            <p className="text-xs font-bold text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>

      </div>

      {/* Optional: Collapsed Web Link Section */}
      <div className="pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowUrlOption(!showUrlOption)}
          className="text-[11px] text-slate-400 hover:text-slate-600 font-medium flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlOption ? 'Hide web link option' : 'Have an image link instead? (Optional)'}</span>
          {showUrlOption ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showUrlOption && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-[11px] text-slate-600">
              Paste an image URL from the web. Direct gallery upload above is recommended.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#50007c]"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Apply Link
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
