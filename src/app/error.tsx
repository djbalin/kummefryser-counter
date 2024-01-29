"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Link
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-colors hover:bg-blue-400"
        href={"/"}
      >
        Go back
      </Link>
    </main>
  );
}
