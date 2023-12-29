"use server";
// "use client";

import { wipeAndPopulateDB, getAllSorted } from "@/app/lib/db/dbhelper";
import { FoodItemType } from "@/app/types_schemas/typesAndSchemas";

export default async function Page() {
  const all: FoodItemType[] = await getAllSorted();
  // console.log(all);

  await wipeAndPopulateDB();
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
            {/* {some.lifespanInDays.toString()} */}
          </div>
        );
      })}
    </div>
  );
}
