import AudioHolder from "./ui/AudioHolder";
import HomepageWelcome from "./ui/HomepageWelcome";
export default function Home() {
  return (
    <main className="flex flex-col h-auto items-center justify-between sm:px-24 sm:pt-24 pt-4 px-4">
      <div
        id="blackOverlay"
        className="h-[100%] w-[100%] z-0 pointer-events-none bg-black absolute top-0"
      ></div>
      <div id="backgroundDeep" className=""></div>
      {/* <img id="backgroundTop" src="../app/public/freezer.webp"></img> */}
      <div id="backgroundTop" className=""></div>
      <HomepageWelcome></HomepageWelcome>
      <AudioHolder></AudioHolder>
    </main>
    // </>
  );
}
