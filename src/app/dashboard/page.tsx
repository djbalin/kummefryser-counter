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
  // let allCategories: CategorySchemaType[] = [];
  // await getAllCategories().then((res) => (allCategories = res.toSorted()));

  const allCategories: CategorySchemaType[] = await getAllCategories();
  if (allCategories.length === 0) {
    console.log("Database is empty. Populating with placeholder data");
    await wipeAndPopulateDB();
  }
  console.log("DASHBOARD render");

  return (
    <div className="flex flex-col sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center ">
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <span className="text-3xl pb-10">Hvad har jeg i fryseren :)</span>
      <Suspense
        fallback={
          <div className="h-[90vh] flex">
            <p className="text-2xl mt-16">Loading...</p>
          </div>
        }
      >
        <div className="flex flex-row w-full justify-between py-2 px-24">
          {/* <Suspense fallback={<p>LOADING CATEGORIES</p>}> */}
          <Categories
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></Categories>
          {/* </Suspense> */}
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
        <ItemList
          categoriesToShow={categories}
          allCategories={JSON.parse(JSON.stringify(allCategories))}
        ></ItemList>
      </Suspense>
      <WipeDB wipeDBAndRefresh={wipeAndPopulateDB}></WipeDB>
      {/* </Suspense> */}
    </div>
  );
}
