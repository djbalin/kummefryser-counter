"use server";
import { CreateForm } from "@/app/ui/forms/create_form";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
  EXAMPLE_getAllCategories,
  addCategoryToDB,
} from "@/app/lib/db/firebase";
import { Category } from "@/app/lib/utils/types_schemas/typesAndSchemas";

export default async function Page() {
  const allCategories: Category[] = await EXAMPLE_getAllCategories();

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <div className="flex flex-row gap-x-10">
        <h2 className="text-orange-400 font-semibold text-2xl">
          Example freezer
        </h2>
        <Link href="/dashboard">
          <Button>Go back</Button>
        </Link>
      </div>
      <CreateForm
        categories={JSON.parse(JSON.stringify(allCategories))}
        handleAddNewCategory={addCategoryToDB}
      ></CreateForm>
    </div>
  );
}
