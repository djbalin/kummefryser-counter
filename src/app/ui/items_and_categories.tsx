"use client";
import { Suspense, useState } from "react";
import { CategorySchemaType } from "../lib/db/dbschema";
import ItemList from "./itemlist";
// import { getAllCategories } from "../lib/db/dbhelper";

function toggleSelection() {}

export default function ItemsAndCategories({
  allCategories,
}: {
  allCategories: CategorySchemaType[];
}) {
  const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);

  return (
    <>
      <div className="flex gap-x-8 mb-2">
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
      </div>
      <Suspense>
        <ItemList categoriesToShow={[]}></ItemList>
      </Suspense>
    </>
  );
}
