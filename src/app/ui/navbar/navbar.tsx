"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import {
  handleSignOut,
  revalidateAndRedirectDashboard,
} from "@/app/lib/actions";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/lib/firebase/firebase";
import { useState } from "react";
import Modal from "../Modal";

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
export default function Navbar({ user: uid }: { user: string | undefined }) {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  return (
    <nav className="flex flex-row text-center items-center justify-end gap-x-24 w-full sm:w-[60%] h-full">
      {loggingIn && (
        <div className="absolute top-0 left-0 text-3xl  min-w-[100%] min-h-screen bg-slate-800 bg-opacity-80">
          <Modal text={"Logging you in..."}></Modal>
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
              await handleSignOut("/example");
              setCookie("user_id", "_EXAMPLE");
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
