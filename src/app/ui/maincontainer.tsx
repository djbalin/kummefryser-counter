import Image from "next/image";
import Link from "next/link";

// import { auth } from "./lib/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContextProvider, useAuthContext } from "../contexts/auth_context";
import Navbar from "./navbar/navbar";
import { cookies } from "next/headers";

export default function MainContainer() {
  // const { user, googleSignIn, logOut } = useAuthContext();
  const user = cookies().get("USER");
  return (
    // <AuthContextProvider>
    <>
      {/* <Navbar /> */}
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
        {/* <Login redirectPath={"/dashboard"}></Login> */}
        {/* <AuthContextProvider> */}
        {/* <Login redirectPath="/dashboard"></Login> */}
        <span>{user ? "yes user" : "no user"}</span>
        {user ? (
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
        {/* </AuthContextProvider> */}
      </main>
    </>
    // </AuthContextProvider>
  );
}
