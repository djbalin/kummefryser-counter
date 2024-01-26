import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/firebase";
import { User } from "firebase/auth";

// https://stackoverflow.com/questions/67410324/next-js-with-firebase-onauthstatechanged
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [user]);

  return { user, loading };
}
