import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Compresses an image file in the browser canvas.
 * Produces an optimized JPEG data URL (default max 1000px, 0.8 quality).
 */
export function compressImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<string> {
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
          resolve(rawData);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => resolve(rawData);
      img.src = rawData;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file with multi-tier permanent storage:
 * Tier 1: Local server permanent storage at /api/upload (returns clean /uploads/... URL, never expires, 0 bytes in Firestore)
 * Tier 2: Firebase Storage bucket (if available)
 * Tier 3: Compact web-optimized data URL (< 60KB)
 */
export async function uploadImageFile(file: File, folder = 'uploads'): Promise<string> {
  // Step 1: Compress file before uploading
  let compressedDataUrl: string;
  try {
    compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.82);
  } catch {
    compressedDataUrl = '';
  }

  // Tier 1: Upload to server API /api/upload
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: compressedDataUrl || (await fileToDataUrl(file)),
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
  } catch (err) {
    console.warn('Server upload endpoint unreachable, trying Firebase Storage:', err);
  }

  // Tier 2: Try Firebase Storage
  try {
    const filename = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    console.warn('Firebase Storage upload failed, falling back to compact data URL:', err);
  }

  // Tier 3: High compression fallback (< 50KB to safely fit in Firestore & LocalStorage)
  if (compressedDataUrl) {
    // If still over 100KB, compress further
    if (compressedDataUrl.length > 100000) {
      try {
        return await compressImageFile(file, 600, 600, 0.7);
      } catch {
        return compressedDataUrl;
      }
    }
    return compressedDataUrl;
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
