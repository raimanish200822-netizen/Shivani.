import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:from-purple-800 hover:to-indigo-700 transition"
        title="Install Shivani Graphics App"
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-[#50007c] hover:bg-purple-100 transition"
        >
          <Smartphone className="w-4 h-4" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl text-[#50007c]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Install on iPhone / iPad</h3>
                  <p className="text-xs text-slate-500">Shivani Graphics PWA</p>
                </div>
              </div>
              <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                <li>Tap the <strong>Share</strong> button in Safari toolbar at bottom.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-[#50007c] py-2 text-xs font-bold text-white hover:bg-[#3d005f] transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
