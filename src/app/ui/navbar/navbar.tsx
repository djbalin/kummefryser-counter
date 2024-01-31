"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import {
  handleSignOut,
  revalidateAndRedirectDashboard,
} from "@/app/lib/actions";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/lib/firebase/firebase";
// import { useState } from "react";

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
export default function Navbar({ user }: { user: string | undefined }) {
  // export default function Navbar() {
  // const user = getCookie("user_id");
  // const [loggingOut, setLoggingOut] = useState<boolean>(false);

  return (
    //  {loggingOut ? (
    //   <div className="absolute w-full h-full bg-slate-800 bg-opacity-80">
    //     LOGGING OUT
    //   </div>
    // ) : (
    //   <></>
    // )}
    <nav className="flex flex-row text-center items-center justify-evenly w-full sm:w-[60%] h-full">
      <Link className="navitem " href={"/example"}>
        Example freezer
      </Link>
      {/* {user && user?.valueOf() != "_EXAMPLE" ? ( */}
      {user && user != "_EXAMPLE" ? (
        <>
          <Link className="navitem" href={"/dashboard"}>
            My freezer
          </Link>
          {/* <Link className="navitem" href={"/profile"}>
            Profile
          </Link> */}

          <Link
            href="#"
            onClick={async () => {
              // setLoggingOut(true);
              await handleSignOut();
              setCookie("user_id", "_EXAMPLE");
              // setLoggingOut(false);
            }}
            className="navitem"
          >
            Log out
          </Link>
        </>
      ) : (
        <Link
          href="#"
          onClick={async () => {
            await handleSignIn();
          }}
          className="navitem"
        >
          Log in
        </Link>
      )}
    </nav>
  );
}
