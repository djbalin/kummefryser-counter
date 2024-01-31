"use client";
// import { cookies } from "next/headers";
import Navbar from "./navbar";
import Image from "next/image";
import topimg from "@/app/public/freezer2.webp";
import Link from "next/link";
import { getCookie } from "cookies-next";

export default function Header() {
  // const user = cookies().get("user_id");
  const user = getCookie("user_id");

  return (
    <header
      id="header"
      className="flex flex-row h-16 w-[100vw] items-center justify-around bg-slate-600 bg-opacity-50"
    >
      <Link href={"/"}>
        <Image src={topimg} className="w-16 h-16" alt={""}></Image>
      </Link>
      {user ? (
        <Navbar user={user.valueOf()}></Navbar>
      ) : (
        <Navbar user={undefined}></Navbar>
      )}
    </header>
  );
}
