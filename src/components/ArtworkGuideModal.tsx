import React from 'react';
import { X, FileCheck, Layers, AlertCircle, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { generateQuickChatUrl } from '../utils/whatsapp';

interface ArtworkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkGuideModal: React.FC<ArtworkGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-base tracking-tight">Prepress Artwork Guidelines</p>
              <p className="text-xs text-slate-400">Shivani Graphics Print Preparation Manual</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Rule 1: Formats */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Accepted Design Software & File Formats</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              We natively support Vector PDF (PDF/X-1a or PDF/X-4), CorelDRAW CDR (versions 12 up to 2024), Adobe Illustrator (AI / EPS), Photoshop (PSD), and high-resolution TIFF or JPG.
            </p>
          </div>

          {/* Rule 2: Bleed & Safety Margins */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Bleed Margins (3mm / 0.125") & Safe Zone</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              • <strong className="text-slate-900">Bleed:</strong> Extend your background colors or graphics 3mm beyond the final cut line on all 4 sides so no white border appears during machine trimming.<br />
              • <strong className="text-slate-900">Safety Margin:</strong> Keep critical text, contact phone numbers, and company logos at least 4mm inside the trim edge.
            </p>
          </div>

          {/* Rule 3: Color Mode & Resolution */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. CMYK Color Palette & 300 DPI Resolution</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              Ensure all color values are converted from RGB to <strong className="text-slate-900">CMYK</strong> (Fogra-39 recommended). All embedded raster images and photos must be at least <strong className="text-slate-900">300 DPI</strong> at actual 100% scale. For deep rich black text, use C:0 M:0 Y:0 K:100; for large dark backgrounds, use Rich Black (C:30 M:30 Y:30 K:100).
            </p>
          </div>

          {/* Rule 4: Converting Text to Curves / Outlines */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4. Convert All Fonts to Outlines / Curves</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              To prevent font substitution:
              <br />• In CorelDRAW: Select All and press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-[11px]">Ctrl + Q</kbd>
              <br />• In Adobe Illustrator: Select All and press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-[11px]">Ctrl + Shift + O</kbd>
            </p>
          </div>

          {/* WhatsApp Prepress Help */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-extrabold text-emerald-900 text-xs sm:text-sm">
                Need our designers to verify your CDR/PDF file?
              </p>
              <p className="text-xs text-emerald-700">
                Send your file on WhatsApp for a complimentary 10-point prepress check.
              </p>
            </div>
            <a
              href={generateQuickChatUrl('artwork')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send File for Proofing</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
