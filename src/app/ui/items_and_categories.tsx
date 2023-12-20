"use client";
import { useState } from "react";
// import { Suspense, useState } from "react";
import { CategorySchemaType } from "../lib/db/dbschema";
// import ItemList from "./itemlist";
import Categories from "./categories";
// import { getAllCategories } from "../lib/db/dbhelper";

// function toggleSelection() {}

// export default function ItemsAndCategories() {
export default function ItemsAndCategories({
  children,
  allCategories,
}: {
  children: React.ReactNode;
  allCategories: CategorySchemaType[];
}) {
  const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  console.log("RENDER");

  return (
    <>
      <Categories allCategories={allCategories}></Categories>
      {/* <ItemList categoriesToShow={[]}></ItemList> */}
      {/* <ItemList></ItemList> */}
      {children}

      {/* <div className="flex gap-x-8 mb-2">
        {allCategories.map((cat) => {
          console.log("ID: " + cat._id);

          return (
            // <div className="border-2 p-2" key={cat._id.toString()}>
            <div
              className="border-2 p-2"
              key={cat.category}
              onClick={(e) => {
                console.log(e);
              }}
            >
              {cat.category}
            </div>
          );
        })}
      </div> */}
      {/* <ItemList categoriesToShow={allCategories}></ItemList> */}
      {/* <Suspense>
      </Suspense> */}
    </>
  );
}
