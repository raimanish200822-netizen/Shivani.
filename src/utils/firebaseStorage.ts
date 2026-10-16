import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, handleStorageError } from '../firebase';

/**
 * Compresses an image file in the browser canvas.
 * Produces an optimized JPEG data URL and Blob (default max 1200px, 0.82 quality).
 */
export function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<{ dataUrl: string; blob: Blob }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawData = e.target?.result as string;
      if (!rawData) {
        reject(new Error('Failed to read image file'));
        return;
      }
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const blob = new Blob([file], { type: file.type || 'image/jpeg' });
          resolve({ dataUrl: rawData, blob });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ dataUrl, blob });
            } else {
              const fallbackBlob = new Blob([file], { type: file.type || 'image/jpeg' });
              resolve({ dataUrl, blob: fallbackBlob });
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => {
        const blob = new Blob([file], { type: file.type || 'image/jpeg' });
        resolve({ dataUrl: rawData, blob });
      };
      img.src = rawData;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Legacy compatibility helper for compressImageFile.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<string> {
  const result = await compressImage(file, maxWidth, maxHeight, quality);
  return result.dataUrl;
}

/**
 * Uploads an image file with multi-tier permanent storage:
 * Tier 1: Firebase Storage (Permanent Google Cloud Storage bucket, CDN cached, never wiped)
 * Tier 2: Local server storage at /api/upload (returns /uploads/... URL)
 * Tier 3: Compact web-optimized data URL (< 50KB, stored directly in Firestore document)
 */
export async function uploadImageFile(file: File, folder = 'uploads'): Promise<string> {
  let dataUrl = '';
  let blob: Blob | null = null;

  try {
    const compressed = await compressImage(file, 1200, 1200, 0.82);
    dataUrl = compressed.dataUrl;
    blob = compressed.blob;
  } catch (e) {
    console.warn('Canvas compression error, using raw file:', e);
    blob = file;
    dataUrl = await fileToDataUrl(file);
  }

  // Tier 1: Upload directly to Firebase Storage
  if (blob) {
    try {
      const cleanName = (file.name || 'image')
        .replace(/[^a-zA-Z0-9_.-]/g, '_')
        .replace(/\.[^/.]+$/, '');
      const filename = `${folder}/${Date.now()}_${cleanName}.jpg`;
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, blob, {
        contentType: 'image/jpeg',
        cacheControl: 'public,max-age=31536000'
      });
      const downloadURL = await getDownloadURL(snapshot.ref);
      if (downloadURL && downloadURL.startsWith('http')) {
        return downloadURL;
      }
    } catch (storageErr) {
      handleStorageError(storageErr, 'uploadBytes', `${folder}/${file.name}`);
      console.warn('[Upload] Firebase Storage upload error, falling back to server /api/upload:', storageErr);
    }
  }

  // Tier 2: Upload to server API /api/upload
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: dataUrl,
        filename: file.name,
        folder
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        return data.url;
      }
    }
  } catch (serverErr) {
    console.warn('[Upload] Server upload endpoint unreachable, falling back to data URL:', serverErr);
  }

  // Tier 3: High compression fallback (< 50KB to safely fit in Firestore & LocalStorage)
  if (dataUrl) {
    if (dataUrl.length > 100000) {
      try {
        const compact = await compressImage(file, 600, 600, 0.68);
        return compact.dataUrl;
      } catch {
        return dataUrl;
      }
    }
    return dataUrl;
  }

  return await fileToDataUrl(file);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const uploadProductImage = async (file: File, folder = 'products'): Promise<string> => {
  return uploadImageFile(file, folder);
};

export const deleteProductImage = async (fileUrl: string): Promise<void> => {
  try {
    if (!fileUrl) return;
    if (fileUrl.includes('firebasestorage.googleapis.com')) {
      const decodedUrl = decodeURIComponent(fileUrl);
      const startIndex = decodedUrl.indexOf('/o/') + 3;
      const endIndex = decodedUrl.indexOf('?');
      if (startIndex !== -1 && endIndex !== -1) {
        const filePath = decodedUrl.substring(startIndex, endIndex);
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
      }
    }
  } catch (error) {
    console.warn("Could not delete image from Firebase Storage:", error);
  }
};
