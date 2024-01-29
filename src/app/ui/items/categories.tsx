"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../../contexts/categories-context";
import { Category } from "../../lib/utils/types_schemas/typesAndSchemas";

export default function Categories({
  allCategories,
}: {
  allCategories: Category[];
}) {
  const { categoryContext, setCategoryContext } = useCategoryContext();

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
      <section className="flex w-full items-center mb-2">
        <span className="text-2xl w-[30%]">Filter by categories:</span>
        <ul className="flex flex-grow w-[70%] items-center justify-center pr-16 gap-x-2">
          {allCategories.map((cat) => {
            return (
              <li
                className={clsx(
                  "border-2 flex text-center rounded-xl p-2 cursor-pointer",
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
      </section>
    </>
  );
}
