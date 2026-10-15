import React, { useState, useRef } from 'react';
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
  Camera
} from 'lucide-react';

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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Optional URL mode toggle (kept collapsed so normal users only see pure gallery upload)
  const [showUrlOption, setShowUrlOption] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Compress & convert file directly to permanent database image
  const compressImage = (inputFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const rawData = uploadEvent.target?.result as string;
        if (!rawData) {
          reject(new Error('Failed to read image file'));
          return;
        }
        const img = new Image();
        img.onload = () => {
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawData);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedBase64);
        };
        img.onerror = () => resolve(rawData);
        img.src = rawData;
      };
      reader.onerror = reject;
      reader.readAsDataURL(inputFile);
    });
  };

  // Pure Phone / PC Gallery File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Image size is too large. Please choose a photo under 20MB.');
      return;
    }

    setErrorMsg('');
    setUploading(true);
    setStatusMessage('Uploading and optimizing photo...');

    try {
      const compressedResult = await compressImage(file);
      setUploading(false);
      onChange(compressedResult);
      setStatusMessage('✓ Photo uploaded directly from gallery! Saved permanently.');
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      console.error('Gallery upload error:', err);
      setUploading(false);
      setErrorMsg('Could not upload photo. Please try again.');
    } finally {
      // Reset file input so user can pick same file again if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = () => {
    onChange('');
    setStatusMessage('');
    setErrorMsg('');
  };

  // Advanced: only if user specifically wants to paste an internet URL
  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setStatusMessage('✓ Web image link applied.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
      
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="font-black text-slate-800 text-xs flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-[#50007c]" />
          <span>{label}</span>
        </label>
        {value && (
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
          {value ? (
            <img src={value} alt="Current Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ImageIcon className="w-7 h-7 text-slate-300" />
              <span className="text-[9px] mt-1 font-bold">No Photo</span>
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
              className="px-4 py-2.5 bg-[#50007c] hover:bg-purple-900 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : value ? 'Change Photo from Gallery' : 'Upload from Phone Gallery / PC'}</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Tap the button to pick any photo directly from your phone gallery or computer. No links required!
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

      {/* Optional: Collapsed Web Link Section (Only for rare edge cases, completely hidden by default) */}
      <div className="pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowUrlOption(!showUrlOption)}
          className="text-[11px] text-slate-400 hover:text-slate-600 font-medium flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlOption ? 'Hide web link option' : 'Have a web link instead? (Optional)'}</span>
          {showUrlOption ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showUrlOption && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-[11px] text-slate-600">
              Only use this if you want to paste a public image URL from the web. Direct gallery upload above is recommended.
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
