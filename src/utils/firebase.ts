import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface OrderInquiryData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productTitle: string;
  quantity: number;
  specifications?: string;
  notes?: string;
  totalAmount?: number;
  createdAt?: string;
}

export interface SupportLogData {
  customerName: string;
  customerPhone: string;
  queryType: string;
  message: string;
  channel: 'whatsapp' | 'email' | 'phone' | 'help-center';
  createdAt?: string;
}

/**
 * Synchronizes an order inquiry directly into Firestore under 'order_inquiries' collection.
 * Falls back to local storage if Firestore quota is exhausted.
 */
export async function syncOrderInquiry(data: OrderInquiryData): Promise<string> {
  const inquiryId = `inq-${Date.now()}`;
  try {
    const docRef = doc(db, 'order_inquiries', inquiryId);
    const payload = {
      id: inquiryId,
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      timestamp: serverTimestamp()
    };
    await setDoc(docRef, payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'order_inquiries');
    // Store in local storage queue so inquiry is never lost
    try {
      const raw = localStorage.getItem('shivani_cached_inquiries');
      const list = raw ? JSON.parse(raw) : [];
      list.push({ id: inquiryId, ...data, createdAt: new Date().toISOString() });
      localStorage.setItem('shivani_cached_inquiries', JSON.stringify(list));
    } catch {}
    return inquiryId;
  }
}

/**
 * Synchronizes a customer support log directly into Firestore under 'support_logs' collection.
 * Falls back to local storage if Firestore quota is exhausted.
 */
export async function syncSupportLog(data: SupportLogData): Promise<string> {
  const logId = `log-${Date.now()}`;
  try {
    const docRef = doc(db, 'support_logs', logId);
    const payload = {
      id: logId,
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      timestamp: serverTimestamp()
    };
    await setDoc(docRef, payload);
    return logId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'support_logs');
    try {
      const raw = localStorage.getItem('shivani_cached_support_logs');
      const list = raw ? JSON.parse(raw) : [];
      list.push({ id: logId, ...data, createdAt: new Date().toISOString() });
      localStorage.setItem('shivani_cached_support_logs', JSON.stringify(list));
    } catch {}
    return logId;
  }
}

export { db, auth, storage, handleFirestoreError, OperationType } from '../firebase';
