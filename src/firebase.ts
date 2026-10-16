import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  code?: string;
  operationType: OperationType;
  path: string | null;
  timestamp: string;
  online: boolean;
  databaseId?: string;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Global in-memory and session tracking for quota limits
let _quotaExceeded = false;
try {
  if (typeof window !== 'undefined' && sessionStorage.getItem('firestore_quota_exceeded') === 'true') {
    _quotaExceeded = true;
  }
} catch {}

export function isFirestoreQuotaExceeded(): boolean {
  return _quotaExceeded;
}

export function setFirestoreQuotaExceeded(val: boolean): void {
  _quotaExceeded = val;
  try {
    if (typeof window !== 'undefined') {
      if (val) sessionStorage.setItem('firestore_quota_exceeded', 'true');
      else sessionStorage.removeItem('firestore_quota_exceeded');
    }
  } catch {}
}

/**
 * Comprehensive error logger for Firebase Firestore failures.
 * Gracefully handles 'resource-exhausted' (daily free read limits) without throwing fatal UI errors.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): FirestoreErrorInfo {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = (error as any)?.code || 'unknown';

  const isQuota = 
    errorCode === 'resource-exhausted' || 
    errorMessage.toLowerCase().includes('quota limit exceeded') ||
    errorMessage.toLowerCase().includes('free daily read units');

  if (isQuota) {
    setFirestoreQuotaExceeded(true);
  }

  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    code: errorCode,
    operationType,
    path,
    timestamp: new Date().toISOString(),
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    databaseId: (firebaseConfig as any).firestoreDatabaseId,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    }
  };

  if (isQuota) {
    // Log as a graceful fallback notice instead of fatal error
    console.warn('[Firebase Firestore Quota Fallback Notice]', {
      operation: operationType.toUpperCase(),
      path,
      code: errorCode,
      message: 'Firestore daily free read quota reached. App is seamlessly operating in Local & Offline Cache mode.'
    });
  } else {
    console.error('[Firebase Firestore Error Details]', {
      operation: operationType.toUpperCase(),
      path,
      code: errorCode,
      message: errorMessage,
      diagnostics: errInfo
    });
  }

  return errInfo;
}

/**
 * Comprehensive error logger for Firebase Storage upload/deletion failures.
 */
export function handleStorageError(error: unknown, action: string, path: string): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = (error as any)?.code || 'unknown';

  console.error('[Firebase Storage Error]', {
    action,
    path,
    code: errorCode,
    message: errorMessage,
    bucket: (firebaseConfig as any).storageBucket,
    timestamp: new Date().toISOString()
  });
}
