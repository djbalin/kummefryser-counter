"use client";
import { useAuthContext } from "../contexts/auth_context";
import { Button } from "./button";

export default function Login() {
  //   const authContext = useAuthContext();
  const { user, googleSignIn, logOut } = useAuthContext();

  return (
    <div className="">
      <Button onClick={(e) => googleSignIn()}>LOGIN</Button>
      <Button onClick={(e) => logOut()}>LOG OUT</Button>
      {user ? (
        <span>Logged in as: {user.displayName}</span>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
}
