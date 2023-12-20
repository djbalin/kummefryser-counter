"use client";
import { CategorySchemaType } from "../lib/db/dbschema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

const selected = "bg-green-700";

function toggleSelected(element: HTMLDivElement) {
  console.log(element.classList);

  if (element.classList.contains(selected)) {
    element.classList.remove(selected);
  } else {
    element.classList.add(selected);
  }
  console.log(element.classList);
}

export default function Categories({
  allCategories,
}: {
  allCategories: CategorySchemaType[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("RENDER CATEGORIES");

  function handleClickCategory(event: React.MouseEvent<HTMLDivElement>) {
    toggleSelected(event.currentTarget);
    const categoryText = event.currentTarget.innerHTML;
    const params = new URLSearchParams(searchParams);
    if (params.has("category", categoryText)) {
      params.delete("category", categoryText);
    } else {
      params.append("category", categoryText);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <>
      <div className="flex gap-x-8 mb-2">
        {allCategories.map((cat) => {
          return (
            <div
              className={clsx("border-2 rounded-xl p-2 cursor-pointer", {
                "bg-green-500": searchParams
                  .getAll("category")
                  .includes(cat.category as string),
              })}
              key={cat.category}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                handleClickCategory(e);
              }}
            >
              {cat.category}
            </div>
          );
        })}
      </div>
    </>
  );
}
