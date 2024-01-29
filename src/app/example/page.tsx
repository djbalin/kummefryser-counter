"use server";
import ItemsContainer from "@/app/ui/items/items_container";
import { Suspense } from "react";
import CategoriesContextProvider from "../contexts/categories-context";

export default async function Page() {
  return (
    <div className="flex flex-col sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center ">
      <span className="text-3xl pb-10">EXAMPLE freezer! :)</span>
      <CategoriesContextProvider>
        <Suspense fallback={<p>LOADING ITEMS</p>}>
          <ItemsContainer></ItemsContainer>
        </Suspense>
      </CategoriesContextProvider>
    </div>
  );
}