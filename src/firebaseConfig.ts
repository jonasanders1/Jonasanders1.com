// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jonasanders1-com.firebaseapp.com", 
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// Initialize Github Provider
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");

// Github sign in function
export const handleGithubSignIn = async (
  navigate: (path: string) => void,
  setLoginFailed: (value: boolean) => void
) => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const token = result.user.providerData[0].uid;
    if (token === import.meta.env.VITE_GITHUB_ADMIN_USERNAME) {
      navigate("/");
    } else {
      await signOut(auth);
      setLoginFailed(true);
    }
  } catch (error) {
    console.error(error);
    setLoginFailed(true);
  }
};

export const handleGithubSignOut = async (navigate: (path: string) => void) => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

// Add this function to handle image uploads
export const uploadProjectImage = async (image: File) => {
  try {
    const storageRef = ref(storage, `project-images/${Date.now()}-${image.name}`);
    const uploadResult = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Remove redundant default export since we're using named exports
