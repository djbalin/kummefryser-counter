import FoodItemType from "../types/fooditem";
import FoodItem from "./food_item";

export default function FoodItems({
  foodItems,
}: {
  foodItems: FoodItemType[];
}) {
  return (
    <>
      {foodItems.map((foodItem) => {
        return (
          //   <div key={foodItem.id} className="flex items-center gap-x-8">
          //   <div
          //     key={foodItem.id}
          //     // className="grid col-span-5 items-center gap-x-8"
          //     className="grid col-span-5 items-center"
          //   >
          //     <>
          <FoodItem key={foodItem.id} foodItem={foodItem}></FoodItem>
          //     </>
          //   </div>
        );
      })}
    </>
  );
}
