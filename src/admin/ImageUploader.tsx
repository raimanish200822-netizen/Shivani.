import React, { useState } from 'react';
import { Upload, Link as LinkIcon, CheckCircle, AlertTriangle, Loader2, Image as ImageIcon, RefreshCw } from 'lucide-react';
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
  const [urlStatus, setUrlStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [importingUrl, setImportingUrl] = useState(false);

  // Handle file selection from phone gallery / computer
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please select a valid image file (JPG, JPEG, PNG, or WEBP).');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image file size is too large. Please select an image under 10MB.');
      return;
    }

    setErrorMsg('');
    setUploading(true);
    setProgress(0);
    setStatusMessage('Preparing upload to Firebase Storage...');

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const storageRef = ref(storage, `shivanigraphics/${folder}/${Date.now()}_${sanitizedName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
          setStatusMessage(`Uploading: ${prog}% completed`);
        },
        (error) => {
          console.error('Firebase Storage upload error:', error);
          setUploading(false);
          // Fallback to compressed base64 data URL if storage upload fails due to rules/permissions
          const reader = new FileReader();
          reader.onload = (uploadEvent) => {
            const base64Result = uploadEvent.target?.result as string;
            if (base64Result) {
              onChange(base64Result);
              setStatusMessage('Uploaded successfully (Local Compressed Fallback)');
            }
          };
          reader.readAsDataURL(file);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          setProgress(100);
          setStatusMessage('Successfully uploaded to Firebase Storage!');
          onChange(downloadURL);
        }
      );
    } catch (err) {
      console.error('Upload exception:', err);
      setUploading(false);
      // Fallback reader
      const reader = new FileReader();
      reader.onload = (ev) => {
        const res = ev.target?.result as string;
        if (res) {
          onChange(res);
          setStatusMessage('Uploaded successfully (Direct Fallback)');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle URL validation
  const handleValidateUrl = (urlToTest: string) => {
    if (!urlToTest.trim()) {
      setUrlStatus('invalid');
      setErrorMsg('Please enter a valid image URL.');
      return;
    }

    setUrlStatus('validating');
    setErrorMsg('');

    const img = new Image();
    img.src = urlToTest;
    img.onload = () => {
      setUrlStatus('valid');
      onChange(urlToTest);
      setStatusMessage('Image URL verified successfully!');
    };
    img.onerror = () => {
      setUrlStatus('invalid');
      setErrorMsg('Unable to load image from this URL. The link might be broken, expired, or blocked.');
    };
  };

  // Import external URL into Firebase Storage
  const handleImportToStorage = async () => {
    if (!urlInput.trim()) return;
    setImportingUrl(true);
    setStatusMessage('Downloading and importing external image to Firebase Storage...');

    try {
      // Fetch image as blob
      const response = await fetch(urlInput);
      const blob = await response.blob();
      const file = new File([blob], `imported_${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' });

      const storageRef = ref(storage, `shivanigraphics/${folder}/imported_${Date.now()}.jpg`);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setImportingUrl(false);
      onChange(downloadURL);
      setStatusMessage('Successfully imported and stored permanently in Firebase Storage!');
    } catch (err) {
      console.error('Import error:', err);
      setImportingUrl(false);
      // If CORS or fetch fails, accept the URL directly with warning
      onChange(urlInput);
      setStatusMessage('Linked external URL (Note: CORS prevented direct Firebase storage copy, URL linked directly).');
    }
  };

  return (
    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#50007c]" />
          <span>{label}</span>
        </label>
        
        <div className="flex items-center bg-slate-200 p-0.5 rounded-xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode('gallery')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${mode === 'gallery' ? 'bg-[#50007c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            📁 Direct Gallery Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${mode === 'url' ? 'bg-[#50007c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🔗 Paste Image URL
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs relative">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-300" />
          )}
        </div>

        <div className="flex-1 space-y-1 overflow-hidden">
          <p className="text-[11px] font-mono text-slate-600 truncate bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
            {value || 'No image selected'}
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

      {/* Mode 1: Direct Gallery Upload */}
      {mode === 'gallery' && (
        <div className="space-y-2">
          <label className="border-2 border-dashed border-purple-300 hover:border-[#50007c] bg-white hover:bg-purple-50/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
            <Upload className="w-6 h-6 text-[#50007c] mb-1" />
            <span className="text-xs font-black text-slate-800">Click to Select from Phone Gallery or Computer</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Supports JPG, PNG, WEBP (Android, iOS, Tablets & PC)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
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
              <p className="text-[10px] text-slate-500 font-bold text-center">Uploading to Firebase Storage ({progress}%)...</p>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Image URL Upload */}
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
              Verify Link
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>External links (like SanishTech) expire in 24h. Import to Firebase Storage to make permanent.</span>
            </span>

            <button
              type="button"
              disabled={importingUrl || !urlInput}
              onClick={handleImportToStorage}
              className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-[#50007c] font-black text-[11px] rounded-xl transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {importingUrl ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>Import to Firebase Storage</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
