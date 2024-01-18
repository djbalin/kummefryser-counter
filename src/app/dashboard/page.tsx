// "use server";
import Link from "next/link";
import ItemsContainer from "@/app/ui/items_container";
import { CategorySchemaType } from "../lib/db/dbschema";
import { getAllCategories } from "../lib/db/dbhelper";
import Categories from "../ui/categories";
import WipeDB from "../ui/WIPEDB";
import { wipeAndPopulateDB } from "../lib/db/dbhelper";
import { Suspense } from "react";
import CategoriesHolder from "../ui/categories_holder";
import CategoriesContextProvider from "../contexts/categories-context";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string[];
  };
}) {
  // let allCategories: CategorySchemaType[] = [];
  // await getAllCategories().then((res) => (allCategories = res.toSorted()));

  // const allCategories: CategorySchemaType[] = await getAllCategories();
  // if (allCategories.length === 0) {
  //   console.log("Database is empty. Populating with placeholder data");
  //   await wipeAndPopulateDB();s
  // }
  console.log("DASHBOARD render");

  return (
    <CategoriesContextProvider>
      <div className="flex flex-col sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center ">
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <span className="text-3xl pb-10">Hvad har jeg i fryseren :)</span>
        {/* <Suspense
        fallback={
          <div className="h-[90vh] flex">
            <p className="text-2xl mt-16">Loading...</p>
          </div>
        }
      > */}
        {/* {searchParams} */}
        {/* <ItemList searchParams={searchParams}></ItemList> */}

        {/* <Suspense fallback={<p>LOADING CATEGORIES</p>}>
        <CategoriesHolder></CategoriesHolder>
      </Suspense> */}

        <Suspense fallback={<p>LOADING ITEMS</p>}>
          <ItemsContainer></ItemsContainer>
        </Suspense>
        {/* </Suspense> */}
        <WipeDB wipeDBAndRefresh={wipeAndPopulateDB}></WipeDB>
        {/* </Suspense> */}
      </div>
    </CategoriesContextProvider>
  );
}
