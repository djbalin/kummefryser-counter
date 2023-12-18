import { getAllSorted } from "../lib/db/dbhelper";
// import getFoodItems from "../scripts/placeholder_data";
import FoodItemType from "../types/fooditem";
import FoodItem from "./food_item";
import FoodItems from "./fooditems";
import ListHeader from "./listheader";

export default async function ItemList() {
  const foodItems: FoodItemType[] = await getAllSorted();
  console.log(foodItems);

  // const foodItems = getFoodItems();
  return (
    <div className="flex flex-col border-2 px-4 border-opacity-30 py-2 min-w-[55%] gap-y-2">
      <ListHeader></ListHeader>
      {foodItems.map((foodItem) => {
        return <FoodItem key={foodItem.id} foodItem={foodItem}></FoodItem>;
      })}
      {/* <FoodItems foodItems={foodItems}></FoodItems> */}
    </div>
  );
}
