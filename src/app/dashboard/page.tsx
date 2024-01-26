// "use server";
import ItemsContainer from "@/app/ui/items/items_container";
import { Suspense } from "react";
import CategoriesContextProvider from "../contexts/categories-context";
import { getAuthenticatedAppForUser } from "../lib/firebase/fierbase3";

export default async function Page() {
  console.log("DASHBOARD render");

  const app = await getAuthenticatedAppForUser();

  return (
    <div className="flex flex-col sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center ">
      <span className="text-3xl pb-10">
        What&apos;s in my freezer :) user: {app ? app.app?.name : "no"}
      </span>
      <CategoriesContextProvider>
        <Suspense fallback={<p>LOADING ITEMS</p>}>
          <ItemsContainer></ItemsContainer>
        </Suspense>
      </CategoriesContextProvider>
    </div>
  );
}
