"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../../contexts/categories-context";
import { Category } from "../../lib/utils/typesAndSchemas";

export default function Categories({
  allCategories,
}: {
  allCategories: Category[];
}) {
  const { setCategoryContext } = useCategoryContext();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  function handleClickCategory(event: React.MouseEvent<HTMLElement>) {
    const categoryText = event.currentTarget.innerHTML;

    if (selectedCategories.includes(categoryText)) {
      setSelectedCategories((prev) =>
        prev.filter((element) => element !== categoryText)
      );
    } else {
      setSelectedCategories((prev) => [...prev, categoryText]);
    }
  }

  useEffect(() => {
    setCategoryContext(selectedCategories);
  }, [selectedCategories, setCategoryContext]);

  return (
    <>
      <div className="flex sm:flex-row flex-col w-full items-center mb-2 sm:mb-0">
        <span className="text-lg sm:text-2xl text-center sm:text-center py-1 sm:w-min w-full">
          Filter by categories:
        </span>
        <ul className="flex flex-wrap sm:w-[70%] gap-y-1 items-center justify-center pb-1 sm:pb-0 pr-8 md:pr-16 gap-x-1">
          {allCategories.map((cat) => {
            return (
              <li
                className={clsx(
                  "border-2 text-sm sm:text-base lg:text-lg flex text-center rounded-md sm:rounded-xl py-2 px-1 sm:p-2 cursor-pointer",
                  {
                    "bg-purple-600": selectedCategories.includes(cat.name),
                  }
                )}
                key={cat.id}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleClickCategory(e);
                }}
              >
                {cat.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
