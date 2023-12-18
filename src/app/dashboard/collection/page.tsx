"use server";
// "use client";

import populateDB, { getAllSorted } from "@/app/lib/db/dbhelper";
import FoodItemType from "@/app/types/fooditem";

export default async function Page() {
  const all: FoodItemType[] = await getAllSorted();

  await populateDB();
  //   async function handleClick() {
  //     await populateDB();
  //   }
  return (
    <div className=" border-4">
      Heya
      {all.map((some) => {
        return (
          <div key={some.name} className="">
            {some.name}
            {some.category}
            {some.expirationDate.toString()}
          </div>
        );
      })}
    </div>
  );
}
