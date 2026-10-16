import React, { useState, useEffect, useRef } from 'react';

/**
 * Service Layer for Image Fetching & Session Storage Caching
 * Eliminates the 2-second flash, flickering, and refresh delays across applet sessions.
 */

const SESSION_CACHE_KEY = 'sg_img_session_cache_v1';
const MAX_SESSION_ENTRIES = 200;

// In-memory instant lookup set (populated on boot from sessionStorage)
const memoryCache = new Set<string>();

// Ongoing preload promises to prevent duplicate in-flight network requests
const inFlightRequests = new Map<string, Promise<string>>();

// Initialize memory cache from sessionStorage once on module load
function initMemoryCache(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach(url => {
          if (typeof url === 'string') memoryCache.add(url);
        });
      }
    }
  } catch (e) {
    console.warn('[ImageService] Failed to load sessionStorage cache:', e);
  }
}

// Persist memory cache to sessionStorage safely
function syncToSessionStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const list = Array.from(memoryCache).slice(-MAX_SESSION_ENTRIES);
    sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('[ImageService] SessionStorage quota or write error:', e);
  }
}

// Initialize on script execution
initMemoryCache();

/**
 * Checks synchronously whether an image asset has already been successfully loaded
 * during the current browser session.
 */
export function isImageCached(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string' || !url.trim()) return false;
  return memoryCache.has(url.trim());
}

/**
 * Records an image asset URL as successfully loaded in both in-memory cache and sessionStorage.
 */
export function recordImageLoaded(url: string | null | undefined): void {
  if (!url || typeof url !== 'string' || !url.trim()) return;
  const cleanUrl = url.trim();
  if (!memoryCache.has(cleanUrl)) {
    memoryCache.add(cleanUrl);
    syncToSessionStorage();
  }
}

/**
 * Preloads an image in the background. Uses HTMLImageElement and .decode() (if available)
 * to ensure pixels are decoded in GPU/raster memory before displaying.
 * Reuses in-flight promises to avoid duplicated concurrent requests.
 */
export function preloadImage(url: string | null | undefined): Promise<string> {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return Promise.reject(new Error('Invalid image URL'));
  }

  const cleanUrl = url.trim();

  // If already loaded in session, resolve immediately
  if (memoryCache.has(cleanUrl)) {
    return Promise.resolve(cleanUrl);
  }

  // Deduplicate in-flight fetches for the same asset
  if (inFlightRequests.has(cleanUrl)) {
    return inFlightRequests.get(cleanUrl)!;
  }

  const promise = new Promise<string>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve(cleanUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const handleSuccess = () => {
      inFlightRequests.delete(cleanUrl);
      recordImageLoaded(cleanUrl);
      resolve(cleanUrl);
    };

    const handleError = (err: Event | string) => {
      inFlightRequests.delete(cleanUrl);
      reject(new Error(`Failed to preload image: ${cleanUrl}`));
    };

    img.onload = () => {
      // Decode image to prevent frame drop on first paint
      if ('decode' in img && typeof img.decode === 'function') {
        img.decode().then(handleSuccess).catch(handleSuccess); // fallback to success even if decode rejects
      } else {
        handleSuccess();
      }
    };

    img.onerror = handleError;
    img.src = cleanUrl;
  });

  inFlightRequests.set(cleanUrl, promise);
  return promise;
}

/**
 * Batch-preloads multiple image assets in parallel.
 */
export async function preloadImages(urls: (string | null | undefined)[]): Promise<void> {
  const validUrls = urls.filter((u): u is string => typeof u === 'string' && u.trim().length > 0);
  await Promise.allSettled(validUrls.map(url => preloadImage(url)));
}

/**
 * Preloads core brand assets on startup to eliminate any initial flash
 */
export function preloadCoreBrandAssets(customLogo?: string): void {
  const coreAssets = [
    customLogo || '/logo.jpg',
    '/logo.jpg',
    '/promo-banner.png'
  ];
  preloadImages(coreAssets).catch(() => {});
}

/**
 * React Hook for consuming cached images with seamless transitions.
 * Returns the currently active display source, loading status, and error state.
 */
export function useCachedImage(src: string | null | undefined, fallbackSrc?: string) {
  const initialCached = isImageCached(src);
  const [displaySrc, setDisplaySrc] = useState<string>(src || fallbackSrc || '');
  const [isLoaded, setIsLoaded] = useState<boolean>(initialCached);
  const [hasError, setHasError] = useState<boolean>(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!src) {
      setDisplaySrc(fallbackSrc || '');
      setIsLoaded(true);
      setHasError(false);
      return;
    }

    // If already verified in sessionStorage cache, switch immediately without flash
    if (isImageCached(src)) {
      setDisplaySrc(src);
      setIsLoaded(true);
      setHasError(false);
      return;
    }

    // Otherwise preload in background while keeping prior view intact
    let active = true;
    preloadImage(src)
      .then((loadedUrl) => {
        if (!active || !isMountedRef.current) return;
        setDisplaySrc(loadedUrl);
        setIsLoaded(true);
        setHasError(false);
      })
      .catch(() => {
        if (!active || !isMountedRef.current) return;
        setHasError(true);
        if (fallbackSrc) {
          setDisplaySrc(fallbackSrc);
        }
        setIsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [src, fallbackSrc]);

  return { displaySrc, isLoaded, hasError };
}

/**
 * Reusable CachedImage component that uses the session cache service
 * to render images instantly with zero-flash and smooth fallback.
 */
export interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  aspectRatioClass?: string;
  showSkeleton?: boolean;
}

export const CachedImage: React.FC<CachedImageProps> = ({
  src,
  fallbackSrc = '/logo.jpg',
  alt = 'Image',
  className = '',
  aspectRatioClass,
  showSkeleton = true,
  ...props
}) => {
  const { displaySrc, isLoaded, hasError } = useCachedImage(src, fallbackSrc);
  const [imgError, setImgError] = useState(false);

  // If already in session cache, skip any skeleton or opacity delay
  const alreadyCached = isImageCached(src);

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass || ''}`}>
      {/* Skeleton placeholder shown only on first uncached load */}
      {showSkeleton && !isLoaded && !alreadyCached && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-purple-600 animate-spin" />
        </div>
      )}

      <img
        {...props}
        src={imgError ? fallbackSrc : displaySrc}
        alt={alt}
        className={`${className} ${
          !isLoaded && !alreadyCached ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-200`}
        onError={(e) => {
          setImgError(true);
          props.onError?.(e);
        }}
        onLoad={(e) => {
          recordImageLoaded(displaySrc);
          props.onLoad?.(e);
        }}
      />
    </div>
  );
};
