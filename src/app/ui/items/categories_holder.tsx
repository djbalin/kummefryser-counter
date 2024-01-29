import Link from "next/link";
import Categories from "./categories";
import { Category } from "@/app/lib/utils/types_schemas/typesAndSchemas";

export default async function CategoriesHolder({
  allCategories,
}: {
  allCategories: Category[];
}) {
  return (
    <div className="flex flex-row w-full justify-between py-2 px-24">
      <Categories
        allCategories={JSON.parse(JSON.stringify(allCategories))}
      ></Categories>
      <div className="flex h-full">
        <Link href="/dashboard/create">
          <button className="flex h-full w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            NEW ITEM
          </button>
        </Link>
      </div>
    </div>
  );
}
