"use client";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { resetDB } from "../lib/actions";

export default function WipeDB({ isExample }: { isExample: boolean }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="absolute flex cursor-not-allowed justify-center left-0 w-full h-[170vh] top-0 bg-[rgba(255,255,255,0.5)]">
          <p className="absolute flex top-[50vh] text-2xl rounded-[10rem] justify-center items-center py-auto  w-[20%] h-[10%] bg-black opacity-100">
            Resetting database...
          </p>
        </div>
      )}
      <form
        action={async () => {
          let uid: string;
          isExample
            ? (uid = "_EXAMPLE")
            : (uid = getCookie("user_id")!.valueOf());
          await resetDB(uid);
          setLoading(false);
        }}
      >
        <button
          type="submit"
          onClick={() => {
            setLoading(true);
          }}
          className="border-4 items-center h-16 w-auto justify-center px-4 flex my-4 rounded-md border-purple-500 border-opacity-70"
        >
          {isExample ? "RESET EXAMPLE DATABASE" : "RESET MY DATABASE"}
        </button>
      </form>
    </>
  );
}
