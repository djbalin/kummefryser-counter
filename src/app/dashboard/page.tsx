"use server";
import Link from "next/link";
import ItemList from "../ui/itemlist";
import { CategorySchemaType } from "../lib/db/dbschema";
// import { Category } from "../types_schemas/typesAndSchemas";

import { getAllCategories } from "../lib/db/dbhelper";
import ItemsAndCategories from "../ui/items_and_categories";
import Categories from "../ui/categories";
import WipeDB from "../ui/WIPEDB";
import wipeDBAndRefresh from "../lib/db/dbhelper";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string[];
  };
}) {
  // export default async function Page() {
  // const searchParams = useSearchParams();

  // const categories: string[] = searchParams("category");

  const categories: string[] = searchParams?.category || [];

  // console.log("query: " + query);

  const allCategories: CategorySchemaType[] = await getAllCategories();
  console.log(allCategories);
  console.log(typeof allCategories[0]);

  // const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  console.log("RENDER DASHBOARD");

  return (
    <div className="flex flex-col w-full items-center ">
      <span className="text-3xl">Hvad har jeg i fryseren :)</span>
      <div className="flex">
        <Link
          className="border-4 my-4 rounded-md border-purple-500 border-opacity-70"
          href={"/dashboard/create"}
        >
          <button className="w-28 h-16">NEW ITEM</button>
        </Link>
        <WipeDB wipeDBAndRefresh={wipeDBAndRefresh}></WipeDB>
      </div>
      <Categories
        allCategories={JSON.parse(JSON.stringify(allCategories))}
      ></Categories>
      <ItemList categoriesToShow={categories}></ItemList>
    </div>
  );
}
