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
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <nav className="flex flex-row text-center items-center justify-evenly w-full sm:w-[60%] h-full">
      {loading ? (
        <div className="absolute w-full h-full bg-slate-800 bg-opacity-80">
          LOGGING OUT
        </div>
      ) : (
        <></>
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
              setLoading(true);
              await handleSignOut();
              setCookie("user_id", "_EXAMPLE");
              setLoading(false);
            }}
          >
            <button
              type="submit"
              className="navitem"
              onClick={() => setLoading(true)}
            >
              Log out(form)
            </button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            await handleSignIn();
            setLoading(false);
          }}
        >
          <button
            type="submit"
            className="navitem"
            onClick={() => setLoading(true)}
          >
            Log in
          </button>
        </form>
      )}
    </nav>
  );
}
