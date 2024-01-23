import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "./contexts/auth_context";
import Login from "./ui/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <Login></Login>
      <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
        <span className="text-black text-3xl">Create freezer (Log in)</span>
      </div>
      <Link href={"/example"}>
        <div className="flex items-center rounded-[2rem] p-4 justify-center w-full bg-orange-300">
          <span className="text-black text-3xl"> Example freezer</span>
        </div>
      </Link>
    </main>
  );
}
