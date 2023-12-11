import FoodItem from "../types/fooditem";

export default function FoodItem({ foodItem }: { foodItem: FoodItem }) {
  return (
    <div className="grid grid-cols-20 justify-between w-full h-8 bg-orange-300 bg-opacity-20 rounded-md border-blue-300 border-opacity-40">
      <span className="grid col-span-5">{foodItem.name}</span>
      <span className="grid col-span-5">{foodItem.category}</span>
      <span className="grid col-span-5">{foodItem.volume}</span>
      <span className="grid col-span-5">{foodItem.freezeDate.getDate()}</span>
    </div>
  );
}
