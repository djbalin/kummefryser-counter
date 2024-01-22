"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

import { auth } from "../lib/firebase/firebase";

// type AuthContext = {
//   userContext: User | null;
//   setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
//   //   setCategoryContext: React.Dispatch<React.SetStateAction<string[]>>;
// };
type AuthContext = {
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  //   setCategoryContext: React.Dispatch<React.SetStateAction<string[]>>;
};

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      // <AuthContext.Provider
      // value={{ userContext: user, setUserContext: setUser }}
      value={{ user, googleSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
