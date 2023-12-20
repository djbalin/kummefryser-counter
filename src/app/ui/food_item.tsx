"use client";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import {
  addDaysToDate,
  formatDateToReadable,
  getDateDDMMYYYY,
  getDaysLeftUntilDate,
} from "../lib/datehelper";

import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function FoodItem({ foodItem }: { foodItem: FoodItemType }) {
  console.log(foodItem);

  const rawDaysLeft = getDaysLeftUntilDate(foodItem.expirationDate);
  const daysLeft = formatDateToReadable(rawDaysLeft);
  const originalLifespan = formatDateToReadable(foodItem.lifespanInDays);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function handleClickEdit(event: any) {
    console.log("CLICKED EDIT");
    console.log(event);
  }

  // useEffect(() => {
  //   const nameContainer = document.getElementById("nameContainer");
  //   const compstyle = window.getComputedStyle(nameContainer!).fontSize;
  //   var containerWidth = nameContainer!.offsetWidth;
  //   var textWidth = nameContainer!.scrollWidth;

  //   console.log(containerWidth, textWidth);

  //   // Adjust font size based on the ratio of container width to text width
  //   var ratio = containerWidth / textWidth;
  //   // console.log("compstyle: " + compstyle);
  //   console.log(compstyle);
  // });

  // let style = "w-1/5 flex flex-col border-2 items-center";
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
    <div onClick={(e) => setCollapsed(!collapsed)} className="flex">
      {collapsed ? (
        <div className="flex justify-center flex-row px-2 bg-orange-400 py-2 items-center w-full h-auto  bg-opacity-20 rounded-md">
          {/* <div className="justify-around w-full"> */}

          <div className={listColumnStyle + "text-lg firstColumn"}>
            <span className="border-2 border-white border-opacity-30 px-3">
              {foodItem.quantity}
            </span>
          </div>

          <div
            id="nameContainer"
            className={listColumnStyle + " secondColumn text-center px-2"}
          >
            <span className="text-xl h-8 overflow-hidden">{foodItem.name}</span>
            <span className="opacity-70">{`${foodItem.volume} | ${foodItem.category}`}</span>
          </div>
          <div className={listColumnStyle + " thirdColumn"}>
            <span className={expiryStyle + " w-full bg-opacity-100 text-lg"}>
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
          <div className={listColumnStyle + " fifthColumn"}>
            <button
              onClick={(e) => {
                handleClickEdit(e);
              }}
              className="flex h-full w-[20%] items-center justify-center hover:scale-110 transition-all"
            >
              <PencilIcon></PencilIcon>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-row px-2 bg-orange-500 py-2 items-center w-full h-32  bg-opacity-20 rounded-md">
          {/* <div className="justify-around w-full"> */}

          <div className={listColumnStyle + "text-lg firstColumn"}>
            <span className="">{foodItem.quantity}</span>
          </div>
          <div className={listColumnStyle + " secondColumn"}>
            <span className="text-xl text-center">{foodItem.name}</span>
            <span className=" opacity-70">{`${foodItem.category} | ${foodItem.volume}`}</span>
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
          <div className={listColumnStyle + " fifthColumn"}>
            <button
              onClick={(e) => {
                handleClickEdit(e);
              }}
              className="flex h-full w-[20%] items-center justify-center hover:scale-110 transition-all"
            >
              <PencilIcon></PencilIcon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}