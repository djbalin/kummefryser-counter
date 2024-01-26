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
import { redirect, useRouter } from "next/navigation";
import { auth, provider } from "../lib/firebase/firebase";
import { deleteCookie, setCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

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
    try {
      console.log("Signing in. auth.currentUser: " + auth.currentUser);
      const result = await signInWithPopup(auth, provider);
      console.log(
        "AFTER sign in. auth.currentUser.uid: " + auth.currentUser?.uid
      );
      setCookie("USER", result.user.uid);
      console.log("after reval path");
      router.push(redirectPath);

      // revalidatePath("/");
      // redirect("/dashboard");
    } catch (error) {
      console.log("ERROR");
      console.log(error);
      // alert("Eyyys");
    }
  }

  async function logOut() {
    await signOut(auth);
    deleteCookie("USER");
    router.push("/");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTH STATE CHANGED IN CONTEXT");

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
