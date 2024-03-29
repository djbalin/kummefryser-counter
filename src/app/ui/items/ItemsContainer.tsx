import { Category, FoodItemType } from "@/app/lib/utils/typesAndSchemas";
// import CategoriesHolder from "./categories_holder";
import ItemList from "./ItemList";
import WipeDB from "../WIPEDB";
import {
  EXAMPLE_getAllCategories,
  EXAMPLE_getAllSorted,
  getAllCategories,
  getAllSorted,
} from "@/app/lib/db/firebase";
import Link from "next/link";
import Categories from "./Categories";
// import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export default async function ItemsContainer({
  isExample,
}: {
  isExample: boolean;
}) {
  // unstable_noStore();

  let allCategories: Category[];
  let foodItems: FoodItemType[];

  if (isExample) {
    foodItems = await EXAMPLE_getAllSorted();
    allCategories = await EXAMPLE_getAllCategories();
  } else {
    const uid = cookies().get("user_id");
    if (uid) {
      foodItems = await getAllSorted(uid.value);
      allCategories = await getAllCategories(uid.value);
    } else {
      throw new Error("NO UID");
    }
  }

  const foodItemsSerialized = JSON.stringify(foodItems);
  const foodItemsParsed: FoodItemType[] = JSON.parse(
    foodItemsSerialized,
    (key, value) => {
      if (key.endsWith("Date")) {
        return new Date(value);
      } else {
        return value;
      }
    }
  );

  return (
    <>
      {foodItems.length == 0 ? (
        <>
          <span className="text-xl text-red-500 my-12">
            The database seems empty, please add items or fill it with example
            data:
          </span>
          <Link href="/create">
            <button className="flex h-12 sm:h-16 w-20 sm:w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
              NEW ITEM
            </button>
          </Link>
        </>
      ) : (
        <>
          <section className="flex px-2 flex-row w-full justify-between sm:py-2 lg:px-24">
            <Categories
              allCategories={JSON.parse(JSON.stringify(allCategories))}
            ></Categories>
            <div className="flex items-center justify-center min-h-full">
              <Link href="/create">
                <button className="flex h-12 sm:h-16 w-20 sm:w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                  NEW ITEM
                </button>
              </Link>

              {/* {isExample ? (
                <Link href="/example/create">
                  <button className="flex sm:h-full sm:w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                    NEW ITEM
                  </button>
                </Link>
              ) : (
                <Link href="/dashboard/create">
                  <button className="flex h-full w-28 items-center justify-center rounded-lg bg-blue-500 px-4 font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                    NEW ITEM
                  </button>
                </Link>
              )} */}
            </div>
          </section>
          <ItemList
            foodItemsParsed={foodItemsParsed}
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></ItemList>
        </>
      )}
      <WipeDB isExample={isExample}></WipeDB>
    </>
  );
}
