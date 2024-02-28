import Image from "next/image";

import img1 from "@/app/public/example_dashboard.png";
import img2 from "@/app/public/create_item.png";
import ActionButtons from "./ui/ActionButtons";
export default function Home() {
  return (
    <main className="landing min-h-full  sm:py-24 py-4 px-8">
      <div className="w-full mx-auto flex flex-col justify-between max-w-7xl">
        <section className="items-center justify-center flex flex-col text-center w-full">
          <h1 className="text-6xl  text-[rgb(255,228,164)] tracking-normal font-extrabold">
            FREEZER TRACKER
          </h1>
          <div className="w-min  pt-6 mx-auto">
            <p className="animate-typing w-0 opacity-0 overflow-hidden whitespace-nowrap text-xl bg-opacity-40 border-r-[0px] pr-1 border-r-white">
              Your freezer, at your fingertips. Never throw out food again!
            </p>
          </div>
        </section>
        {/* <p className="relative before:inset-0 before:bg-green-500 before:animate-typewriter  text-xl italic font-medium max-w-md text-center items-center text-slate-200 mt-8 tracking-tight">
          Your freezer, at your fingertips. Never throw out food again!
        </p> */}

        {/* <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
          Your freezer, at your fingertips. Never throw out food again!
        </h1> */}

        <section className="pt-32 min-w-full flex gap-y-16  flex-col">
          <div className="flex flex-col xl:flex-row justify-between gap-x-8 ">
            <ul className="flex gap-x-16 pb-8 xl:pb-0 xl:gap-x-0 order-first xl:order-last flex-row w-full xl:max-w-md xl:flex-col text-center text-xl xl:text-2xl xl:pt-16 xl:gap-y-16">
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
                // fill={true}
                quality={100}
                // objectFit="contain"
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
              {/* <li>Food items are ordered and colored by when they expire.</li> */}
            </ul>
            <div id="second_landing_image" className=" w-full">
              <Image
                className="mx-auto"
                src={img2}
                quality={100}
                width={800}
                height={800}
                alt={""}
              ></Image>
            </div>
          </div>
        </section>
      </div>
    </main>
    // </>
  );
}
