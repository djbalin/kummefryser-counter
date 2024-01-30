import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";
// import { setUserCookie } from "./lib/actions";

export default function Home() {
  const user = cookies().get("user_id");
  if (!user) {
    setCookie("user_id", "_EXAMPLE");
    // setUserCookie("_EXAMPLE");
    // cookies().set("user_id", "_EXAMPLE");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      {
        user ? (
          <Link href={"/dashboard"}>
            <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
              <span className="text-black text-3xl">My freezer</span>
            </div>
          </Link>
        ) : (
          <section className="flex flex-col text-center gap-y-10">
            <p className="text-xl text-green-500">
              You are not logged in. To view your own freezer or to create your
              first one, click &quot;Log in&quot; in the top.
            </p>
            {/* <svg width="300" height="100" className="">
              <defs>
                <marker
                  id="arrow"
                  markerWidth="13"
                  markerHeight="13"
                  refX="3"
                  refY="6"
                  orient="auto"
                >
                  <path d="M2,2 L2,11 L10,6 L2,2" className="path1" />
                </marker>
              </defs>

              <path d="M30,150 L100,50" className="path2" />
            </svg> */}
            <p className="text-lg text-purple-400">
              Click &quot;Example freezer&quot; to view an example freezer and
              play around with the application.
            </p>
          </section>
        )
        // (
        //   <Link href={"/login"}>
        //     <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
        //       <span className="text-black text-3xl">Log in</span>
        //     </div>
        //   </Link>
        // )
      }
      {/* <Link href={"/example"}>
        <div className="flex items-center rounded-[2rem] p-4 justify-center w-full bg-orange-300">
          <span className="text-black text-3xl"> Example freezer</span>
        </div>
      </Link> */}
    </main>
  );
}
