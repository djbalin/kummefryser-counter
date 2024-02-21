"use client";
import Link from "next/link";
import { CookieValueTypes, setCookie } from "cookies-next";
import {
  handleSignOut,
  revalidateAndRedirectDashboard,
} from "@/app/lib/actions";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/lib/firebase/config";
import { useState } from "react";

export async function handleSignIn(): Promise<void> {
  try {
    const result = await signInWithPopup(auth, provider);
    setCookie("user_id", result.user.uid, {
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 24 * 14,
    });
    await revalidateAndRedirectDashboard();
  } catch (error) {
    console.error("Error occurred while signing in from the client:");
    console.log(error);
  }
}
// export default function Navbar({ user: uid }: { user: string | undefined }) {
export default function Navbar({ user }: { user: CookieValueTypes }) {
  const uid = user?.valueOf();
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  return (
    <nav className="flex flex-row text-center cursor-progress items-center justify-evenly w-full sm:w-[60%] h-full">
      {loggingIn && (
        <div className="absolute top-0 left-0 text-3xl  min-w-[100%] min-h-screen bg-slate-800 bg-opacity-80">
          <span className="absolute top-[30%] items-center justify-center flex left-[40%] rounded-xl bg-slate-700 bg-opacity-90 px-4 w-72 h-24">
            Logging you in...
          </span>
        </div>
      )}
      {loggingOut && (
        <div className="absolute top-0 left-0 text-3xl  min-w-[100%] min-h-screen bg-slate-800 bg-opacity-80">
          <span className="absolute top-[30%] items-center justify-center flex left-[40%] rounded-xl bg-slate-700 bg-opacity-90 px-4 w-72 h-24">
            Logging you out...
          </span>
        </div>
      )}

      <Link className="navitem " href={"/example"}>
        Example freezer
      </Link>
      {uid && uid != "_EXAMPLE" ? (
        <>
          <Link className="navitem" href={"/dashboard"}>
            My freezer
          </Link>
          <form
            action={async () => {
              setCookie("user_id", "_EXAMPLE");
              await handleSignOut("/example");
              setLoggingOut(false);
            }}
          >
            <button
              type="submit"
              className="navitem"
              onClick={() => setLoggingOut(true)}
            >
              Log out
            </button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            await handleSignIn();
            setLoggingIn(false);
          }}
        >
          <button
            type="submit"
            className="navitem"
            onClick={() => setLoggingIn(true)}
          >
            Log in
          </button>
        </form>
      )}
    </nav>
  );
}
