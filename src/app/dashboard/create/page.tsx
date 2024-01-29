"use server";
import { CreateForm } from "@/app/ui/forms/create_form";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { addCategoryToDB, getAllCategories } from "@/app/lib/db/firebase";
import { Category } from "@/app/lib/utils/types_schemas/typesAndSchemas";

export default async function Page() {
  const allCategories: Category[] = await getAllCategories();

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <Link href="/dashboard">
        <Button>Go back</Button>
      </Link>
      <CreateForm
        categories={JSON.parse(JSON.stringify(allCategories))}
        handleAddNewCategory={addCategoryToDB}
      ></CreateForm>
    </div>
  );
}
