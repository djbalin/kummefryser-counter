"use server";
import Link from "next/link";
import ItemList from "../ui/itemlist";
import { CategorySchemaType } from "../lib/db/dbschema";
// import { Category } from "../types_schemas/typesAndSchemas";

import { getAllCategories } from "../lib/db/dbhelper";
import ItemsAndCategories from "../ui/items_and_categories";
import Categories from "../ui/categories";

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

  // const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);

  return (
    <div className="flex flex-col w-full items-center ">
      <span className="text-3xl pb-16">Hvad har jeg i fryseren :)</span>
      <Link
        className="border-4 my-4 rounded-md border-purple-500 border-opacity-70"
        href={"/dashboard/create"}
      >
        <button className="w-28 h-16">NEW ITEM</button>
      </Link>
      <Categories allCategories={allCategories}></Categories>
      <ItemList categoriesToShow={categories}></ItemList>

      {/* <ItemsAndCategories allCategories={allCategories}>
        <ItemList categoriesToShow={[]}></ItemList>
      </ItemsAndCategories> */}

      {/* <div className="flex gap-x-8 mb-2">
        {allCategories.map((cat) => {
          console.log("ID: " + cat._id);

          return (
            // <div className="border-2 p-2" key={cat._id.toString()}>
            <div className="border-2 p-2" key={cat.category}>
              {cat.category}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
