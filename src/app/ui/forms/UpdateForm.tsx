import { useAuthContext } from "@/app/contexts/auth_context";
import { updateItem } from "@/app/lib/db/firebase";
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

export default function UpdateForm({
  foodItem,
  handleCloseExpanded,
  allCategories,
}: {
  foodItem: FoodItemType;
  handleCloseExpanded: () => void;
  allCategories: Category[];
}) {
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
  const { user } = useAuthContext();

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
  //   const textInputStyle =
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

  async function handleUpdateItem(formData: FormData) {
    const overlay = document.getElementById("overlay");
    const container = document.getElementById("item_container");
    const overlayText = document.getElementById("overlay_text");
    const itemOffset = container?.offsetTop;
    overlayText!.style.top = itemOffset + "px";
    overlay?.classList.remove("invisible");
    overlay?.classList.add("flex");
    formData.append("_id", foodItem._id);
    if (!user) {
      throw new Error("Must be logged in to update item");
    }
    await updateItem(foodItem._id, formData, user.uid);
    handleCloseExpanded();
    overlay?.classList.remove("flex");
    overlay?.classList.add("invisible");
  }

  if (isSmallScreen) {
    return (
      <form
        className="w-full flex flex-col gap-y-2 h-auto items-center"
        action={async (formData) => handleUpdateItem(formData)}
      >
        <div
          id="quantity_container"
          className="flex flex-row w-full items-center"
        >
          {/* <span className="w-[25%] text-lg text-right pr-4">Quantity:</span> */}
          <label className="labelStyle" htmlFor="itemQuantity">
            Quantity
          </label>
          <div className="flex flex-row w-[75%]">
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
          <div className="flex flex-row items-center gap-y-2 w-full">
            <label className="labelStyle" htmlFor="nameInput">
              Item name:
            </label>
            <input
              name="itemName"
              className="textInputStyle"
              type="text"
              id="nameInput"
              value={foodItemName}
              onChange={(e) => {
                setFoodItemName(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <label className="labelStyle" htmlFor="volumeInput">
              Volume:
            </label>
            <input
              name="itemVolume"
              id="volumeInput"
              className="textInputStyle"
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
                className="textInputStyle"
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
            className={`${inputStyle} w-[75%] h-10 border-2 border-white border-opacity-50 placeholder:text-xs`}
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
            className={`${inputStyle} h-10 w-[75%] border-2 border-white border-opacity-50 placeholder:text-xs`}
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
            className={expiryStyle + " w-[75%] h-10 bg-opacity-100 text-lg"}
          >
            {daysLeft}
          </span>
        </div>

        <div
          className={"flex justify-end w-full items-center mt-2 align-center"}
        >
          <button
            className="w-48 h-auto bg-[hsla(125,100%,50%,0.7)] rounded-lg py-2 font-semibold"
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form
        className="w-full flex flex-col h-full items-center justify-center"
        action={async (formData) => handleUpdateItem(formData)}
      >
        <div className="flex flex-row w-full">
          <div
            className={
              "flex flex-row h-full items-center justify-center text-lg w-[20%]"
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
              " w-[34%] items-center gap-y-2 bg-inherit justify-center"
            }
          >
            <div className="flex w-full items-center justify-center">
              <label
                className="w-[25%] text-lg text-right pr-4"
                htmlFor="nameInput"
              >
                Item name:
              </label>
              <input
                name="itemName"
                className="textInputStyle"
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
                className="w-[25%] text-lg text-right pr-4"
                htmlFor="volumeInput"
              >
                Volume:
              </label>
              <input
                name="itemVolume"
                id="volumeInput"
                className="textInputStyle"
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
                  className="w-[25%] text-lg text-right pr-4"
                  htmlFor="categoryInput"
                >
                  Category:
                </label>

                <input
                  id="categoryInput"
                  name="itemCategory"
                  className="textInputStyle"
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
                className=" text-lg text-right pr-4"
                htmlFor="expirationDate"
              >
                Expires:
              </label>
              <input
                className={`${inputStyle} h-10 border-2 w-min border-white border-opacity-50 placeholder:text-xs`}
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
              <label className=" text-lg text-right pr-4" htmlFor="freezeDate">
                Frozen:
              </label>
              <input
                className={`${inputStyle} h-10 w-min border-2 border-white border-opacity-50 placeholder:text-xs`}
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
          <Button type="submit" className="w-48">
            Save changes
          </Button>
        </div>
      </form>
    );
  }
}
