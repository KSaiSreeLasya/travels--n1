import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

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
  operationType: OperationType;
  path: string | null;
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
  }
}

// Check if firebaseConfig contains real keys
export const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "");

let dbInstance: any = null;
let authInstance: any = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
    authInstance = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export const db = dbInstance;
export const auth = authInstance;

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Dynamic Mock database using LocalStorage
const LOCAL_STORAGE_USERS_KEY = "sr_rentals_users";
const LOCAL_STORAGE_INQUIRIES_KEY = "sr_rentals_inquiries";

export interface DBUser {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface DBInquiry {
  inquiryId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carId: string;
  carName: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalEstimate: number;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  whatsappSent: boolean;
  createdAt: string;
}

// Sync fallback helper
export const syncDatabase = {
  // --- USERS ---
  async saveUser(user: DBUser): Promise<void> {
    if (isFirebaseConfigured && db) {
      const path = `users/${user.userId}`;
      try {
        await setDoc(doc(db, 'users', user.userId), user);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    } else {
      const users = this.getLocalUsers();
      users[user.userId] = user;
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    }
  },

  async getUser(userId: string): Promise<DBUser | null> {
    if (isFirebaseConfigured && db) {
      const path = `users/${userId}`;
      try {
        const docSnap = await getDoc(doc(db, 'users', userId));
        if (docSnap.exists()) {
          return docSnap.data() as DBUser;
        }
        return null;
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
        return null;
      }
    } else {
      const users = this.getLocalUsers();
      return users[userId] || null;
    }
  },

  getLocalUsers(): Record<string, DBUser> {
    const data = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return data ? JSON.parse(data) : {};
  },

  // --- INQUIRIES ---
  async saveInquiry(inquiry: DBInquiry): Promise<void> {
    if (isFirebaseConfigured && db) {
      const path = `inquiries/${inquiry.inquiryId}`;
      try {
        await setDoc(doc(db, 'inquiries', inquiry.inquiryId), inquiry);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    } else {
      const inquiries = this.getLocalInquiries();
      inquiries.push(inquiry);
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
    }
  },

  async updateInquiryStatus(inquiryId: string, status: DBInquiry['status'], whatsappSent?: boolean): Promise<void> {
    if (isFirebaseConfigured && db) {
      const path = `inquiries/${inquiryId}`;
      try {
        const updateData: Partial<DBInquiry> = { status };
        if (whatsappSent !== undefined) {
          updateData.whatsappSent = whatsappSent;
        }
        await updateDoc(doc(db, 'inquiries', inquiryId), updateData);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    } else {
      const inquiries = this.getLocalInquiries();
      const updated = inquiries.map(item => {
        if (item.inquiryId === inquiryId) {
          return {
            ...item,
            status,
            ...(whatsappSent !== undefined ? { whatsappSent } : {})
          };
        }
        return item;
      });
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));
    }
  },

  async getInquiries(userId: string): Promise<DBInquiry[]> {
    if (isFirebaseConfigured && db) {
      const path = `inquiries`;
      try {
        const q = query(collection(db, 'inquiries'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const list: DBInquiry[] = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data() as DBInquiry);
        });
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
        return [];
      }
    } else {
      const inquiries = this.getLocalInquiries();
      return inquiries
        .filter(item => item.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  },

  getLocalInquiries(): DBInquiry[] {
    const data = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Listen to inquiries in real-time
  subscribeInquiries(userId: string, callback: (inquiries: DBInquiry[]) => void) {
    if (isFirebaseConfigured && db) {
      const path = `inquiries`;
      const q = query(collection(db, 'inquiries'), where('userId', '==', userId));
      return onSnapshot(q, (snapshot) => {
        const list: DBInquiry[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as DBInquiry);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(list);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      });
    } else {
      // For local storage, poll periodically or trigger callback
      const trigger = () => {
        const inquiries = this.getLocalInquiries()
          .filter(item => item.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(inquiries);
      };
      
      trigger();
      const interval = setInterval(trigger, 1500);
      return () => clearInterval(interval);
    }
  }
};
