import React, { useState } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  Image as ImageIcon, 
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Product / Banner Image',
  folder = 'products'
}) => {
  const [mode, setMode] = useState<'gallery' | 'url'>('gallery');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [urlInput, setUrlInput] = useState(value || '');
  const [isConverting, setIsConverting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Helper to detect if an image is permanent or temporary
  const isPermanentBase64 = value && value.startsWith('data:image/');
  const isFirebaseStorage = value && value.includes('firebasestorage.googleapis.com');
  const isTemporaryHost = value && (
    value.includes('sanishtech') ||
    value.includes('discordapp') ||
    value.includes('whatsapp') ||
    value.includes('blob:') ||
    value.includes('ex=') ||
    value.includes('Expires=') ||
    value.includes('token=')
  );

  // Compress & convert file to permanent Base64
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

  // Handle file selection from phone gallery / computer (100% PERMANENT)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Image file size is too large. Please select an image under 20MB.');
      return;
    }

    setErrorMsg('');
    setUploading(true);
    setProgress(35);
    setStatusMessage('Optimizing image for permanent database storage...');

    try {
      const compressedResult = await compressImage(file);
      setProgress(100);
      setUploading(false);
      onChange(compressedResult);
      setStatusMessage('Saved permanently from gallery! This image will never expire.');
    } catch (err) {
      console.error('Gallery upload error:', err);
      setUploading(false);
      setErrorMsg('Failed to process image. Please try again.');
    }
  };

  // Handle URL validation
  const handleValidateUrl = (urlToTest: string) => {
    if (!urlToTest.trim()) {
      setErrorMsg('Please enter a valid image URL.');
      return;
    }

    setErrorMsg('');
    setStatusMessage('Checking image URL...');

    const img = new Image();
    img.src = urlToTest;
    img.onload = () => {
      onChange(urlToTest);
      setStatusMessage('Image URL loaded successfully!');
    };
    img.onerror = () => {
      setErrorMsg('Unable to load image from this URL. The link might be expired, broken, or restricted.');
    };
  };

  // Convert an external URL into permanent database storage
  const handleMakeUrlPermanent = async () => {
    if (!urlInput.trim()) return;
    setIsConverting(true);
    setStatusMessage('Converting external link into permanent storage...');
    setErrorMsg('');

    try {
      // 1. Try Firebase Cloud Storage first if accessible
      try {
        const response = await fetch(urlInput, { mode: 'cors' });
        if (response.ok) {
          const blob = await response.blob();
          const file = new File([blob], `permanent_${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' });
          const storageRef = ref(storage, `shivanigraphics/${folder}/permanent_${Date.now()}.jpg`);
          const snapshot = await uploadBytesResumable(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);

          setIsConverting(false);
          onChange(downloadURL);
          setStatusMessage('Successfully converted and stored in permanent Cloud Storage!');
          return;
        }
      } catch (storageErr) {
        console.warn('Direct fetch/storage bypass, attempting canvas conversion:', storageErr);
      }

      // 2. Try Canvas Data URL conversion
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setIsConverting(false);
            onChange(dataUrl);
            setStatusMessage('Converted to permanent database image! It will never expire.');
            return;
          }
        } catch (canvasErr) {
          console.warn('Canvas conversion blocked by CORS policy:', canvasErr);
        }
        setIsConverting(false);
        onChange(urlInput);
        setErrorMsg('External server blocks conversion. To guarantee this image never expires, download it to your phone/PC and use "Direct Gallery Upload".');
      };
      img.onerror = () => {
        setIsConverting(false);
        setErrorMsg('Could not read external image. It might have already expired.');
      };
      img.src = urlInput;
    } catch (err) {
      setIsConverting(false);
      setErrorMsg('Failed to convert. Please download the image and use "Direct Gallery Upload" for guaranteed permanent storage.');
    }
  };

  return (
    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
      
      {/* Label and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#50007c]" />
          <span>{label}</span>
        </label>
        
        <div className="flex items-center bg-slate-200 p-0.5 rounded-xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode('gallery')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              mode === 'gallery' ? 'bg-[#50007c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📁 Direct Gallery Upload (Permanent)
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              mode === 'url' ? 'bg-[#50007c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔗 Image URL
          </button>
        </div>
      </div>

      {/* Image Preview & Permanence Badge */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs relative">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-300" />
          )}
        </div>

        <div className="flex-1 space-y-1.5 overflow-hidden">
          {/* Permanence Status Badge */}
          {value && (
            <div>
              {isPermanentBase64 || isFirebaseStorage ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Permanent Storage · Never Expires
                </span>
              ) : isTemporaryHost ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Warning: External temporary link (Expires in 24h)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  External URL Link
                </span>
              )}
            </div>
          )}

          <p className="text-[11px] font-mono text-slate-600 truncate bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
            {value ? (value.startsWith('data:image/') ? `[Permanent Embedded Image Data · ${Math.round(value.length / 1024)} KB]` : value) : 'No image selected'}
          </p>

          {statusMessage && (
            <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{statusMessage}</span>
            </p>
          )}

          {errorMsg && (
            <p className="text-[11px] font-bold text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>
      </div>

      {/* Mode 1: Direct Gallery Upload (RECOMMENDED & PERMANENT) */}
      {mode === 'gallery' && (
        <div className="space-y-2">
          <label className="border-2 border-dashed border-purple-300 hover:border-[#50007c] bg-white hover:bg-purple-50/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
            <Upload className="w-6 h-6 text-[#50007c] mb-1" />
            <span className="text-xs font-black text-slate-800">
              Click to Select Image from Phone Gallery or Computer
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Permanently compressed and stored directly in your website database. <strong>Never expires!</strong>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {uploading && (
            <div className="space-y-1">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#50007c] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-bold text-center">
                Processing & storing image permanently ({progress}%)...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: External Image URL */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => handleValidateUrl(urlInput)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
            >
              Verify
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <span className="text-[10px] text-amber-700 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>External links often expire in 24h. Make it permanent to avoid broken images.</span>
            </span>

            <button
              type="button"
              disabled={isConverting || !urlInput}
              onClick={handleMakeUrlPermanent}
              className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-[#50007c] font-black text-[11px] rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50 shrink-0"
            >
              {isConverting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Make Permanent</span>
            </button>
          </div>
        </div>
      )}

      {/* Why do images expire explanation toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-[11px] text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why do image links expire? (Click to learn more)</span>
        </button>

        {showExplanation && (
          <div className="mt-2 p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
            <p className="font-bold text-purple-900">Why External Image Links Expire:</p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
              <li><strong>Temporary Hostings (SanishTech, PostImages, ImgBB, Catbox):</strong> Free hosting sites automatically delete guest files after 24 to 72 hours.</li>
              <li><strong>Discord & WhatsApp Media Links:</strong> These platforms attach security tokens that expire after 24 hours to prevent unauthorized hotlinking.</li>
              <li><strong>The Solution:</strong> Always use <strong>"📁 Direct Gallery Upload"</strong>. It saves the image directly into the website's database permanently so it will never expire or break!</li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};
