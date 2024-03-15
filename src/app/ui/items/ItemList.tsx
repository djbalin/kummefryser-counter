"use client";
import FoodItem from "./FoodItem";
import ListHeader from "./ListHeader";
import { useCategoryContext } from "../../contexts/categories-context";
import { Category, FoodItemType } from "../../lib/utils/typesAndSchemas";

export default function ItemList({
  foodItemsParsed,
  allCategories,
}: {
  foodItemsParsed: FoodItemType[];
  allCategories: Category[];
}) {
  const { categoryContext } = useCategoryContext();

  let foodItemsToShow: FoodItemType[];
  if (categoryContext.length > 0 && categoryContext[0] != "") {
    foodItemsToShow = foodItemsParsed.filter((el) =>
      categoryContext.includes(el.category)
    );
  } else {
    foodItemsToShow = foodItemsParsed;
  }

  return (
    <section className="flex flex-col border-2 sm:px-4 border-opacity-30 sm:py-2 w-full gap-y-2">
      <ListHeader></ListHeader>
      <ol className="flex flex-col gap-y-2">
        {foodItemsToShow.map((foodItem) => {
          return (
            <FoodItem
              key={foodItem._id}
              foodItem={foodItem}
              allCategories={JSON.parse(JSON.stringify(allCategories))}
            ></FoodItem>
          );
        })}
      </ol>
    </section>
  );
}
