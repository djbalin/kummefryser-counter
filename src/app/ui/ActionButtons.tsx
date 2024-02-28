"use client";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { auth, provider } from "../lib/firebase/firebase";

export default function ActionButtons() {
  return (
    <>
      <Link href={"/example"}>
        <button className="bg-gradient-to-r  from-orange-400 to-orange-800 text-lg font-medium py-4 px-6 rounded-full text-center">
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            TRY EXAMPLE FREEZER
          </span>
        </button>
      </Link>
      <button
        onClick={async () => await signInWithPopup(auth, provider)}
        className="bg-gradient-to-r  from-lime-600 to-green-800 text-lg font-medium p-4 rounded-full text-center"
      >
        <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          CREATE YOUR OWN FREEZER
        </span>
      </button>
    </>
  );
}
