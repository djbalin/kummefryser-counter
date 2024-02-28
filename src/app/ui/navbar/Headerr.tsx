"use client";
// import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import Navbar from "./Navbarr";

export default function Header() {
  const user = getCookie("user_id");

  return (
    <header
      id="header"
      className="flex flex-row py-1 items-center justify-around bg-slate-600 bg-opacity-50"
    >
      {/* <Link href={"/"}>
        <Image src={topimg} className="w-16 h-16" alt={""}></Image>
      </Link> */}
      {user ? (
        <Navbar user={user.valueOf()}></Navbar>
      ) : (
        <Navbar user={undefined}></Navbar>
      )}
    </header>
  );
}
