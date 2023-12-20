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
      {children}
    </>
  );
}
