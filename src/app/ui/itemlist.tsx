import getFoodItems from "../scripts/placeholder_data";
import FoodItemType from "../types/fooditem";
import FoodItems from "./fooditems";
import ListHeader from "./listheader";

export default function ItemList() {
  const foodItems = getFoodItems();
  return (
    <div className="flex flex-col border-2 px-4 border-opacity-30 py-2 min-w-[55%] gap-y-2">
      <ListHeader></ListHeader>
      <FoodItems foodItems={foodItems}></FoodItems>
    </div>
  );
}
