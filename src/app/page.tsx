import Image from "next/image";

import img1 from "@/app/public/example_dashboard.png";
import img2 from "@/app/public/create_item.png";
import ActionButtons from "./ui/ActionButtons";
export default function Home() {
  return (
    <main className="landing min-h-full  sm:py-24 py-12 sm:px-8">
      <div className="w-full mx-auto flex flex-col justify-between max-w-7xl">
        <section className="items-center pt-8 justify-center flex flex-col text-center w-full">
          <h1 className="text-6xl md:text-8xl pb-24 lg:pb-32 text-[rgb(255,228,164)] tracking-normal font-extrabold">
            FREEZER TRACKER
          </h1>
          <div className="flex pb-1 lg:pb-3 w-min">
            <span className="animate-typing xxs:text-sm text-xs xs:text-base sm:text-lg md:text-3xl font-mono tracking-wider w-0 overflow-hidden whitespace-nowrap   border-r-2 border-r-transparent">
              Your freezer, at your fingertips.
            </span>
          </div>
          <div className="flex w-min lg:pb-24">
            <span className="animate-typingDelayed xxs:text-sm text-xs text-xs xs:text-base sm:text-lg md:text-3xl font-mono tracking-wider px-auto w-0 overflow-hidden whitespace-nowrap border-r-2 border-r-transparent">
              Never throw out food again!
            </span>
          </div>
        </section>

        <section className="pt-32 min-w-full flex gap-y-16  flex-col">
          <div className="flex flex-col xl:flex-row justify-between gap-x-8 ">
            <ul className="flex px-1 gap-x-8 sm:gap-x-16 pb-4 sm:pb-8 xl:pb-0 xl:gap-x-0 order-first xl:order-last flex-row w-full xl:max-w-md xl:flex-col text-center text-sm leading-4 sm:text-xl xl:text-2xl xl:pt-16 xl:gap-y-16">
              <li>
                Get an overview of the items in your freezer and know when they
                expire.
              </li>
              <li>Food items are ordered and colored by time until expiry.</li>
            </ul>
            <div
              id="top_landing_image"
              className="w-full order-last xl:order-first"
            >
              <Image
                className="mx-auto"
                src={img1}
                quality={75}
                width={1200}
                height={800}
                placeholder="blur"
                alt={""}
              ></Image>
            </div>
          </div>

          <div className="w-full  py-10 items-center justify-evenly flex flex-row ">
            <ActionButtons></ActionButtons>
          </div>

          <div className="flex flex-col xl:flex-row justify-between gap-x-8 ">
            <ul className="flex justify-center gap-x-16 pb-8 xl:pb-0 xl:gap-x-0 flex-row w-full xl:max-w-md xl:flex-col text-center text-xl xl:text-2xl xl:pt-16 xl:gap-y-16">
              <li>Add items to your freezer in a matter of seconds.</li>
            </ul>
            <div id="second_landing_image" className=" w-full">
              <Image
                className="mx-auto"
                src={img2}
                quality={75}
                width={800}
                height={800}
                alt={""}
              ></Image>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
