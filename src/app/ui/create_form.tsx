"use client";
import { Button } from "@/app/ui/button";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createItem } from "../lib/actions";

// import { Category } from "../types/fooditem";

// export function CreateForm({ categories }: { categories: Category[] }) {

export function CreateForm() {
  const CATEGORYDATA = ["meat", "dairy", "fruit", "ice cream", "vegetables"];

  const [categories, setCategories] = useState<string[]>(CATEGORYDATA);
  const [newCategory, setNewCategory] = useState<string>("");

  const [categoryHasBeenAdded, setCategoryHasBeenAdded] = useState(false);

  const [selectedLifespanInteger, setSelectedLifespanInteger] = useState("1");
  const currentDate = new Date();
  const [expirationDate, setExpirationDate] = useState(new Date());

  const [selectedLifespanQualifier, setSelectedLifespanQualifier] =
    useState("months");

  const [chosenDate, setChosenDate] = useState(
    currentDate.toISOString().split("T")[0]
  );

  function handleSelectLifespan(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.value);
    setSelectedLifespanInteger(e.target.value);

    // setSelectedLifespan(e);
  }

  const [selectedCategoryButton, setSelectedCategoryButton] =
    useState<HTMLElement | null>(null);

  const dropdownNumbers = Array(14)
    .fill(0)
    .map((_, i) => i + 1);

  // console.log("rerender");

  //   const [showNewCategory, setShowNewCategory] = useState<boolean>(false);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
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

  function handleClickNewCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setCategories((cat) => [...cat, newCategory]);
    if (categoryHasBeenAdded == false) {
      setCategoryHasBeenAdded(true);
    }
  }

  async function handleClickSubmit(formData: FormData) {
    await createItem(formData);

    // const formData = new FormData(event.target);
    // console.log(formData);

    // const selectedCategory = selectedCategoryButton!.innerHTML;
    // formData.append("category", selectedCategory);
  }

  function handleTypeNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCategory(e.target.value);
    // TODO:
    // Implement searching and validation to check if the inputted new cateogyr already exists
    // "Did you mean 'fruit'? Already exists"

    // console.log(e.target.value);
  }

  // function createItem(formData: FormData) {
  //   const ob = Object.fromEntries(formData.entries());
  //   console.log(ob);
  //   // revalidatePath("/dashboard");
  //   // redirect("/dashboard");
  // }

  const inputStyle = "bg-slate-500 bg-opacity-40 pl-2 rounded-lg";
  const listStyle =
    "flex p-[0.1rem] w-full justify-center bg-slate-800 rounded-lg";

  return (
    <form
      action={(e) => {
        e.append("category", selectedCategoryButton!.innerHTML);
        handleClickSubmit(e);
      }}
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleClickSubmit(e)}
      className=" min-w-[40%] gap-y-8 border-2 p-4 bg-slate-800 bg-opacity-40 rounded-lg"
    >
      <div className="mb-4">
        <label className="block mb-1" htmlFor="itemName">
          Item name:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-full placeholder:text-xs`}
            placeholder="smør, flæskesteg, ærter ..."
            type="text"
            id="itemName"
            name="itemName"
          ></input>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="size">
          Size:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-full placeholder:text-xs`}
            // className="bg-slate-500 bg-opacity-40 h-10 pl-2 w-full rounded-lg placeholder:text-xs"
            placeholder="200 g, ca. 1 kg, 0.5 L ..."
            type="text"
            id="size"
            name="size"
          ></input>
        </div>
      </div>

      <span className="block mb-1">Category:</span>
      <div id="categoryMenu" className="grid grid-cols-2 gap-x-2 gap-y-4 mb-8 ">
        <div
          id="categoriesContainer"
          className="grid lg:grid-cols-3 grid-cols-2 gap-y-4"
        >
          {categories.map((category) => {
            return (
              <button
                key={category}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleClick(e);
                }}
                className="text-sm rounded-lg w-20 h-10 bg-red-300 bg-opacity-40 break-words"
              >
                {category}
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
                handleClickNewCategory(e);
              }}
              className="flex mr-4 items-center justify-center rounded-lg w-16 h-10 bg-green-400 bg-opacity-50"
            >
              <PlusIcon width={40} />
            </button>
          </div>
          {categoryHasBeenAdded && (
            <p className="text-xs pl-2 pt-1 text-slate-500 w-48">
              New categories are only saved when you click Submit
            </p>
          )}
        </div>
      </div>

      <div
        id="dateContainer"
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-x-4">
          <label className="mb-1" htmlFor="freezeDate">
            Freeze date:
          </label>
          <div className="inline">
            <input
              className={`${inputStyle} h-10 placeholder:text-xs`}
              value={chosenDate}
              type="date"
              id="freezeDate"
              name="freezeDate"
              onChange={(e) => {
                setChosenDate(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="flex flex-col h-auto">
          <div className="flex items-center justify-center gap-x-4">
            <label className="mb-1" htmlFor="lifespan">
              Lifespan:
            </label>
            <div className="flex h-10 ">
              <select
                id="lifespan"
                name="lifespan"
                className={`${inputStyle} h-full`}
                value={selectedLifespanInteger}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectLifespan(e)
                }
              >
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
                  setSelectedLifespanQualifier(e.target.value);
                }}
              >
                {selectedLifespanInteger == "1" ? (
                  <>
                    <option value="days">day</option>
                    <option value="weeks">week</option>
                    <option value="months">month</option>
                  </>
                ) : (
                  <>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
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
        <label className="block mb-1" htmlFor="quantity">
          Quantity:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-[50%] placeholder:text-xs`}
            placeholder="1"
            type="text"
            id="quantity"
            name="quantity"
          ></input>
        </div>
      </div>
      <Button
        type="submit"
        // onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        //   handleClickSubmit(e)
        // }
      >
        Save new item
      </Button>
    </form>
  );
}
