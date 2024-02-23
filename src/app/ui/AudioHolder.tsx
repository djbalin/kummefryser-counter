"use client";

import sound from "@/app/public/fryser4_lowest.ogg";
import { useState, useEffect } from "react";

export default function AudioHolder() {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    setAudio(new Audio(sound));
    // only run once on the first render on the client
  }, []);
  audio?.addEventListener("canplay", (event) => {
    document.getElementById("audioButtons")?.classList.add("audioReady");
    setBtnDisabled(false);
    // const btn = document.getElementById("yesPlayAudio");
    // btn?.setAttribute("disabled", "false");
    // console.log(btn?.getAttribute("disabled"));
  });

  async function handleClick(playAudio: boolean) {
    if (playAudio) {
      await audio?.play();
    }
    const bgDeep = document.getElementById("backgroundDeep");
    const bgTop = document.getElementById("backgroundTop");
    const welcomeContent = document.getElementById("homepageWelcome");
    const blackOverlay = document.getElementById("blackOverlay");
    const audioButtons = document.getElementById("audioButtons");
    audioButtons?.classList.remove("audioReady");
    audioButtons?.classList.add("fadeOut2s");
    bgDeep?.classList.add("fadeIn3s");
    setTimeout(() => {
      welcomeContent?.classList.remove("hidden");
      blackOverlay?.classList.add("hidden");
      bgDeep?.classList.add("backgroundDeepAnimate");
      bgTop?.classList.add("backgroundTopAnimate");
      welcomeContent?.classList.add("welcomeAnimate");
    }, 3000);
  }

  return (
    <div className="absolute bg-red-100 bg-opacity-20 z-10 top-0 h-full w-full">
      <div
        id="audioButtons"
        className="flex  h-full w-full justify-evenly z-10 flex-col opacity-0"
      >
        <div></div>
        <button
          disabled={btnDisabled}
          className="rounded-xl text-center  text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-serif tracking-wide sm:tracking-[0.2em] sm:px-8 py-4 "
          //   className="rounded-xl text-center  text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-serif tracking-wide sm:tracking-[0.2em] sm:px-8 py-4 mt-[65%] sm:mt-[25%] mb-32  sm:mb-64"
          onClick={async () => {
            await handleClick(true);
          }}
          id="yesPlayAudio"
        >
          ENTER
        </button>
        <button
          onClick={async () => {
            await handleClick(false);
          }}
          className="rounded-xl text-slate-500 text-base p-4 "
          id="noPlayAudio"
        >
          (enter without audio)
        </button>
      </div>
    </div>
  );
}
