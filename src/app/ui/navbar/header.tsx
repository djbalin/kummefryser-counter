"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import {
//   signInWithGoogle,
//   signOut,
//   onAuthStateChanged,
// } from "@/src/lib/firebase/auth.ts";
// import { addFakeRestaurantsAndReviews } from "@/src/lib/firebase/firestore.js";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "@/app/lib/firebase/auth";

function useUserSession(initialUser: User | null) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: User) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser: User) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

export default function Header({ initialUser }: { initialUser: User | null }) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header>
      <Link href="/" className="logo">
        Friendly Eats
      </Link>
      {user ? (
        <>
          <div className="profile">
            <p>
              {/* <img src="/profile.svg" alt={user.email} /> */}
              {user.displayName}
              <br></br>
              {user.uid}
            </p>

            <div className="menu">
              ...
              <ul>
                <li>{user.displayName}</li>

                <li>
                  <a href="#" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <a href="#" onClick={handleSignIn}>
          Sign In with Google
        </a>
      )}
    </header>
  );
}
