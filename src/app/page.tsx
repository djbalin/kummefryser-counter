import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
  const user = cookies().get("user_id");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      {user ? (
        <Link href={"/dashboard"}>
          <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
            <span className="text-black text-3xl">My freezer</span>
          </div>
        </Link>
      ) : (
        <Link href={"/login"}>
          <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
            <span className="text-black text-3xl">Log in</span>
          </div>
        </Link>
      )}
      <Link href={"/example"}>
        <div className="flex items-center rounded-[2rem] p-4 justify-center w-full bg-orange-300">
          <span className="text-black text-3xl"> Example freezer</span>
        </div>
      </Link>
    </main>
  );
}
