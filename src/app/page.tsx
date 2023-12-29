import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <Link href={"/dashboard"}>
        <div className="flex items-center rounded-[2rem] p-4 justify-center w-full bg-orange-300">
          <span className="text-black text-3xl"> Example freezer</span>
        </div>
      </Link>
      <div className="flex items-center rounded-[2rem] justify-center p-4 bg-orange-300">
        <span className="text-black text-3xl">
          Create freezer (coming soon)
        </span>
      </div>
    </main>
  );
}
