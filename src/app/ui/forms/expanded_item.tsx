"use client";
import { FoodItemType } from "@/app/types_schemas/typesAndSchemas";
import {
  formatDateToReadable,
  getDateDDMMYYYY,
  getDateYYYYMMDD,
  getDaysLeftUntilDate,
} from "../../lib/datehelper";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Button } from "../button";
import { CategorySchemaType } from "@/app/lib/db/dbschema";
import React from "react";
import { updateItem } from "@/app/lib/actions";

function createRegex(query: string): RegExp {
  const charArr: string[] = Array.from(query.toLowerCase());
  return new RegExp(".*" + charArr.join(".*") + ".*");
}

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
  allCategories,
}: {
  foodItem: FoodItemType;
  handleCloseExpanded(): void;
  allCategories: CategorySchemaType[];
}) {
  const originalLifespan = formatDateToReadable(foodItem.lifespanInDays);

  const [quantityValue, setQuantityValue] = useState(
    foodItem.quantity.toString()
  );
  const [foodItemName, setFoodItemName] = useState<string>(foodItem.name);
  const [foodItemVolume, setFoodItemVolume] = useState<string>(foodItem.volume);
  const [foodItemCategory, setFoodItemCategory] = useState<string>(
    foodItem.category
  );
  const [expirationDate, setExpirationDate] = useState(
    getDateYYYYMMDD(foodItem.expirationDate)
  );
  const [freezeDate, setFreezeDate] = useState(
    getDateYYYYMMDD(foodItem.freezeDate)
  );
  const rawDaysLeft = getDaysLeftUntilDate(new Date(expirationDate));
  const daysLeft = formatDateToReadable(rawDaysLeft);

  const [categoryInputIsFocused, setCategoryInputIsFocused] = useState(false);
  const [categoriesToShow, setCategoriesToShow] =
    useState<CategorySchemaType[]>(allCategories);
  let listColumnStyle = "flex flex-col h-full ";

  let expiryStyle = "flex flex-col items-center justify-center rounded-xl ";

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

  const inputStyle = "bg-slate-500 bg-opacity-40 pl-2 rounded-lg";
  const textInputStyle =
    "text-xl text-left w-[75%] py-1 bg-inherit rounded-md border-2 border-orange-800 border-opacity-50 px-2";

  function handleFocusCategory(event: React.FocusEvent) {
    setCategoryInputIsFocused(true);
  }
  function handleBlurCategory(event: React.FocusEvent) {
    setCategoryInputIsFocused(false);
    if (foodItemCategory.length === 0) {
      setFoodItemCategory(foodItem.category);
    }
  }

  function getDropdownWidthInPx(): string {
    const width: number = getWidthOfElement("categoryInput");
    console.log(width);

    return width.toString() + "px";
  }

  function getWidthOfElement(elementId: string) {
    return document.getElementById(elementId)!.offsetWidth;
  }

  function handleTypeCategory(value: string) {
    setFoodItemCategory(value);

    setCategoriesToShow(getMatchingCategories(allCategories, value));
  }

  return (
    <div className="flex flex-col p-4 justify-center bg-orange-500 items-center w-full h-64  bg-opacity-20 rounded-md">
      <div className="flex w-full justify-end">
        {" "}
        <button
          className="w-10 h-10 text-red-500 bg-black rounded-xl"
          onClick={handleCloseExpanded}
        >
          <XMarkIcon className=""></XMarkIcon>
        </button>
        {/* <Button className="w-auto" onClick={(e) => handleCloseExpanded()}>
          X
        </Button> */}
      </div>
      <form
        className="w-full flex flex-col h-full items-center justify-center"
        action={async (formData: FormData) => {
          formData.append("_id", foodItem._id);
          const ob = Object.fromEntries(formData);
          console.log(ob);
          await updateItem(formData);
          handleCloseExpanded();
        }}
      >
        <div className="flex flex-row w-full">
          <div
            className={
              "flex flex-row h-full items-center justify-center text-lg w-[23%]"
            }
          >
            <div className="flex flex-col gap-y-2">
              <span className="">Quantity:</span>

              <div className="flex flex-row">
                <input
                  id="itemQuantity"
                  name="itemQuantity"
                  className="flex mr-2 w-12 h-12 text-center bg-orange-500 "
                  type="text"
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
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
              " w-[34%] items-center gap-y-2 bg-inherit justify-center"
            }
          >
            <div className="flex w-full items-center justify-center flex-row">
              <label
                className="w-[25%] text-sm text-right pr-4"
                htmlFor="nameInput"
              >
                Item name:
              </label>
              <input
                name="itemName"
                className={`${textInputStyle}`}
                type="text"
                id="nameInput"
                value={foodItemName}
                onChange={(e) => {
                  setFoodItemName(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-center w-full">
              <label
                className="w-[25%] text-sm text-right pr-4"
                htmlFor="volumeInput"
              >
                Volume:
              </label>
              <input
                name="itemVolume"
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
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="flex w-full items-center flex-row">
                <label
                  className="w-[25%] text-sm text-right pr-4"
                  htmlFor="categoryInput"
                >
                  Category:
                </label>
                {/* <select className={`${textInputStyle} appearance-none`}> */}

                <input
                  id="categoryInput"
                  name="itemCategory"
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

              {categoryInputIsFocused ? (
                <div
                  id="dropdownContainer"
                  className={`pl-[25%] w-full z-10 items-left`}
                >
                  <ul
                    id="dropdownList"
                    className={`z-10 cursor-pointer absolute flex flex-col rounded-md  
                   border-orange-800 bg-orange-500`}
                    style={{ width: getDropdownWidthInPx() }}
                    // className={`${
                    //   categoryInputIsFocused ? "absolute" : "hidden"
                    // } px-2 rounded-md border-orange-800 bg-orange-500 border-2`}
                  >
                    {categoriesToShow.map((cat) => {
                      return (
                        <li
                          key={cat._id}
                          value={cat.category}
                          className="flex px-2 z-10 rounded-sm hover:bg-orange-700 text-center "
                          onMouseDown={(e) => {
                            setFoodItemCategory(e.currentTarget.innerHTML);
                          }}
                        >
                          {cat.category}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className={listColumnStyle + "items-center justify-center w-[23%]"}
          >
            <span
              className={
                expiryStyle + " w-[70%] h-[50%] bg-opacity-100 text-lg"
              }
            >
              {daysLeft}
            </span>
          </div>
          <div
            className={
              listColumnStyle + " justify-center items-end w-[23%]  gap-y-4"
            }
          >
            <div className="flex flex-row w-full items-center">
              <label
                className=" text-sm text-right pr-4"
                htmlFor="expirationDate"
              >
                Expires:
              </label>
              <input
                className={`${inputStyle} h-10 border-2 w-min border-white border-opacity-50 placeholder:text-xs`}
                // value={"Choose"}
                type="date"
                id="expirationDate"
                name="expirationDate"
                // value={foodItem.expirationDate.toString()}
                value={expirationDate}
                onChange={(e) => {
                  // e.target.classList.remove(...invalidInputStyle);
                  setExpirationDate(e.target.value);
                  // setFreezeDateIsSet(true);
                }}
              />
            </div>
            <div className="flex flex-row w-full items-center">
              <label className=" text-sm text-right pr-4" htmlFor="freezeDate">
                Frozen:
              </label>
              <input
                className={`${inputStyle} h-10 w-min border-2 border-white border-opacity-50 placeholder:text-xs`}
                // value={"Choose"}
                type="date"
                id="freezeDate"
                name="freezeDate"
                // value={foodItem.expirationDate.toString()}
                value={freezeDate}
                onChange={(e) => {
                  // e.target.classList.remove(...invalidInputStyle);
                  setFreezeDate(e.target.value);
                  // setFreezeDateIsSet(true);
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-row justify-end w-full gap-y-2 items-center mt-4 gap-x-10 align-center"
          }
        >
          <Button type="submit" className="w-48">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
