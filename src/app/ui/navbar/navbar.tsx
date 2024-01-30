"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import {
  handleSignOut,
  revalidateAndRedirectDashboard,
} from "@/app/lib/actions";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/lib/firebase/firebase";

export default function Navbar({ user }: { user: string | undefined }) {
  async function handleSignIn(): Promise<void> {
    try {
      const result = await signInWithPopup(auth, provider);

      setCookie("user_id", result.user.uid, {
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 24 * 14,
      });
      revalidateAndRedirectDashboard();
    } catch (error) {
      console.error("Error occurred while signing in from the client:");
      console.log(error);
    }
  }

  return (
    <header className="w-[100vw] h-min bg-slate-600 bg-opacity-50 px-32">
      <nav className="flex flex-row py-1 items-center justify-evenly  h-full">
        <Link className="navitem " href={"/example"}>
          Example freezer
        </Link>
        {user ? (
          <>
            <Link className="navitem" href={"/dashboard"}>
              My freezer
            </Link>
            <Link className="navitem" href={"/profile"}>
              Profile
            </Link>

            <Link
              href="#"
              onClick={() => {
                handleSignOut();
              }}
              className="navitem"
            >
              Log out
            </Link>
          </>
        ) : (
          <Link
            href="#"
            onClick={() => {
              handleSignIn();
            }}
            className="navitem"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
