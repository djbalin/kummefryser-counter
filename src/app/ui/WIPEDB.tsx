"use client";
import { useState } from "react";
import { useAuthContext } from "../contexts/auth_context";
import { placeholderData } from "../lib/placeholderData";
import { useRouter } from "next/navigation";
import {
  addCategoryToDB,
  addItemToDB,
  deleteCollectionAndSubcollections,
} from "../lib/db/firebase";

export default function WipeDB() {
  const authContext = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function resetDB() {
    try {
      if (authContext.user != null) {
        setLoading(true);
        deleteCollectionAndSubcollections("items", authContext.user!.uid);
        deleteCollectionAndSubcollections("categories", authContext.user!.uid);
        await Promise.all(
          placeholderData.map(async (item) => {
            try {
              await addItemToDB(item, authContext.user!.uid);
              await addCategoryToDB(item.category, authContext.user!.uid);
            } catch (error) {
              console.log("Error");
              console.log(error);
            }
          })
        );
      } else {
        throw new Error("No authenticated user");
      }
      setLoading(false);
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="">
      {loading && (
        <div className="absolute flex cursor-not-allowed justify-center top-[30%] left-0 w-full h-[300vh] bg-[rgba(255,255,255,0.5)]">
          <p className="absolute flex text-2xl rounded-[10rem] justify-center items-center py-auto  w-[20%] h-[10%] bg-black opacity-100">
            Resetting database...
          </p>
        </div>
      )}
      <button
        onClick={resetDB}
        className="border-4 items-center h-16 w-auto justify-center px-4 flex my-4 rounded-md border-purple-500 border-opacity-70"
      >
        RESET DB
      </button>
    </div>
  );
}
