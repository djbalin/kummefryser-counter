"use client";

import sound from "@/app/public/opening.mp3";
import { useState, useEffect } from "react";

export default function AudioHolder() {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    setAudio(new Audio(sound));
    // only run once on the first render on the client
  }, []);
  audio?.addEventListener("canplay", (event) => {
    console.log("CAN PLAY AUDIO");
    document.getElementById("audioButtons")?.classList.add("audioReady");
    setBtnDisabled(false);
    // const btn = document.getElementById("yesPlayAudio");
    // btn?.setAttribute("disabled", "false");
    // console.log(btn?.getAttribute("disabled"));
  });
  console.log("HOLDER RENDER");

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
    <div id="audioButtons" className="flex flex-col z-10 opacity-0">
      <button
        disabled={btnDisabled}
        className="rounded-xl text-center  text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-serif tracking-wide sm:tracking-[0.2em] sm:px-8 py-4 mt-[65%] sm:mt-[25%] mb-32  sm:mb-64"
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
        className="rounded-xl text-slate-600 text-base p-4 "
        id="noPlayAudio"
      >
        (enter without audio)
      </button>
    </div>
    // <span
    //   id="audio"
    //   className="w-24 h-24 z-50"
    //   onClick={async () => await mySound.play()}
    // >
    //   AUDIOAUDIOAUDIOAUDIO
    // </span>
  );
}
