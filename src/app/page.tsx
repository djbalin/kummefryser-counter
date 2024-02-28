import Link from "next/link";
import AudioHolder from "./ui/AudioHolder";
import HomepageWelcome from "./ui/HomepageWelcome";
import Image from "next/image";

import img1 from "@/app/public/example_dashboard.png";
import img2 from "@/app/public/create_item.png";
import ActionButtons from "./ui/ActionButtons";
export default function Home() {
  return (
    <main className="landing min-h-full flex flex-col h-auto items-center justify-between sm:py-24  py-4">
      <div className="w-full max-w-6xl">
        <section className=" items-center justify-center flex flex-col text-center w-full">
          <h1 className="text-6xl text-[rgb(255,228,164)] tracking-normal font-extrabold">
            FREEZER TRACKER
          </h1>
          <p className="text-xl italic font-medium max-w-md text-center items-center text-slate-200 mt-8 tracking-tight">
            Your freezer, at your fingertips. Never throw out food again!
          </p>
        </section>
        <section className="pt-32 min-w-full flex gap-y-16  flex-col">
          <div className="flex flex-row justify-between gap-x-8 ">
            <div className="w-full">
              <Image src={img1} width={1000} height={800} alt={""}></Image>
            </div>
            <ul className="flex text-center text-2xl max-w-md pt-16 flex-col gap-y-16">
              <li>
                Get an overview of the items in your freezer and know when they
                expire.
              </li>
              <li>Food items are ordered and colored by time until expiry.</li>
            </ul>
          </div>

          <div className="w-full py-10 items-center justify-evenly flex flex-row ">
            <ActionButtons></ActionButtons>
          </div>

          <div className="flex flex-row justify-between gap-x-8 w-full items-center">
            <ul className="flex text-2xl max-w-sm text-center flex-col gap-y-8">
              <li>Add items to your freezer in a matter of seconds.</li>
              {/* <li>Food items are ordered and colored by when they expire.</li> */}
            </ul>
            {/* <div className="w-full"> */}
            <Image src={img2} width={800} height={800} alt={""}></Image>
            {/* </div> */}
          </div>
          {/* <div className="w-full items-center justify-evenly flex flex-row ">
            <ActionButtons></ActionButtons>
          </div> */}
        </section>
      </div>
    </main>
    // </>
  );
}
