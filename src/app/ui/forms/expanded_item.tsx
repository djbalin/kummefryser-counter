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
import clsx from "clsx";
import Categories from "../categories";
import { CategorySchemaType } from "@/app/lib/db/dbschema";
import React from "react";
function createRegex(query: string): RegExp {
  const charArr: string[] = Array.from(query.toLowerCase());
  return new RegExp(".*" + charArr.join(".*") + ".*");
}

const categories: CategorySchemaType[] = [
  { category: "fruit", _id: "absbd" },
  { category: "meat", _id: "ase" },
  { category: "dairy", _id: "abdsbd" },
  { category: "cooked dish", _id: "abswewbd" },
  { category: "meaty dish", _id: "abeswaweewbd" },
  { category: "vegetables", _id: "abaweswewbd" },
  { category: "frozen fruit", _id: "absweweewewbd" },
];
function getMatchingCategories(
  categories: CategorySchemaType[],
  query: string
): CategorySchemaType[] {
  const reg: RegExp = createRegex(query);
  return categories.filter((cat) => reg.test(cat.category.toLowerCase()));
}

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
  const [foodItemName, setFoodItemName] = useState<string>(foodItem.name);
  const [foodItemVolume, setFoodItemVolume] = useState<string>(foodItem.volume);
  const [foodItemCategory, setFoodItemCategory] = useState<string>(
    foodItem.category
  );

  const [dropdownWidth, setDropdownWidth] = useState("0px");
  const [categoryInputIsFocused, setCategoryInputIsFocused] = useState(false);
  const [categoriesToShow, setCategoriesToShow] =
    useState<CategorySchemaType[]>(categories);
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
  // console.log("RENDER EXPANDED ITEM");

  // function setFoodItemName(value: string) {
  //   throw new Error("Function not implemented.");
  // }

  // function setFoodItemVolume(value: string) {
  //   throw new Error("Function not implemented.");
  // }
  // function setFoodItemCategory(value: string) {
  //   throw new Error("Function not implemented.");
  // }

  const textInputStyle =
    "text-xl text-left w-[75%] py-1 bg-inherit rounded-md border-2 border-orange-800 border-opacity-50 px-2";

  function handleFocusCategory(event: React.FocusEvent) {
    // setDropdownWidth(getDropdownWidthInPx());
    setCategoryInputIsFocused(true);
    // showCategoryDropdown();
    // getDropdownWidthInPx();
    // console.log("FOCUS cateogyr input");
  }
  function handleBlurCategory(event: React.FocusEvent) {
    setCategoryInputIsFocused(false);
    // console.log("FOCUS cateogyr input");
  }

  function getDropdownWidthInPx(): string {
    const width: number = getWidthOfElement("categoryInput");
    // console.log("WIDTH: " + width);

    return width.toString() + "px";
  }

  function getWidthOfElement(elementId: string) {
    return document.getElementById(elementId)!.offsetWidth;
  }

  function handleTypeCategory(value: string) {
    setFoodItemCategory(value);

    setCategoriesToShow(getMatchingCategories(categories, value));
  }

  function handleClickCategory(event: string) {
    setFoodItemCategory(event);
  }

  function handleLiClick() {
    console.log("LI CLICKED");
    console.log("LI CLICKED");
    console.log("LI CLICKED");
  }

  // function getFilteredCategories(): CategorySchemaType[] {}

  return (
    <div
      className="flex flex-col py-4 justify-center bg-orange-500 items-center w-full h-48  bg-opacity-20 rounded-md"
      onClick={(e) => {
        console.log("Onclik master div");
      }}
    >
      <form className="w-full flex border-2 h-full items-center justify-center">
        {/* <div className=""> */}
        {/* <div className="justify-around w-full"> */}
        <div
          className={
            "flex flex-row h-full items-center justify-center text-lg firstColumn"
          }
        >
          <div className="flex flex-col gap-y-2">
            <span className="">Quantity:</span>

            <div className="flex flex-row">
              <input
                className="flex mr-2 w-12 h-12 text-center bg-orange-500 border-opacity-30 px-2"
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
              </div>
              <button
                className="w-6"
                onClick={(e) => {
                  e.preventDefault();
                  setQuantityValue(foodItem.quantity.toString());
                }}
              >
                <ArrowPathIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            listColumnStyle +
            " secondColumn items-center gap-y-2 bg-inherit justify-center"
          }
        >
          <div className="flex w-full px-8 items-center justify-center flex-row">
            <label className="w-[25%] text-sm" htmlFor="nameInput">
              Item name:
            </label>
            <input
              className={`${textInputStyle}`}
              // className="text-xl text-left w-[75%] bg-inherit"
              type="text"
              id="nameInput"
              value={foodItemName}
              onChange={(e) => {
                setFoodItemName(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-center w-full px-8">
            <label className="w-[25%] text-sm" htmlFor="volumeInput">
              Volume:
            </label>
            <input
              id="volumeInput"
              className={`${textInputStyle}`}
              // className="text-xl w-[75%] text-left bg-inherit"
              type="text"
              value={foodItemVolume}
              onChange={(e) => {
                setFoodItemVolume(e.target.value);
              }}
            />
          </div>
          <div
            id="parentOfDropdown"
            className="flex flex-col items-center justify-center w-full px-8"
          >
            <div className="flex w-full flex-row">
              <label className="w-[25%] text-sm" htmlFor="categoryInput">
                Category:
              </label>
              {/* <select className={`${textInputStyle} appearance-none`}> */}

              <input
                id="categoryInput"
                className={`${textInputStyle}`}
                // className="text-xl px-2 w-[75%] border-2 bg-inherit text-left"
                type="text"
                onFocus={(e: React.FocusEvent) => {
                  handleFocusCategory(e);
                  // setCategoryIsFocused(true);
                }}
                onBlur={(e: React.FocusEvent) => {
                  handleBlurCategory(e);
                }}
                value={foodItemCategory}
                onChange={(e) => {
                  handleTypeCategory(e.target.value);
                }}
              />
            </div>
            {/* {categoryInputIsFocused ? (
              <Dropdown
                categoriesToShow={categoriesToShow}
                getDropdownWidthInPx={getDropdownWidthInPx}
              ></Dropdown>
            ) : (
              <></>
            )} */}

            {categoryInputIsFocused ? (
              <>
                <div
                  id="dropdownContainer"
                  className={`pl-[25%] w-full z-10 items-left pointer-events-auto`}
                >
                  <ul
                    id="dropdownList"
                    className={` z-10 cursor-pointer absolute  pointer-events-auto flex flex-col rounded-md w-[${getDropdownWidthInPx()}]  border-orange-800 bg-orange-500`}
                    // className={`${
                    //   categoryInputIsFocused ? "absolute" : "hidden"
                    // } px-2 rounded-md border-orange-800 bg-orange-500 border-2`}
                  >
                    {categoriesToShow.map((cat) => {
                      return (
                        <li
                          key={cat._id}
                          value={cat.category}
                          className="flex px-2 z-10 pointer-events-auto rounded-sm hover:bg-orange-700 text-center "
                          // onMouseOver={(e) => {
                          //   console.log(e.currentTarget.innerHTML);
                          // }}
                          onMouseDown={(e) => {
                            console.log("MOUSEDOWN");
                            console.log(e.currentTarget.innerHTML);
                            setFoodItemCategory(e.currentTarget.innerHTML);
                          }}
                        >
                          {cat.category}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={listColumnStyle + " thirdColumn"}>
          <span
            className={expiryStyle + " w-32 h-[50%] bg-opacity-100 text-lg"}
          >
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
