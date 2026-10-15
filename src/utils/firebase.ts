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
 */
export async function syncOrderInquiry(data: OrderInquiryData): Promise<string> {
  try {
    const inquiryId = `inq-${Date.now()}`;
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
    throw error;
  }
}

/**
 * Synchronizes a customer support log directly into Firestore under 'support_logs' collection.
 */
export async function syncSupportLog(data: SupportLogData): Promise<string> {
  try {
    const logId = `log-${Date.now()}`;
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
    throw error;
  }
}

export { db, auth, storage, handleFirestoreError, OperationType } from '../firebase';
