import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  isFirebaseConfigured, 
  syncDatabase, 
  DBUser 
} from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

interface AuthContextType {
  user: any | null; // Can be FirebaseUser or mock user object
  userData: DBUser | null;
  loading: boolean;
  isMock: boolean;
  loginWithGoogle: () => Promise<void>;
  loginMock: (email: string) => Promise<boolean>;
  signup: (fullName: string, email: string, phone: string) => Promise<void>;
  updatePhone: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(!isFirebaseConfigured);

  // Monitor Auth state (Firebase or fallback local state)
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          setIsMock(false);
          // Fetch additional profile fields from Firestore
          const profile = await syncDatabase.getUser(firebaseUser.uid);
          if (profile) {
            setUserData(profile);
          } else {
            // Placeholder: they may need to enter their phone number
            setUserData({
              userId: firebaseUser.uid,
              fullName: firebaseUser.displayName || 'S R Customer',
              email: firebaseUser.email || '',
              phone: '', // Needs to be completed
              createdAt: new Date().toISOString()
            });
          }
        } else {
          setUser(null);
          setUserData(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // LocalStorage Mock session restore
      const savedSession = localStorage.getItem("sr_rental_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
        setIsMock(true);
        syncDatabase.getUser(parsed.userId).then((profile) => {
          setUserData(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, []);

  // Google SSO
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error("Firebase is not fully configured yet.");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    
    // Check if profile exists
    const profile = await syncDatabase.getUser(firebaseUser.uid);
    if (!profile) {
      const newProfile: DBUser = {
        userId: firebaseUser.uid,
        fullName: firebaseUser.displayName || 'Customer',
        email: firebaseUser.email || '',
        phone: '', // Let them complete
        createdAt: new Date().toISOString()
      };
      setUserData(newProfile);
    } else {
      setUserData(profile);
    }
  };

  // Login Mock User as offline alternative
  const loginMock = async (email: string): Promise<boolean> => {
    const users = syncDatabase.getLocalUsers();
    const foundUser = Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser({
        uid: foundUser.userId,
        userId: foundUser.userId,
        email: foundUser.email,
        displayName: foundUser.fullName
      });
      setUserData(foundUser);
      setIsMock(true);
      localStorage.setItem("sr_rental_session", JSON.stringify({
        userId: foundUser.userId,
        email: foundUser.email,
        fullName: foundUser.fullName
      }));
      return true;
    }
    return false;
  };

  // Sign up new user (covers both database states)
  const signup = async (fullName: string, email: string, phone: string) => {
    const generatedUid = "user_" + Math.random().toString(36).substring(2, 11);
    
    const newProfile: DBUser = {
      userId: generatedUid,
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && auth) {
      // Note: Full sign up with email and password in Firebase is possible, 
      // but standard is Google Auth. We can create the User profile directly in Firestore 
      // under generated/registered uid and save it locally for persistence
      setUser({
        uid: generatedUid,
        userId: generatedUid,
        email,
        displayName: fullName
      });
      await syncDatabase.saveUser(newProfile);
      setUserData(newProfile);
    } else {
      // Local Mock flow
      await syncDatabase.saveUser(newProfile);
      setUser({
        uid: generatedUid,
        userId: generatedUid,
        email,
        displayName: fullName
      });
      setUserData(newProfile);
      localStorage.setItem("sr_rental_session", JSON.stringify({
        userId: generatedUid,
        email,
        fullName
      }));
    }
  };

  // Update/Complete profile phone number
  const updatePhone = async (phone: string) => {
    if (!userData) return;
    const updated = { ...userData, phone };
    await syncDatabase.saveUser(updated);
    setUserData(updated);
  };

  // Logout
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem("sr_rental_session");
      setUser(null);
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      isMock,
      loginWithGoogle,
      loginMock,
      signup,
      updatePhone,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
