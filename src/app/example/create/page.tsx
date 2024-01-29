// "use server";
// // import { getAllCategories, tryAddCategory } from "@/app/lib/db/dbhelper";
// import { CategorySchemaType } from "@/app/lib/db/dbschema";
// import { CreateForm } from "@/app/ui/forms/create_form";
// import { addCategory } from "@/app/lib/actions";
// import Link from "next/link";
// import { Button } from "@/app/ui/button";

export default async function Page() {
  //   const allCategories: CategorySchemaType[] = await getAllCategories();

  // async function handleAddNewCategory(categoryName: string) {
  //   "use server";
  //   tryAddCategory({ category: categoryName, _id: generateId(16) });
  // }
  return (
    // <div className="w-auto">
    <div className="flex flex-col items-center w-full gap-y-4">
      empty
      {/* <Link href="/example">
        <Button>Go back</Button>
      </Link>
      <CreateForm
        categories={JSON.parse(JSON.stringify(allCategories))}
        handleAddNewCategory={addCategory}
        // getAllCategories={getAllCategories}
      ></CreateForm> */}
    </div>
    // </div>
  );
}
