"use client";
import { CategorySchemaType } from "@/app/lib/db/dbschema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useCategoryContext } from "../contexts/categories-context";
const selected = "bg-green-700";

function toggleSelected(element: HTMLDivElement) {
  if (element.classList.contains(selected)) {
    element.classList.remove(selected);
  } else {
    element.classList.add(selected);
  }
}

// const selectedCategoriesContext = createContext();

export default function Categories({
  allCategories,
}: // setCategoriesToShow,
{
  allCategories: CategorySchemaType[];
}) {
  //
  //
  // SEARCH PARAMS APPROACH
  //
  //
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const { categoryContext, setCategoryContext } = useCategoryContext();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // console.log("RENDER CATEGORIES");

  function handleClickCategory(event: React.MouseEvent<HTMLDivElement>) {
    // console.log("Category click");

    const categoryText = event.currentTarget.innerHTML;

    if (selectedCategories.includes(categoryText)) {
      setSelectedCategories((prev) =>
        prev.filter((element) => element !== categoryText)
      );
    } else {
      setSelectedCategories((prev) => [...prev, categoryText]);
    }

    // const params = new URLSearchParams(searchParams);
    // if (params.has("category", categoryText)) {
    //   params.delete("category", categoryText);
    // } else {
    //   params.append("category", categoryText);
    // }
    // replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    setCategoryContext(selectedCategories);
  }, [selectedCategories, setCategoryContext]);

  return (
    <>
      <div className="flex w-full items-center mb-2">
        <span className="text-2xl w-[30%]">Filter by categories:</span>
        <div className="flex flex-grow w-[70%] items-center justify-center pr-16 gap-x-2">
          {allCategories.map((cat) => {
            return (
              // SEARCHPARAMS APPROACH
              // SEARCHPARAMS APPROACH
              // SEARCHPARAMS APPROACH
              // <div
              //   className={clsx("border-2 rounded-xl p-2 cursor-pointer", {
              //     "bg-purple-600": searchParams
              //       .getAll("category")
              //       .includes(cat.category as string),
              //   })}
              //   key={cat._id}
              //   onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              //     handleClickCategory(e);
              //   }}
              // >
              //   {cat.category}
              // </div>
              <div
                className={clsx("border-2 rounded-xl p-2 cursor-pointer", {
                  "bg-purple-600": selectedCategories.includes(cat.category),
                })}
                key={cat._id}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  handleClickCategory(e);
                }}
              >
                {cat.category}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
