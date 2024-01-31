"use client";

import Link from "next/link";
import { handleSignIn } from "./navbar/navbar";

export default function HomepageWelcome() {
  return (
    <section
      id="homepageWelcome"
      className="sm:absolute sm:m-0 h-full top-0 sm:w-[24rem] right-16 lg:right-32 text-center"
    >
      <div className="flex flex-col h-full sm:justify-center items-center gap-y-4 sm:gap-y-16">
        <button
          onClick={async () => await handleSignIn()}
          className="welcomeMessage w-full sm:h-24 bg-[rgb(0,255,0)] text-[rgb(255,0,0)] drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)]"
        >
          MY FREEZER
        </button>
        <Link className="w-full" href={"/example"}>
          <button className="welcomeMessage sm:h-24 w-full bg-[hsl(300,80%,40%)]  text-[hsla(118,100%,52%,1)] drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)]">
            EXAMPLE FREEZER
          </button>
        </Link>
      </div>
    </section>
  );
}
