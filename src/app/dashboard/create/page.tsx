"use server";
import { getAllCategories, tryAddCategory } from "@/app/lib/db/dbhelper";
import { CategorySchemaType } from "@/app/lib/db/dbschema";
import CreateForm from "@/app/ui/create_form";
import { addCategory } from "@/app/lib/actions";

export default async function Page() {
  const allCategories: CategorySchemaType[] = await getAllCategories();

  // async function handleAddNewCategory(categoryName: string) {
  //   "use server";
  //   tryAddCategory({ category: categoryName, _id: generateId(16) });
  // }
  return (
    // <div className="w-auto">
    <CreateForm
      categories={allCategories}
      handleAddNewCategory={addCategory}
      // getAllCategories={getAllCategories}
    ></CreateForm>
    // </div>
  );
}
