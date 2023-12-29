"use client";
// import { CategorySchemaType } from "../lib/db/dbschema";
import { CategorySchemaType } from "@/app/lib/db/dbschema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

// const selected = "bg-green-700";

// function toggleSelected(element: HTMLDivElement) {
//   if (element.classList.contains(selected)) {
//     element.classList.remove(selected);
//   } else {
//     element.classList.add(selected);
//   }
// }

export default function Categories({
  allCategories,
}: {
  allCategories: CategorySchemaType[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const [selectedCategories,setSelectedCategories] = useState<string[]>([])
  // const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
  //   new Set(["b", "a"])
  // );
  console.log("RENDER CATEGORIES");

  function handleClickCategory(event: React.MouseEvent<HTMLDivElement>) {
    // toggleSelected(event.currentTarget);
    console.log("Category click");

    const categoryText = event.currentTarget.innerHTML;
    const params = new URLSearchParams(searchParams);

    // if (selectedCategories.has(categoryText)) {
    //   // setSelectedCategories((prev) => new Set(prev.delete(categoryText)));
    //   selectedCategories.delete(categoryText);
    //   params.delete("category", categoryText);
    // } else {
    //   // setSelectedCategories((prev) => new Set(prev.add(categoryText)));
    //   selectedCategories.add(categoryText);
    //   params.append("category", categoryText);
    // }

    if (params.has("category", categoryText)) {
      params.delete("category", categoryText);
    } else {
      params.append("category", categoryText);
    }
    // event.currentTarget.blur();
    replace(`${pathname}?${params.toString()}`);
  }
  //   console.log(allCategories);

  return (
    <>
      <div className="flex w-full items-center mb-2">
        <span className="text-2xl w-[30%]">Filter by categories:</span>
        <div className="flex flex-grow w-[70%] items-center justify-center pr-16 gap-x-2">
          {allCategories.map((cat) => {
            return (
              <div
                className={clsx("border-2 rounded-xl p-2 cursor-pointer", {
                  "bg-purple-600": searchParams
                    .getAll("category")
                    .includes(cat.category as string),
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
