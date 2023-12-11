"use client";
import FoodItemType from "../types/fooditem";
import {
  formatLifespan,
  getDateDDMMYYYY,
  getRemainingTime,
} from "../lib/datehelper";
import FoodItemInfo from "./fooditeminfo";

import { PencilIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

export default function FoodItem({ foodItem }: { foodItem: FoodItemType }) {
  const [daysLeft, timeLeft] = getRemainingTime(foodItem.expirationDate);

  const originalLifespan = formatLifespan(foodItem.durationDays);

  function handleClickEdit(event: any) {
    console.log(event);
  }

  // let style = "w-1/5 flex flex-col border-2 items-center";
  let listColumnStyle = "flex flex-col h-full items-center justify-center ";

  let expiryStyle = listColumnStyle + " rounded-xl ";
  if (daysLeft > 60) {
    expiryStyle += "bg-[hsla(119,74%,42%,1)]";
  } else if (daysLeft > 30) {
    expiryStyle += "bg-[hsla(30,100%,46%,1)]";
  } else {
    expiryStyle += "bg-[hsla(0,100%,50%,1)]";
  }

  //   const quantity = 5;

  return (
    <div className="flex justify-center flex-row px-2 bg-orange-400 py-2 items-center w-full h-auto  bg-opacity-20 rounded-md">
      {/* <div className="justify-around w-full"> */}

      <div className={listColumnStyle + " minorColumn"}>
        <span className="">5x</span>
      </div>
      <div className={listColumnStyle + " majorColumn"}>
        <span className="">{foodItem.name}</span>
        <span className="lower">{`${foodItem.category} | ${foodItem.volume}`}</span>
      </div>
      <div className={listColumnStyle + " majorColumn"}>
        <span className={expiryStyle + " w-32 bg-opacity-100"}>{timeLeft}</span>
      </div>
      <div className={listColumnStyle + " majorColumn"}>
        <span className="">
          {getDateDDMMYYYY(foodItem.expirationDate, true)}
        </span>
        <span className="lower">
          {getDateDDMMYYYY(foodItem.freezeDate, true)}
        </span>
      </div>
      <div className={listColumnStyle + " minorColumn"}>
        {/* <span className=""> */}
        <button
          onClick={(e) => {
            handleClickEdit(e);
          }}
          className="flex h-full w-[40%] items-center justify-center hover:scale-110 transition-all"
        >
          <PencilIcon></PencilIcon>
        </button>
        {/* </span> */}
      </div>

      {/* <FoodItemInfo
        upper={"5x"}
        // lower={originalLifespan}
        lower={null}
      ></FoodItemInfo>
      <FoodItemInfo
        upper={foodItem.name}
        lower={`${foodItem.category} | ${foodItem.volume}`}
      ></FoodItemInfo>
      <div className={style}>
        <FoodItemInfo
          upper={timeLeft}
          // lower={originalLifespan}
          lower={null}
        ></FoodItemInfo>
      </div>
      <FoodItemInfo
        upper={getDateDDMMYYYY(foodItem.expirationDate, true)}
        lower={getDateDDMMYYYY(foodItem.freezeDate, true)}
      ></FoodItemInfo>
      {/* <DocumentTextIcon width={16}></DocumentTextIcon> */}
      {/* </div> */}
      {/* <button
        onClick={(e) => {
          handleClickEdit(e);
        }}
        className="flex h-full w-1/6 items-center border-2 justify-center hover:scale-110 transition-all"
      >
        <PencilIcon width={16}></PencilIcon>
      </button>  */}
    </div>
  );
}
