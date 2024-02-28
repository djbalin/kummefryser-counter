"use server";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Suspense } from "react";
import CreatePageWrapper from "@/app/ui/CreatePageWrapper";

export default async function CreatePage() {
  return (
    <div className="flex flex-col items-center w-full py-2 sm:py-8 gap-y-4">
      <Link href="/dashboard">
        <Button>Go back</Button>
      </Link>
      <Suspense fallback={<p>Loading ...</p>}>
        <CreatePageWrapper />
      </Suspense>
    </div>
  );
}
