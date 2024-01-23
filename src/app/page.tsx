// "use server";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "./contexts/auth_context";
import Login from "./ui/login";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Button } from "./ui/button";
import { auth } from "./lib/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      {/* <Login redirectPath={"/dashboard"}></Login> */}
      <Login redirectPath="/dashboard"></Login>
      {auth.currentUser ? (
        <Link href={"/dashboard"}>
          <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
            <span className="text-black text-3xl">My freezer</span>
          </div>
        </Link>
      ) : (
        <Link href={"/login"}>
          <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
            <span className="text-black text-3xl">Log in</span>
          </div>
        </Link>
      )}
      <Link href={"/example"}>
        <div className="flex items-center rounded-[2rem] p-4 justify-center w-full bg-orange-300">
          <span className="text-black text-3xl"> Example freezer</span>
        </div>
      </Link>
    </main>
  );
}
