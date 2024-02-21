"use client";
import {
  Category,
  FoodItemType,
} from "@/app/lib/utils/types_schemas/typesAndSchemas";
import { XMarkIcon } from "@heroicons/react/20/solid";
import UpdateForm from "./UpdateForm";

export default function ExpandedFoodItem({
  foodItem,
  handleCloseExpanded,
  allCategories,
}: {
  foodItem: FoodItemType;
  handleCloseExpanded(): void;
  allCategories: Category[];
}) {
  return (
    <div
      id="item_container"
      className="relative flex flex-col py-2 px-[0.65rem] justify-center bg-orange-500 items-center w-full bg-opacity-20 rounded-md"
    >
      <h2 className="text-2xl text-purple-400 pb-2">Edit item</h2>
      <div className="absolute top-2 right-2 ">
        <button
          className="w-10 h-10 text-red-500 bg-black rounded-xl"
          onClick={handleCloseExpanded}
        >
          <XMarkIcon className=""></XMarkIcon>
        </button>
      </div>

      <UpdateForm
        foodItem={foodItem}
        handleCloseExpanded={handleCloseExpanded}
        allCategories={allCategories}
      ></UpdateForm>
    </div>
  );
}
