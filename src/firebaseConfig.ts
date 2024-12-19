// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCG091aBE0frA2rTnSXGx_puWiu_4ip4w",
  authDomain: "jonasanders1-com.firebaseapp.com",
  projectId: "jonasanders1-com",
  storageBucket: "jonasanders1-com.firebasestorage.app",
  messagingSenderId: "627525655859",
  appId: "1:627525655859:web:95650c08d165b05e7f3246",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Github Provider
export const githubProvider = new GithubAuthProvider();

// Github sign in function
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with Github:", error);
    throw error;
  }
};

export default { db, auth, signInWithGithub };
