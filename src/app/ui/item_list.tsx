"use client";
import FoodItem from "./food_item";
import ListHeader from "./list_header";
import { useCategoryContext } from "../contexts/categories-context";
import { FoodItemSchema, FoodItemType } from "../types_schemas/typesAndSchemas";
import { CategorySchemaType } from "../lib/db/dbschema";

export default function ItemList({
  foodItemsParsed,
  allCategories,
}: {
  foodItemsParsed: FoodItemType[];
  allCategories: CategorySchemaType[];
}) {
  const { categoryContext, setCategoryContext } = useCategoryContext();

  let foodItemsToShow: FoodItemType[];
  if (categoryContext.length > 0 && categoryContext[0] != "") {
    foodItemsToShow = foodItemsParsed.filter((el) =>
      categoryContext.includes(el.category)
    );
  } else {
    foodItemsToShow = foodItemsParsed;
  }

  return (
    <div className="flex flex-col border-2 sm:px-4 border-opacity-30 sm:py-2 w-full gap-y-2">
      <ListHeader></ListHeader>
      {foodItemsToShow.map((foodItem) => {
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
  );
}
