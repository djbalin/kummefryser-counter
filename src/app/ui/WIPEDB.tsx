"use client";
import { useState } from "react";
import { useAuthContext } from "../contexts/auth_context";
import { collection, doc, setDoc } from "firebase/firestore";
import { db_firebase } from "../lib/firebase/firebase";
import { placeholderData } from "../lib/placeholderData";

export default function WipeDB({
  wipeDBAndRefresh,
}: {
  wipeDBAndRefresh(): () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const authContext = useAuthContext();
  async function handleClick() {
    try {
      setLoading(true);
      if (authContext.user) {
        const docRef = doc(
          collection(db_firebase, `users/${authContext.user.uid}/items`)
        );
        console.log(authContext.user);

        // console.log(docRef);
        // console.log(placeholderData[0]);
        // console.log(auth);
        // console.log(auth.currentUser);
        const result = await setDoc(docRef, {
          ...placeholderData[0],
          id: docRef.id,
        });
        console.log(result);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // await wipeDBAndRefresh(authContext.user!.uid);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      {loading && (
        <div className="absolute flex items-center cursor-not-allowed justify-center top-0 left-0 w-full h-[150vh] bg-[rgba(255,255,255,0.5)]">
          <p className="absolute flex text-2xl rounded-[10rem] justify-center items-center py-auto  w-[20%] h-[10%] bg-black opacity-100">
            Resetting database...
          </p>
        </div>
      )}
      <button
        onClick={(e) => handleClick()}
        className="border-4 items-center h-16 w-auto justify-center px-4 flex my-4 rounded-md border-purple-500 border-opacity-70"
      >
        RESET DB
      </button>
    </div>
  );
}
