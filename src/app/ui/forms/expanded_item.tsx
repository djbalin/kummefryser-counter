"use client";
// import { FoodItemType } from "../types_schemas/typesAndSchemas";
import { FoodItemType } from "@/app/types_schemas/typesAndSchemas";
// import ArrowPathIcon from "@heroicons/react/20/solid";
import {
  addDaysToDate,
  formatDateToReadable,
  getDateDDMMYYYY,
  getDaysLeftUntilDate,
} from "../../lib/datehelper";
import {
  PlusIcon,
  MinusIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import { SetStateAction, useState } from "react";
import { Button } from "../button";

export default function ExpandedFoodItem({
  foodItem,
  handleCloseExpanded,
}: {
  foodItem: FoodItemType;
  handleCloseExpanded(): void;
}) {
  const rawDaysLeft = getDaysLeftUntilDate(foodItem.expirationDate);
  const daysLeft = formatDateToReadable(rawDaysLeft);
  const originalLifespan = formatDateToReadable(foodItem.lifespanInDays);

  const [quantityValue, setQuantityValue] = useState(
    foodItem.quantity.toString()
  );
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
  console.log("RENDER EXPANDED ITEM");

  return (
    <div className="flex flex-col justify-center px-2 bg-orange-500 py-2 items-center w-full h-32  bg-opacity-20 rounded-md">
      <form className="w-full flex">
        {/* <div className=""> */}
        {/* <div className="justify-around w-full"> */}
        <div
          className={
            "flex flex-row h-full items-center justify-center border-2 text-lg firstColumn"
          }
        >
          {/* <span className="">{foodItem.quantity}</span> */}
          <input
            className="flex border-2 mr-2 border-white w-12 h-12 text-center bg-orange-500 border-opacity-30 px-2"
            type="text"
            value={quantityValue}
            onChange={(e) => setQuantityValue(e.target.value)}
            // defaultValue={foodItem.quantity}
          ></input>
          <div className="flex flex-col w-7">
            <button
              className=""
              onClick={(e) => {
                e.preventDefault();
                setQuantityValue((old) => (parseInt(old) + 1).toString());
              }}
            >
              <PlusCircleIcon />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("clicked minus");

                setQuantityValue((old) => (parseInt(old) - 1).toString());
              }}
            >
              <MinusCircleIcon></MinusCircleIcon>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuantityValue(foodItem.quantity.toString());
              }}
            >
              <ArrowPathIcon />
            </button>
          </div>
        </div>
        <div
          className={
            listColumnStyle +
            " secondColumn items-center gap-y-2 bg-inherit bg-chi justify-center"
          }
        >
          <span className="text-xl w-min border-2 text-center">
            <input
              className="text-xl text-center bg-inherit"
              type="text"
              value={foodItem.name}
            />
          </span>
          <div className="flex w-min">
            <input
              className="text-xl w-min text-center bg-inherit"
              type="text"
              value={foodItem.volume}
            />
            <input
              className="text-sm w-min border-2 bg-inherit text-center"
              type="text"
              value={foodItem.category}
            />
          </div>
          {/* <span className="text-xl text-center">{foodItem.name}</span>
          <span className=" opacity-70">{`${foodItem.category} | ${foodItem.volume}`}</span> */}
        </div>
        <div className={listColumnStyle + " thirdColumn"}>
          <span className={expiryStyle + " w-32 bg-opacity-100 text-lg"}>
            {daysLeft}
          </span>
        </div>
        <div className={listColumnStyle + " fourthColumn"}>
          <span className="text-lg">
            {getDateDDMMYYYY(foodItem.expirationDate, true)}
          </span>
          <span className="opacity-70 text-sm">
            {getDateDDMMYYYY(foodItem.freezeDate, true)}
          </span>
        </div>
        <div
          className={
            listColumnStyle +
            " fifthColumn flex gap-y-2 items-center align-center border-2 border-opacity-20 border-white"
          }
        >
          <Button className="w-full" onClick={(e) => handleCloseExpanded()}>
            Close
          </Button>
          <Button className="w-full" onClick={(e) => handleCloseExpanded()}>
            Submit
          </Button>
        </div>
      </form>
      {/* <button onClick={(e) => handleCloseExpanded()}>Close</button> */}
    </div>
  );
}
