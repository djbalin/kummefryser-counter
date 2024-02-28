"use client";

import Link from "next/link";
import { handleSignIn } from "./navbar/Navbar";

export default function HomepageWelcome() {
  return (
    <section
      id="homepageWelcome"
      className="hidden absolute h-full top-0 left-0 min-w-[100%] right-32 text-center"
      // className="hidden absolute  sm:m-0 h-full top-0 sm:w-[24rem] right-16 lg:right-32 text-center"
    >
      <div className="flex flex-col h-full w-full justify-center lg:items-end lg:pr-24 items-center gap-y-8 sm:gap-y-32">
        <button
          onClick={async () => await handleSignIn()}
          className="welcomeMessage w-72 sm:w-[28rem] h-24 px-4 bg-[rgb(0,255,0)] text-[rgb(255,0,0)] drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)]"
        >
          MY FREEZER
        </button>
        <Link className=" " href={"/example"}>
          <button className="welcomeMessage w-72 sm:w-[28rem] px-4 h-24 bg-[hsl(300,80%,40%)]  text-[hsla(118,100%,52%,1)] drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)]">
            EXAMPLE FREEZER
          </button>
        </Link>
      </div>
    </section>
  );
}
