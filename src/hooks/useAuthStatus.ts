import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return isLoggedIn;
};