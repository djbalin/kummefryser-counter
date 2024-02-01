import { Suspense } from "react";
import CategoriesContextProvider from "../contexts/categories-context";
import ItemsContainer from "./items/items_container";
import DashboardWelcome from "./DashboardWelcome";

export default function Dashboard({ isExample }: { isExample: boolean }) {
  return (
    <div className="flex flex-col overflow-auto sm:min-w-[95%] md:min-w-[90%] lg:min-w-[75%] items-center">
      <DashboardWelcome isExample={isExample}></DashboardWelcome>
      <CategoriesContextProvider>
        <Suspense fallback={<p>LOADING ITEMS</p>}>
          <ItemsContainer isExample={isExample}></ItemsContainer>
        </Suspense>
      </CategoriesContextProvider>
    </div>
  );
}
