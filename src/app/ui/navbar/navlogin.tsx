"use client";
import { useAuthContext } from "@/app/contexts/auth_context";
import { handleSignInGooglePopup } from "@/app/lib/actions";
import { signInGooglePopup } from "@/app/lib/firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { revalidatePath } from "next/cache";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";

export default function NavLogin({ title }: { title: string }) {
  const router = useRouter();
  //   const authContext = useAuthContext();

  //   const contextUser = authContext.user;
  console.log("NAVLOGIN RENDERED");

  return (
    <>
      {/* {!user ? ( */}
      <div
        onClick={async () => {
          //   await handleSignInGooglePopup();
          await signInGooglePopup();
          // revalidatePath("/", "layout");
          router.push("/dashboard");
        }}
        className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
      >
        {title}
      </div>
      {/* {!contextUser ? (
        <div
          onClick={async () => {
            await handleSignInGooglePopup();
            // await signInGooglePopup();
            // revalidatePath("/", "layout");
            router.push("/dashboard");
          }}
          className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
        >
          {title}
        </div>
      ) : (
        <div
          onClick={async () => {
            // await googleLogOut();
            // revalidatePath("/", "layout");
            router.push("/");
          }}
          className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
        >
          Log out
        </div>
      )} */}
    </>
  );
}

{
  /* {
  userr ? (
    <div
      onClick={() => signInGooglePopup()}
      className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
    >
      Log in
    </div>
  ) : (
    <div
      onClick={() => signInGooglePopup()}
      className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
    >
      Log in
    </div>
  );
} */
}
