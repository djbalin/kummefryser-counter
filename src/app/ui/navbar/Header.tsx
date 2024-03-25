"use client";
import { getCookie } from "cookies-next";
import Navbar from "./Navbar";

export default function Header() {
  const user = getCookie("user_id");

  return (
    <header
      id="header"
      className="flex sticky left-0 top-0 flex-row py-1 items-center justify-around bg-slate-600 bg-opacity-50"
    >
      {user ? (
        <Navbar user={user.valueOf()}></Navbar>
      ) : (
        <Navbar user={undefined}></Navbar>
      )}
    </header>
  );
}
