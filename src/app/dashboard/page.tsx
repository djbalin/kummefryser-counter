"use server";
import Link from "next/link";
import ItemList from "../ui/itemlist";
import { CategorySchemaType } from "../lib/db/dbschema";
import { getAllCategories } from "../lib/db/dbhelper";
import Categories from "../ui/categories";
import WipeDB from "../ui/WIPEDB";
import { wipeAndPopulateDB } from "../lib/db/dbhelper";
import { Button } from "../ui/button";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string[];
  };
}) {
  const categories: string[] = searchParams?.category || [];
  const allCategories: CategorySchemaType[] = await getAllCategories();
  if (allCategories.length === 0) {
    console.log("Database is empty. Populating with placeholder data");

    await wipeAndPopulateDB();
  }
  console.log("DASHBOARD render");

  return (
    <div className="flex flex-col sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center ">
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <span className="text-3xl">Hvad har jeg i fryseren :)</span>
      <div className="flex flex-row justify-between">
        <Categories
          allCategories={JSON.parse(JSON.stringify(allCategories))}
        ></Categories>
        <div className="flex ">
          <Link
            // className="border-[6px] my-4 rounded-md border-purple-500 border-opacity-70"
            href="/dashboard/create"
          >
            <Button className="w-28 h-16 text-md">NEW ITEM</Button>
            {/* <button className="w-28 h-16">NEW ITEM</button> */}
          </Link>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <ItemList categoriesToShow={categories}></ItemList>
      </Suspense>
      <WipeDB wipeDBAndRefresh={wipeAndPopulateDB}></WipeDB>
      {/* </Suspense> */}
    </div>
  );
}
