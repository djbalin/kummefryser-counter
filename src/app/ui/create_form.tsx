"use client";
import { Button } from "@/app/ui/button";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { createItem } from "@/app/lib/actions";
import { CategorySchemaType } from "../lib/db/dbschema";
import { generateId } from "../lib/tools";

// import { Category } from "../types/fooditem";

// export function CreateForm({ categories }: { categories: Category[] }) {
const dropdownNumbers = Array(14)
  .fill(0)
  .map((_, i) => i + 1);

const invalidInputStyle = ["border-red-500", "border-2"];

// export default function CreateForm({
//   getAllCategories,
//   handleAddNewCategory,
// }: {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   handleAddNewCategory(categoryName: string): Promise<void>;
// }) {

export default function CreateForm({
  categories,
  handleAddNewCategory,
}: {
  categories: CategorySchemaType[];
  handleAddNewCategory(categoryName: string): Promise<void>;
}) {
  // export default function CreateForm({
  //   categories,
  // }: {
  //   categories: CategorySchemaType[];
  // }) {

  const currentDate = new Date();
  console.log("FORM RENDERED");

  const [inputName, setInputName] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  // const [categories, setCategories] = useState<string[]>(CATEGORYDATA);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryHasBeenAdded, setCategoryHasBeenAdded] = useState(false);
  const [selectedLifespanInteger, setSelectedLifespanInteger] = useState("0");
  const [selectedCategoryButton, setSelectedCategoryButton] =
    useState<HTMLElement | null>(null);
  const [selectedLifespanQualifier, setSelectedLifespanQualifier] =
    useState("30");

  const [expirationDate, setExpirationDate] = useState(new Date());
  const [freezeDate, setFreezeDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [freezeDateIsSet, setFreezeDateIsSet] = useState(false);

  function handleSelectLifespan(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedLifespanInteger(e.target.value);
  }

  function handleSelectCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    const clickedButton: HTMLElement = e.currentTarget;
    if (selectedCategoryButton != null) {
      selectedCategoryButton.classList.remove("bg-green-500");
      selectedCategoryButton.classList.add("bg-red-300");
    }
    clickedButton.classList.add("bg-green-500");
    clickedButton.classList.remove("bg-red-300");
    setSelectedCategoryButton(clickedButton);
  }

  async function handleClickNewCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    await handleAddNewCategory(newCategory);
    if (categoryHasBeenAdded == false) {
      setCategoryHasBeenAdded(true);
    }
    categories.push({ _id: "abc", category: newCategory });
    setNewCategory("");
  }

  function validateInputs(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let inputsAreValid = true;
    if (inputName.trim().length == 0) {
      inputsAreValid = false;
      document.getElementById("itemName")?.classList.add(...invalidInputStyle);
    }
    if (inputSize.trim().length == 0) {
      inputsAreValid = false;
      document.getElementById("itemSize")?.classList.add(...invalidInputStyle);
    }
    if (selectedCategoryButton === null) {
      inputsAreValid = false;
      document
        .getElementById("categoriesContainer")
        ?.classList.add(...invalidInputStyle);
    }
    if (freezeDateIsSet === false) {
      inputsAreValid = false;
      document
        .getElementById("freezeDate")
        ?.classList.add(...invalidInputStyle);
    }

    if (selectedLifespanInteger === "0") {
      inputsAreValid = false;
      document.getElementById("lifespan")?.classList.add(...invalidInputStyle);
    }

    if (inputQuantity.trim().length === 0) {
      inputsAreValid = false;
      document.getElementById("quantity")?.classList.add(...invalidInputStyle);
    }
    if (inputsAreValid === false) {
      e.preventDefault();
    }
  }

  function handleTypeNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCategory(e.target.value);
    // TODO:
    // Implement searching and validation to check if the inputted new cateogyr already exists
    // "Did you mean 'fruit'? Already exists"
  }

  const labelStyle = "block mb-1 text-xl";
  const inputStyle = "bg-slate-500 bg-opacity-40 pl-2 rounded-lg";
  const listStyle =
    "flex p-[0.1rem] w-full justify-center bg-slate-800 rounded-lg";

  return (
    <form
      action={async (e) => {
        e.delete("daysweeksmonths");
        e.delete("lifespan");
        e.append("category", selectedCategoryButton!.innerHTML);
        e.set(
          "lifespanInDays",
          (
            parseInt(selectedLifespanInteger) *
            parseInt(selectedLifespanQualifier)
          ).toString()
        );
        e.append("_id", generateId(16));
        createItem(e);
        // handleClickSubmit(e);
      }}
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClickSubmit(e)}
      // action={createItem}
      // action={async (e) => {
      //   e.append("category", selectedCategoryButton!.innerHTML);
      //   handleClickSubmit(e);
      // }}
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClickSubmit(e)}
      className=" min-w-[40%] gap-y-8 border-2 p-4 bg-slate-800 bg-opacity-40 rounded-lg"
    >
      <div className="mb-4">
        <label className={`${labelStyle}`} htmlFor="itemName">
          Item name:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-full placeholder:text-xs`}
            placeholder="smør, flæskesteg, ærter ..."
            type="text"
            id="itemName"
            name="itemName"
            onChange={(e) => {
              e.target.classList.remove(...invalidInputStyle);
              setInputName(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="mb-4">
        <label className={`${labelStyle}`} htmlFor="itemSize">
          Size:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-full placeholder:text-xs`}
            // className="bg-slate-500 bg-opacity-40 h-10 pl-2 w-full rounded-lg placeholder:text-xs"
            placeholder="200 g, ca. 1 kg, 0.5 L ..."
            type="text"
            id="itemSize"
            name="itemSize"
            onChange={(e) => {
              e.target.classList.remove(...invalidInputStyle);
              setInputSize(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <span className={`${labelStyle}`}>Category:</span>
      <div id="categoryMenu" className="grid grid-cols-2 gap-x-2 gap-y-4 mb-8 ">
        <div
          id="categoriesContainer"
          className="grid p-1 rounded-lg lg:grid-cols-3 grid-cols-2 gap-y-4"
        >
          {categories.map((category) => {
            return (
              <button
                // key={category}
                key={category._id}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.parentElement!.classList.remove(
                    ...invalidInputStyle
                  );
                  handleSelectCategory(e);
                }}
                className="text-sm rounded-lg w-20 h-10 bg-red-300 bg-opacity-40 break-words"
              >
                {category.category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col">
          <div className="flex gap-x-2">
            <input
              type="text"
              className={`${inputStyle} w-48 h-10 text-lg placeholder:text-[1rem]`}
              placeholder="New category"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleTypeNewCategory(e);
              }}
              value={newCategory}
              // ref={newCategoryInput}

              //   autoFocus
            />
            <button
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                document;
                // .getElementById("categoriesContainer")
                // ?.classList.remove(...invalidInputStyle);
                handleClickNewCategory(e);
              }}
              // onClick={(e) => e.preventDefault()}
              className="flex mr-4 items-center justify-center rounded-lg w-16 h-10 bg-green-400 bg-opacity-50"
            >
              <PlusIcon width={40} />
            </button>
          </div>
          {categoryHasBeenAdded && (
            <p className="text-xs pl-2 pt-1 text-slate-500 w-48">
              New categories are only saved when you Submit below
            </p>
          )}
        </div>
      </div>

      <div id="dateContainer" className="flex justify-between mb-4">
        <div className="flex h-min items-center gap-x-4">
          <label className={`${labelStyle} flex`} htmlFor="freezeDate">
            Freeze date:
          </label>
          <input
            className={`${inputStyle} h-10 placeholder:text-xs`}
            // value={"Choose"}
            type="date"
            id="freezeDate"
            name="freezeDate"
            onChange={(e) => {
              e.target.classList.remove(...invalidInputStyle);
              setFreezeDate(e.target.value);
              setFreezeDateIsSet(true);
            }}
          ></input>
        </div>
        <div className="flex flex-col h-auto">
          <div className="flex items-center justify-center gap-x-4">
            <label className={`${labelStyle}`} htmlFor="lifespan">
              Lifespan:
            </label>
            <div className="flex h-10 ">
              <select
                id="lifespan"
                name="lifespan"
                className={`${inputStyle} h-full`}
                defaultValue=""
                // value={selectedLifespanInteger}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  e.target.classList.remove(...invalidInputStyle);
                  handleSelectLifespan(e);
                }}
              >
                <option value="" disabled hidden>
                  Select
                </option>
                {dropdownNumbers.map((num) => {
                  return (
                    <option key={num} value={`${num}`}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <select
                id="daysweeksmonths"
                name="daysweeksmonths"
                className={`${inputStyle} h-full ml-2`}
                value={selectedLifespanQualifier}
                onChange={(e) => {
                  e.target.classList.remove(...invalidInputStyle);
                  setSelectedLifespanQualifier(e.target.value);
                }}
              >
                {selectedLifespanInteger == "1" ? (
                  <>
                    <option value="1">day</option>
                    <option value="7">week</option>
                    <option value="30">month</option>
                  </>
                ) : (
                  <>
                    <option value="1">days</option>
                    <option value="7">weeks</option>
                    <option value="30">months</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <span className="py-1 flex text-sm text-white text-opacity-70">
            The item will expire:{" "}
          </span>
        </div>
      </div>
      <div className="block mb-4">
        <label className={`${labelStyle}`} htmlFor="quantity">
          Quantity:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-[50%] placeholder:text-md`}
            placeholder="..."
            type="text"
            id="quantity"
            name="quantity"
            onChange={(e) => {
              e.target.classList.remove(...invalidInputStyle);
              setInputQuantity(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <Button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          validateInputs(e);
        }}
        // onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        //   handleClickSubmit(e)
        // }
      >
        Save new item
      </Button>
    </form>
  );
}

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
