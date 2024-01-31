// import AppBgImg from "./ui/AppBgImg";
import HomepageWelcome from "./ui/HomepageWelcome";

export default function Home() {
  return (
    <main className="flex flex-col h-[100%] items-center justify-between sm:px-24 sm:pt-24 pt-4 px-4">
      {/* <div id="background2" className="bg-red-200"> */}
      {/* <AppBgImg></AppBgImg> */}
      {/* </div> */}
      <h1>Hey</h1>
      <div id="backgroundDeep" className=""></div>
      <div id="backgroundTop" className=""></div>

      <HomepageWelcome></HomepageWelcome>
    </main>
  );
}
