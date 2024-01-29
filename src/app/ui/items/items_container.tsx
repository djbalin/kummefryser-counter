"use server";
import {
  Category,
  FoodItemType,
} from "@/app/lib/utils/types_schemas/typesAndSchemas";
import CategoriesHolder from "./categories_holder";
import ItemList from "./item_list";
import WipeDB from "../WIPEDB";
import { getAllCategories, getAllSorted } from "@/app/lib/db/firebase";

export default async function ItemsContainer() {
  const allCategories: Category[] = await getAllCategories();
  const foodItems: FoodItemType[] = await getAllSorted();
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
        <span className="text-xl text-red-500">
          The database seems empty, please add items or fill it with example
          data:
        </span>
      ) : (
        <>
          <CategoriesHolder
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></CategoriesHolder>
          <ItemList
            foodItemsParsed={foodItemsParsed}
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></ItemList>
        </>
      )}
      <WipeDB></WipeDB>
    </>
  );
}
