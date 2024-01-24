"use client";
// "use server";

import { createContext, useContext, useEffect, useState } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase/firebase";

// type AuthContext = {
//   userContext: User | null;
//   setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
//   //   setCategoryContext: React.Dispatch<React.SetStateAction<string[]>>;
// };
type AuthContext = {
  user: User | null;
  // googleSignIn: () => void;
  googleSignIn: (redirectPath: string) => void;
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
  const router = useRouter();
  // function googleSignIn(): void {

  async function googleSignIn(redirectPath: string): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push(redirectPath);
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error);
      alert("Eyyys");
    }
  }

  async function logOut() {
    // console.log("LOGGIN OUT:)");

    await signOut(auth);
    router.push("/");
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
