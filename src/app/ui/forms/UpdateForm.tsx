"use client";
import { deleteItem, updateItem } from "@/app/lib/db/firebase";
import {
  getDateYYYYMMDD,
  getDaysLeftUntilDate,
  formatDateToReadable,
} from "@/app/lib/utils/datehelper";
import {
  Category,
  FoodItemType,
} from "@/app/lib/utils/types_schemas/typesAndSchemas";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Button } from "../button";
import { getCookie } from "cookies-next";
import Modal from "../Modal";

export default function UpdateForm({
  foodItem,
  handleCloseExpanded,
  allCategories,
}: {
  foodItem: FoodItemType;
  handleCloseExpanded: () => void;
  allCategories: Category[];
}) {
  const [updatingItem, setUpdatingItem] = useState(false);

  async function handleUpdateItem(formData: FormData) {
    formData.append("_id", foodItem._id);
    if (!user) {
      throw new Error("Must be logged in to update item");
    }
    await updateItem(foodItem._id, formData, user.valueOf());
    setUpdatingItem(false);
    handleCloseExpanded();
  }

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 940
  );
  addEventListener("resize", (event) => {
    if (window.innerWidth < 940) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  });

  const user = getCookie("user_id");
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
    useState<Category[]>(allCategories);
  let listColumnStyle = "flex flex-col h-full ";

  let expiryStyle = "flex text-center justify-center items-center  rounded-xl ";

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
  //   const textInputField =
  //     "text-xl text-left w-[75%] py-1 bg-inherit rounded-md border-2 border-orange-800 border-opacity-50 px-2";

  function handleFocusCategory(event: React.FocusEvent) {
    setCategoryInputIsFocused(true);
  }
  function handleBlurCategory(event: React.FocusEvent) {
    setCategoryInputIsFocused(false);
    if (foodItemCategory.length === 0) {
      setFoodItemCategory(foodItem.category);
    }
  }

  function createRegex(query: string): RegExp {
    const charArr: string[] = Array.from(query.toLowerCase());
    return new RegExp(".*" + charArr.join(".*") + ".*");
  }

  function getMatchingCategories(
    categories: Category[],
    query: string
  ): Category[] {
    const reg: RegExp = createRegex(query);
    return categories.filter((cat) => reg.test(cat.name.toLowerCase()));
  }

  function getDropdownWidthInPx(): string {
    const width: number = getWidthOfElement("categoryInput");
    return width.toString() + "px";
  }

  function getWidthOfElement(elementId: string) {
    return document.getElementById(elementId)!.offsetWidth;
  }

  function handleTypeCategory(value: string) {
    setFoodItemCategory(value);

    setCategoriesToShow(getMatchingCategories(allCategories, value));
  }

  if (isSmallScreen) {
    return (
      <form
        className="w-full flex flex-col gap-y-2 h-auto items-start"
        action={async (formData) => handleUpdateItem(formData)}
      >
        {updatingItem && <Modal text={"Updating item..."} />}
        <div
          id="quantity_container"
          className="flex flex-row w-full items-center "
        >
          <label className="labelStyle" htmlFor="itemQuantity">
            Quantity
          </label>
          <div className="flex flex-row">
            <input
              id="itemQuantity"
              name="itemQuantity"
              className="flex mr-2 w-8 h-8 text-center rounded-md bg-orange-500 "
              type="text"
              value={quantityValue}
              onChange={(e) => setQuantityValue(e.target.value)}
            ></input>
            <div className="flex gap-x-4">
              <button
                className="w-8"
                onClick={(e) => {
                  e.preventDefault();
                  setQuantityValue((old) => (parseInt(old) + 1).toString());
                }}
              >
                <PlusCircleIcon />
              </button>
              <button
                className="w-8"
                onClick={(e) => {
                  e.preventDefault();
                  setQuantityValue((old) => (parseInt(old) - 1).toString());
                }}
              >
                <MinusCircleIcon></MinusCircleIcon>
              </button>
              <button
                className="w-8"
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
        <div id="text_areas" className="flex flex-col gap-y-1 w-full">
          <div className="flex flex-row items-center gap-y-2 ">
            <label className="labelStyle" htmlFor="nameInput">
              Item name:
            </label>
            <input
              name="itemName"
              className="textInputField"
              type="text"
              id="nameInput"
              value={foodItemName}
              onChange={(e) => {
                setFoodItemName(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-row items-center ">
            <label className="labelStyle" htmlFor="volumeInput">
              Volume:
            </label>
            <input
              name="itemVolume"
              id="volumeInput"
              className="textInputField"
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
              <label className="labelStyle" htmlFor="categoryInput">
                Category:
              </label>

              <input
                id="categoryInput"
                name="itemCategory"
                className="textInputField"
                type="text"
                onFocus={(e: React.FocusEvent) => {
                  handleFocusCategory(e);
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
                >
                  {categoriesToShow.map((category) => {
                    return (
                      <li
                        key={category.id}
                        value={category.name}
                        className="flex px-2 z-10 rounded-sm hover:bg-orange-700 text-center "
                        onMouseDown={(e) => {
                          setFoodItemCategory(e.currentTarget.innerHTML);
                        }}
                      >
                        {category.name}
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
        <div id="expiry_date" className="flex flex-row w-full items-center">
          <label className="labelStyle" htmlFor="expirationDate">
            Expires:
          </label>
          <input
            className={`${inputStyle} w-62 h-10 border-2 border-white border-opacity-50 placeholder:text-xs`}
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={expirationDate}
            onChange={(e) => {
              setExpirationDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row w-full items-center">
          <label className=" labelStyle" htmlFor="freezeDate">
            Frozen:
          </label>
          <input
            className={`${inputStyle} h-10 w-62 border-2 border-white border-opacity-50 placeholder:text-xs`}
            type="date"
            id="freezeDate"
            name="freezeDate"
            value={freezeDate}
            onChange={(e) => {
              setFreezeDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row w-full h-auto items-center">
          <span className="labelStyle">Time left:</span>
          <span
            className={
              expiryStyle + " flex-1 max-w-sm h-10 bg-opacity-100 text-lg"
            }
          >
            {daysLeft}
          </span>
        </div>

        <div className="flex justify-end gap-x-4 w-full items-center mt-2 align-center">
          <button
            className="w-48 h-auto bg-[hsla(0,100%,50%,1)] rounded-lg py-2 font-semibold"
            onClick={async (e) => {
              e.preventDefault();
              if (
                window.confirm("Are you sure you wish to delete this item?")
              ) {
                await deleteItem(foodItem._id, user!.valueOf());
              }
            }}
          >
            Delete item
          </button>
          <button
            type="submit"
            className="w-48 h-auto bg-[hsla(125,100%,50%,0.7)] rounded-lg py-2 font-semibold"
            onClick={(e) => setUpdatingItem(true)}
          >
            Save changes
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form
        className="w-full flex flex-col h-full"
        action={async (formData) => handleUpdateItem(formData)}
      >
        {updatingItem && <Modal text={"Updating item..."} />}
        <div className="flex flex-row gap-x-2 w-full justify-between">
          <div
            className={
              "flex flex-row h-full items-center justify-center text-lg pl-8"
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
              " flex-1 max-w-sm items-center gap-y-2 bg-inherit justify-center"
            }
          >
            <div className="flex w-full items-center justify-center">
              <label className="textInputLabel" htmlFor="nameInput">
                Item name:
              </label>
              <input
                name="itemName"
                className="textInputField"
                type="text"
                id="nameInput"
                value={foodItemName}
                onChange={(e) => {
                  setFoodItemName(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-center w-full">
              <label className="textInputLabel" htmlFor="volumeInput">
                Volume:
              </label>
              <input
                name="itemVolume"
                id="volumeInput"
                className="textInputField"
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
              <div className="flex items-center justify-center w-full">
                <label className="textInputLabel" htmlFor="categoryInput">
                  Category:
                </label>

                <input
                  id="categoryInput"
                  name="itemCategory"
                  className="textInputField"
                  type="text"
                  onFocus={(e: React.FocusEvent) => {
                    handleFocusCategory(e);
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

              {categoryInputIsFocused && (
                <div
                  id="dropdownContainer"
                  className={`pl-[25%] w-full z-10 items-left`}
                >
                  <ul
                    id="dropdownList"
                    className={`z-10 cursor-pointer absolute flex flex-col rounded-md  
                   border-orange-800 bg-orange-500`}
                    style={{ width: getDropdownWidthInPx() }}
                  >
                    {categoriesToShow.map((category) => {
                      return (
                        <li
                          key={category.id}
                          value={category.name}
                          className="flex px-2 z-10 rounded-sm hover:bg-orange-700 text-center "
                          onMouseDown={(e) => {
                            setFoodItemCategory(e.currentTarget.innerHTML);
                          }}
                        >
                          {category.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className={listColumnStyle + "items-center justify-center "}>
            <span
              className={expiryStyle + "  h-16 w-32  bg-opacity-100 text-lg"}
            >
              {daysLeft}
            </span>
          </div>
          <div
            className={" flex flex-col h-full justify-center items-end gap-y-4"}
          >
            <div className="flex flex-wrap flex-row w-auto  items-center justify-end">
              <label
                className=" xl:text-lg text-right pr-2 xl:pr-4"
                htmlFor="expirationDate"
              >
                Expires:
              </label>
              <input
                className={`${inputStyle} h-10 border-2 w-min border-white border-opacity-50 text-sm`}
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={expirationDate}
                onChange={(e) => {
                  setExpirationDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-wrap flex-row w-full items-center justify-end">
              <label
                className=" xl:text-lg text-right pr-2 xl:pr-4"
                htmlFor="freezeDate"
              >
                Frozen:
              </label>
              <input
                className={`${inputStyle} h-10 w-min border-2 border-white border-opacity-50 text-sm`}
                type="date"
                id="freezeDate"
                name="freezeDate"
                value={freezeDate}
                onChange={(e) => {
                  setFreezeDate(e.target.value);
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
          <button
            className="w-48 h-auto bg-[hsla(0,100%,50%,1)] rounded-lg py-2 font-semibold"
            onClick={async (e) => {
              e.preventDefault();
              if (
                window.confirm("Are you sure you wish to delete this item?")
              ) {
                await deleteItem(foodItem._id, user!.valueOf());
              }
            }}
          >
            Delete item
          </button>
          <Button
            onClick={(e) => setUpdatingItem(true)}
            type="submit"
            className="w-48"
          >
            Save changes
          </Button>
        </div>
      </form>
    );
  }
}
