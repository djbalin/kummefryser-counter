"use server";
import { Suspense } from "react";
import {
  getAllSorted,
  getAllFilteredByCategories,
  getAllCategories,
} from "../lib/db/dbhelper";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import FoodItem from "./food_item";
import ListHeader from "./list_header";
import CategoriesHolder from "./categories_holder";

export default async function ItemList({
  searchParams,
}: // categoriesToShow,
{
  searchParams?: {
    category?: string[];
  };
  // categoriesToShow: string[];
}) {
  const categories: string[] = searchParams?.category || [];
  // export default async function ItemList() {
  const allCategories = await getAllCategories();
  let foodItems: FoodItemType[];
  // console.log();
  if (categories.length > 0) {
    foodItems = await getAllFilteredByCategories(categories);
  } else {
    foodItems = await getAllSorted();
  }
  console.log("No. of fooditems in foodlist:" + foodItems.length);

  const foodItemsSerialized = await JSON.stringify(foodItems);
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
      <CategoriesHolder
        allCategories={JSON.parse(JSON.stringify(allCategories))}
      ></CategoriesHolder>
      <div className="flex flex-col border-2 sm:px-4 border-opacity-30 sm:py-2 w-full gap-y-2">
        <ListHeader></ListHeader>
        {foodItemsParsed.map((foodItem) => {
          return (
            <FoodItem
              key={foodItem._id}
              // key={idx}
              foodItem={foodItem}
              allCategories={JSON.parse(JSON.stringify(allCategories))}
            ></FoodItem>
          );
        })}
      </div>
    </>
  );
}
