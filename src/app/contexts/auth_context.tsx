// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// import { signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth, provider } from "../lib/firebase/firebase";
// import { setCookie } from "cookies-next";

// type AuthContext = {
//   user: User | null;
//   googleSignIn: (redirectPath: string) => void;
// };

// const AuthContext = createContext<AuthContext | null>(null);

// export function AuthContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   async function googleSignIn(redirectPath: string): Promise<void> {
//     try {
//       const result = await signInWithPopup(auth, provider);

//       setCookie("user_id", result.user.uid, {
//         sameSite: "strict",
//         secure: true,
//         maxAge: 60 * 24 * 14,
//       });

//       router.push(redirectPath);
//     } catch (error) {
//       console.log("ERROR");
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{ user, googleSignIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext(): AuthContext {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within a AuthContextProvider");
//   }
//   return context;
// }
