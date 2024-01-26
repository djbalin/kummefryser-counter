"use client";
import { useAuthContext } from "@/app/contexts/auth_context";
import { handleSignInGooglePopup } from "@/app/lib/actions";
import { auth, signInGooglePopup } from "@/app/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavLogin({ login }: { login: boolean }) {
  const router = useRouter();
  const authContext = useAuthContext();

  //   const contextUser = authContext.user;
  const [user2, loading] = useAuthState(auth);
  return (
    <>
      {user2 ? <span>hello {user2.displayName}</span> : "nooo"}
      {authContext.user ? (
        <span>AUTHCONTEXT hello: {authContext.user.displayName}</span>
      ) : (
        "nooo"
      )}
      {login ? (
        // <form action={handleSignInGooglePopup}>
        //   <button type="submit">LOGIN</button>
        // </form>

        <div
          onClick={async () => {
            //   await handleSignInGooglePopup();
            // await signInGooglePopup();
            await authContext.googleSignIn("/");
            // revalidatePath("/", "layout");
            // router.push("/");
          }}
          className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
        >
          Log in
        </div>
      ) : (
        <div
          onClick={async () => {
            authContext.logOut();
            // await googleLogOut();
            // revalidatePath("/", "layout");
            // router.push("/");
          }}
          className="w-auto hover:scale-110 hover:duration-150 hover:ease-in-out flex items-center h-full"
        >
          Log out {auth.currentUser?.uid}
        </div>
      )}
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
