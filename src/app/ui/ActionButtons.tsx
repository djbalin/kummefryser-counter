"use client";
import Link from "next/link";
import { handleSignIn } from "./navbar/Navbar";
import Modal from "./Modal";
import { useState } from "react";

export default function ActionButtons() {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  return (
    <div className="flex flex-row w-full lg:max-w-3xl lg:gap-x-16 overflow-clip gap-x-4 px-2">
      <Link className="w-1/2" href={"/example"}>
        <button className="bg-gradient-to-r w-full  from-orange-400 to-orange-800  sm:text-xl font-medium px-2 py-4 sm:p-4 sm:px-8 rounded-full text-center">
          <span className="drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
            TRY EXAMPLE FREEZER
          </span>
        </button>
      </Link>
      {loggingIn ? <Modal text={"Logging you in ..."} /> : <></>}

      <button
        onClick={async () => {
          setLoggingIn(true);
          await handleSignIn();
          setLoggingIn(false);
        }}
        className="bg-gradient-to-r  from-lime-600 to-green-800 sm:text-xl w-1/2 font-medium px-2 py-4 sm:p-4 sm:px-8 scale-110 rounded-full text-center"
      >
        <span className="drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
          CREATE YOUR OWN FREEZER
        </span>
      </button>
    </div>
  );
}
