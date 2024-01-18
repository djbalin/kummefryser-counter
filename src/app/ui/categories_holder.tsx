import Link from "next/link";
import { getAllCategories } from "../lib/db/dbhelper";
import { CategorySchemaType } from "../lib/db/dbschema";
import Categories from "./categories";

export default async function CategoriesHolder({
  allCategories,
}: {
  allCategories: CategorySchemaType[];
}) {
  // allCategories={JSON.parse(JSON.stringify(await getAllCategories()))}
  return (
    <div className="flex flex-row w-full justify-between py-2 px-24">
      <Categories
        allCategories={JSON.parse(JSON.stringify(allCategories))}
      ></Categories>
      <div className="flex h-full">
        <Link
          // className="border-[6px] my-4 rounded-md border-purple-500 border-opacity-70"
          href="/dashboard/create"
        >
          <button className="flex h-full w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            NEW ITEM
          </button>
          {/* <button className="w-28 h-16">NEW ITEM</button> */}
        </Link>
      </div>
    </div>

    // </div>
  );
  //   <div className="">heyy</div>;
}
