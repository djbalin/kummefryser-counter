"use client";
import { Category, FoodItemType } from "@/app/lib/utils/typesAndSchemas";
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
      // ref={itemContainerRef}
      id="item_container"
      className="relative flex flex-col py-2 px-[0.65rem] justify-center bg-orange-500 items-center w-full bg-opacity-20 rounded-md"
    >
      <h2 className="text-2xl text-purple-400 pb-2">Edit item</h2>
      {/* <div
        // ref={overlayContainerRef}
        id="overlay_container"
        className="absolute hidden items-center cursor-not-allowed justify-center top-0 left-0 w-full h-[150vh] bg-slate-700 bg-opacity-50"
      >
        <p
          // ref={overlayTextRef}
          id="overlay_text"
          className="absolute flex text-2xl rounded-[10rem] justify-center items-center py-auto  w-[20%] h-[10%] bg-black z-10"
        >
          Saving item...
        </p>
      </div> */}
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
