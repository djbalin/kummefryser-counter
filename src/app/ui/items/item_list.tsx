"use client";
import FoodItem from "./food_item";
import ListHeader from "./list_header";
import { useCategoryContext } from "../../contexts/categories-context";
import {
  Category,
  FoodItemType,
} from "../../lib/utils/types_schemas/typesAndSchemas";

export default function ItemList({
  foodItemsParsed,
  allCategories,
}: {
  foodItemsParsed: FoodItemType[];
  allCategories: Category[];
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
            foodItem={foodItem}
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></FoodItem>
        );
      })}
    </div>
  );
}
