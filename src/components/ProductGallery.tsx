import React, { useState, useRef, MouseEvent } from 'react';
import { ZoomIn, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductGalleryProps {
  product: ProductItem;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const activeImage = product.images[activeIndex] || product.images[0];

  // Mouse move handler for magnifying lens effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handlePrevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      
      {/* Main Image Showcase Card */}
      <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs group">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-lg shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md">
            {product.categoryLabel}
          </span>
        </div>

        {/* Action Controls: Zoom inspection hint & Lightbox button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setLightboxScale(1);
              setIsLightboxOpen(true);
            }}
            className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md backdrop-blur-xs transition-all"
            title="Inspect full image in high-res modal"
            aria-label="Enlarge image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Main Image with Hover Magnifier */}
        <div
          ref={imageContainerRef}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => {
            setLightboxScale(1);
            setIsLightboxOpen(true);
          }}
          className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-crosshair"
        >
          {/* Base Image */}
          <img
            src={activeImage.url}
            alt={activeImage.alt}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isZooming ? 'opacity-30' : 'opacity-100'
            }`}
          />

          {/* High-Resolution Hover Zoom Viewport */}
          {isZooming && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                backgroundImage: `url(${activeImage.url})`,
                backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                backgroundSize: '240%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Reticle / Lens cross indicator */}
              <div 
                className="absolute w-24 h-24 border border-white/80 rounded-full shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 bg-blue-500/10"
                style={{
                  left: `${zoomCoords.x}%`,
                  top: `${zoomCoords.y}%`
                }}
              />
            </div>
          )}

          {/* Hover instruction tooltip */}
          {!isZooming && (
            <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
              <ZoomIn className="w-3 h-3 text-blue-400" />
              <span>Hover to zoom · Click to enlarge</span>
            </div>
          )}

          {/* Carousel Arrows if multiple images */}
          {product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Caption beneath active image */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
          <p className="font-medium truncate">{activeImage.caption}</p>
          <span className="text-[11px] text-slate-400 ml-2 whitespace-nowrap">
            {activeIndex + 1} of {product.images.length}
          </span>
        </div>

      </div>

      {/* Clickable Thumbnails Row */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all group ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                }`}
                title={img.caption}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Specifications Summary Strip */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Production Quality Standards
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {product.specs.map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] text-slate-400">{spec.label}</span>
              <span className="font-semibold text-slate-700 truncate" title={spec.value}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for deep detail inspection */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Topbar */}
          <div 
            className="w-full max-w-4xl flex items-center justify-between text-white pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-bold text-sm sm:text-base">{product.title}</p>
              <p className="text-xs text-slate-300">{activeImage.caption}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxScale((prev) => Math.min(prev + 0.3, 2.5))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-bold"
              >
                Zoom +
              </button>
              <button
                type="button"
                onClick={() => setLightboxScale((prev) => Math.max(prev - 0.3, 0.8))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-bold"
              >
                Zoom -
              </button>
              <button
                type="button"
                onClick={() => setLightboxScale(1)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-bold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white ml-2"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div 
            className="relative max-w-4xl max-h-[75vh] overflow-auto rounded-2xl bg-black/40 p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              style={{ transform: `scale(${lightboxScale})`, transition: 'transform 0.15s ease' }}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>

          <p className="text-xs text-slate-400 mt-3">
            Press ESC or click anywhere outside to close inspection
          </p>
        </div>
      )}

    </div>
  );
};
