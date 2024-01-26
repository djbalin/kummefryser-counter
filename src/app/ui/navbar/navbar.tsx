import Navitem from "./navitem";
// import { handleSignIn } from "@/app/lib/actions";
import { signInWithPopup } from "firebase/auth";
import NavLogin from "./navlogin";
import { cookies } from "next/headers";
import { unstable_noStore } from "next/cache";
import {
  handleSignInGooglePopup,
  revalidateTest,
  signOutGoogle,
} from "@/app/lib/actions";

export default async function Navbar() {
  // unstable_noStore();
  // const authContext = useAuthContext();
  // handleSignIn;
  const user = cookies().get("USER");
  console.log("Navbar render");

  return (
    <div className="w-[100vw] h-min bg-slate-400 bg-opacity-50 px-32">
      <ul className="flex flex-row py-2 items-center justify-evenly bg-red-400 h-full">
        <Navitem title={"Home"} destination={"/"}></Navitem>
        {/* {idT ? idT : "no idt"}
        {idT2 ? idT2.toString() : "no idt2"} */}
        <form action={revalidateTest}>
          <button type="submit">Reval test</button>
        </form>
        {user ? (
          <>
            <Navitem title={"My freezer"} destination={"/dashboard"}></Navitem>
            <Navitem title={"Profile"} destination={"/profile"}></Navitem>
            <NavLogin login={false}></NavLogin>
          </>
        ) : (
          <NavLogin login={true}></NavLogin>
          // <form action={signInGooglePopup}>
          //   <button type="submit">Log in</button>
          // </form>
          // <NavLogin title={"Log in"} user={user}></NavLogin>
        )}
      </ul>
    </div>
  );
}
