"use server";
import { CreateForm } from "@/app/ui/forms/create_form";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { addCategoryToDB } from "@/app/lib/db/firebase";
// import { Category } from "@/app/lib/utils/types_schemas/typesAndSchemas";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  // const allCategories: Category[] = await getAllCategories(uid.value);

  return (
    <div className="flex flex-col items-center w-full py-8 gap-y-4">
      <Link href="/dashboard">
        <Button>Go back</Button>
      </Link>
      <Suspense fallback={<p>LOADING...</p>}>
        <CreateForm
          // categories={JSON.parse(JSON.stringify(allCategories))}
          handleAddNewCategory={addCategoryToDB}
        ></CreateForm>
      </Suspense>
    </div>
  );
}
