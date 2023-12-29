"use server";
import { getAllSorted, getAllFilteredByCategories } from "../lib/db/dbhelper";
import { CategorySchemaType } from "../lib/db/dbschema";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import FoodItem from "./food_item";
import ListHeader from "./listheader";

export default async function ItemList({
  categoriesToShow,
  allCategories,
}: {
  categoriesToShow: string[];
  allCategories: CategorySchemaType[];
}) {
  // export default async function ItemList() {
  let foodItems: FoodItemType[];
  if (categoriesToShow.length == 0) {
    foodItems = await getAllSorted();
  } else {
    foodItems = await getAllFilteredByCategories(categoriesToShow);
  }
  console.log("No. of fooditems in foodlist:" + foodItems.length);
  // console.log(foodItems);

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
    <div className="flex flex-col border-2 sm:px-4 border-opacity-30 sm:py-2 w-full gap-y-2">
      <ListHeader></ListHeader>
      {foodItemsParsed.map((foodItem) => {
        // foodItem = JSON.parse(JSON.stringify(foodItem));
        // foodItem._id = foodItem._id.toString();
        // console.log("fooditem id");

        // console.log(foodItem);
        // console.log(foodItem._id.toString("base64"));

        return (
          <FoodItem
            key={foodItem._id}
            // key={idx}
            foodItem={foodItem}
            allCategories={allCategories}
          ></FoodItem>
        );
      })}
    </div>
  );
}
