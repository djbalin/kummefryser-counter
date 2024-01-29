"use client";
import {
  Category,
  FoodItemType,
} from "@/app/lib/utils/types_schemas/typesAndSchemas";
import {
  formatDateToReadable,
  getDateDDMMYYYY,
  getDaysLeftUntilDate,
} from "../../lib/utils/datehelper";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ExpandedFoodItem from "../forms/expanded_item";

export default function FoodItem({
  foodItem,
  allCategories,
}: {
  foodItem: FoodItemType;
  allCategories: Category[];
}) {
  // console.log("RENDER FOODITEM");

  const [expanded, setExpanded] = useState<boolean>(false);
  // function handleClickEdit(event: any) {
  //   console.log("CLICKED EDIT");
  //   console.log(event);
  // }

  function handleCloseExpanded() {
    setExpanded(false);
  }

  return (
    <div
      onClick={(e) => {
        if (!expanded) {
          setExpanded(true);
        }
      }}
      className="flex"
    >
      {expanded ? (
        <ExpandedFoodItem
          foodItem={foodItem}
          handleCloseExpanded={handleCloseExpanded}
          allCategories={allCategories}
        ></ExpandedFoodItem>
      ) : (
        <CollapsedFoodItem foodItem={foodItem}></CollapsedFoodItem>
      )}
    </div>
  );
}

//
//
//
//
// Food item variants
//
//
//
//

function CollapsedFoodItem({ foodItem }: { foodItem: FoodItemType }) {
  const rawDaysLeft = getDaysLeftUntilDate(foodItem.expirationDate);
  const daysLeft = formatDateToReadable(rawDaysLeft);
  let listColumnStyle = "flex flex-col h-full items-center justify-center ";

  let expiryStyle = listColumnStyle + " rounded-xl ";

  // OK
  if (rawDaysLeft > 60) {
    expiryStyle += "bg-[hsla(119,74%,42%,1)]";
    // Warning
  } else if (rawDaysLeft > 30) {
    expiryStyle += "bg-[hsla(30,100%,46%,1)]";
    // Danger!!
  } else {
    expiryStyle += "bg-[hsla(0,100%,50%,1)]";
  }
  return (
    <div className="flex justify-center flex-row px-2 bg-orange-400 py-2 items-center w-full h-auto  bg-opacity-20 rounded-md">
      {/* QUANTITY */}
      <div className={listColumnStyle + "text-lg firstColumn"}>
        <span className="border-2 border-white border-opacity-30 px-3">
          {foodItem.quantity}
        </span>
      </div>

      {/* ITEM NAME */}
      {/* VOLUME, CATEGORY */}
      <div
        id="nameContainer"
        className={listColumnStyle + " secondColumn text-center px-2"}
      >
        <span className="text-xl h-8 overflow-hidden">{foodItem.name}</span>
        <span className="opacity-70 italic">{`${foodItem.volume} | ${foodItem.category}`}</span>
      </div>

      {/* TIME LEFT */}
      <div className={listColumnStyle + " thirdColumn"}>
        <div className={expiryStyle + " w-full bg-opacity-100 "}>
          <span className="text-xl drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
            {daysLeft}
          </span>
        </div>
      </div>
      {/* EXPIRATION DATE */}
      {/* FREEZE DATE */}
      <div className={listColumnStyle + " fourthColumn text-justify "}>
        <span className="text-lg ">
          {getDateDDMMYYYY(foodItem.expirationDate, true)}
        </span>
        <span className="opacity-70 text-sm">
          {getDateDDMMYYYY(foodItem.freezeDate, true)}
        </span>
      </div>
      <div className={listColumnStyle + " fifthColumn"}>
        <button className="flex h-full w-[40%] items-center justify-center hover:scale-110 transition-all">
          <PencilIcon></PencilIcon>
        </button>
      </div>
    </div>
  );
}
