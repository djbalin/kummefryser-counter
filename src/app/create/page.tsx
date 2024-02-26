"use server";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import CreatePageWrapper from "../ui/CreatePageWrapper";
import { Suspense } from "react";

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
