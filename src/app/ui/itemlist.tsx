"use server";
import { getAllSorted, getAllFilteredByCategories } from "../lib/db/dbhelper";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import FoodItem from "./food_item";
import ListHeader from "./listheader";

export default async function ItemList({
  categoriesToShow,
}: {
  categoriesToShow: string[];
}) {
  // export default async function ItemList() {
  let foodItems: FoodItemType[];
  if (categoriesToShow.length == 0) {
    foodItems = await getAllSorted();
  } else {
    foodItems = await getAllFilteredByCategories(categoriesToShow);
  }
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
    <div className="flex flex-col border-2 px-4 border-opacity-30 py-2 lg:min-w-[75%] gap-y-2">
      <ListHeader></ListHeader>
      {foodItemsParsed.map((foodItem) => {
        // foodItem = JSON.parse(JSON.stringify(foodItem));
        // foodItem._id = foodItem._id.toString();
        return (
          <FoodItem
            key={foodItem._id.toString()}
            foodItem={foodItem}
          ></FoodItem>
        );
      })}
    </div>
  );
}
