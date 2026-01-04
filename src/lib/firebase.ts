import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error);
  }
}
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

// Google Sign In
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Email/Password Sign In
const signInWithEmailPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Email/Password Sign Up
const signUpWithEmailPassword = (
  email: string,
  password: string,
  displayName?: string
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      return userCredential;
    }
  );
};

// Password Reset
const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// Sign Out
const signOutFromGoogle = () => {
  return signOut(auth);
};

export {
  app,
  auth,
  db,
  storage,
  signInWithGoogle,
  signOutFromGoogle,
  signInWithEmailPassword,
  signUpWithEmailPassword,
  resetPassword,
};
export type { User };
