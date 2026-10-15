import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadProductImage = async (file: File, folder = 'products'): Promise<string> => {
  try {
    const filename = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};

export const deleteProductImage = async (fileUrl: string): Promise<void> => {
  try {
    if (!fileUrl.includes('firebasestorage.googleapis.com')) return;
    const decodedUrl = decodeURIComponent(fileUrl);
    const startIndex = decodedUrl.indexOf('/o/') + 3;
    const endIndex = decodedUrl.indexOf('?');
    if (startIndex !== -1 && endIndex !== -1) {
      const filePath = decodedUrl.substring(startIndex, endIndex);
      const imageRef = ref(storage, filePath);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.warn("Could not delete image from Firebase Storage:", error);
  }
};
