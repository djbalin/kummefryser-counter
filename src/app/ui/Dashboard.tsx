import { Suspense } from "react";
import CategoriesContextProvider from "../contexts/categories-context";
import ItemsContainer from "./items/ItemsContainer";
import DashboardWelcome from "./DashboardWelcome";

export default function Dashboard({ isExample }: { isExample: boolean }) {
  return (
    <div className="flex flex-col max-w-6xl mx-auto  items-center">
      <DashboardWelcome isExample={isExample}></DashboardWelcome>
      <CategoriesContextProvider>
        <Suspense fallback={<p>LOADING ITEMS</p>}>
          <ItemsContainer isExample={isExample}></ItemsContainer>
        </Suspense>
      </CategoriesContextProvider>
    </div>
  );
}
