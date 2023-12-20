"use server";
import { getAllSorted, getAllFilteredByCategories } from "../lib/db/dbhelper";
import { FreezerItemSchemaType } from "../lib/db/dbschema";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import FoodItem from "./food_item";
import ListHeader from "./listheader";

export default async function ItemList({
  categoriesToShow,
}: {
  categoriesToShow: string[];
}) {
  // export default async function ItemList() {
  let freezerItemsSchemaType: FreezerItemSchemaType[];
  if (categoriesToShow.length == 0) {
    freezerItemsSchemaType = await getAllSorted();
  } else {
    freezerItemsSchemaType = await getAllFilteredByCategories(categoriesToShow);
  }

  const foodItemsSerialized = await JSON.stringify(freezerItemsSchemaType);
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
  console.log("AFTER PARSING");
  console.log("AFTER PARSING");
  console.log("AFTER PARSING");
  console.log(foodItemsParsed[0]);
  console.log(foodItemsParsed[1]);

  return (
    <div className="flex flex-col border-2 px-4 border-opacity-30 py-2 lg:min-w-[75%] gap-y-2">
      <ListHeader></ListHeader>
      {foodItemsParsed.map((foodItem, idx) => {
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
          ></FoodItem>
        );
      })}
    </div>
  );
}
