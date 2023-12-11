import getFoodItems from "../scripts/placeholder_data";
const foodItems = getFoodItems();
import FoodItem from "../ui/fooditem";

export default function Page() {
  return (
    <div className="">
      Dashboard page
      <div className="grid grid-cols-4 w-64 gap-y-2">
        {foodItems.map((foodItem) => {
          return <FoodItem key={foodItem.id} foodItem={foodItem}></FoodItem>;
        })}
      </div>
    </div>
  );
}
