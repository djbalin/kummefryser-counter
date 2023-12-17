"use client";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

// import { Category } from "../types/fooditem";

// export function CreateForm({ categories }: { categories: Category[] }) {

export function CreateForm() {
  const CATEGORYDATA = ["meat", "dairy", "fruit", "Ice cream"];

  const [categories, setCategories] = useState<string[]>(CATEGORYDATA);
  const [newCategory, setNewCategory] = useState<string>("");

  const [categoryHasBeenAdded, setCategoryHasBeenAdded] = useState(false);

  const [selectedCategoryButton, setSelectedCategoryButton] =
    useState<HTMLElement | null>(null);

  //   const [showNewCategory, setShowNewCategory] = useState<boolean>(false);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const clickedButton: HTMLElement = e.currentTarget;
    if (selectedCategoryButton != null) {
      selectedCategoryButton.classList.remove("bg-green-500");
    }
    clickedButton.classList.add("bg-green-500");
    setSelectedCategoryButton(clickedButton);
  }

  function handleClickNewCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setCategories((cat) => [...cat, newCategory]);
    if (categoryHasBeenAdded == false) {
      setCategoryHasBeenAdded(true);
    }
  }

  const inputStyle = "bg-slate-500 bg-opacity-40 pl-2 rounded-lg";

  return (
    <form className=" min-w-[40%] gap-y-8 border-2 p-4 bg-slate-800 bg-opacity-40 rounded-lg">
      <div className="mb-4">
        <label className="block mb-1" htmlFor="itemName">
          Item name:
        </label>
        <div className="">
          <input
            className={`${inputStyle} h-10 w-full placeholder:text-xs`}
            // className="bg-slate-500 bg-opacity-40 h-10 pl-2 w-full rounded-lg placeholder:text-xs"
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
      <div id="categoryMenu" className="grid grid-cols-2 gap-x-4 gap-y-4 mb-8 ">
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
                className="mr-4 rounded-lg w-16 h-16 bg-red-300 bg-opacity-40"
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
              className={`${inputStyle} w-48 h-16 text-lg`}
              placeholder="New category"
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              //   autoFocus
            />
            <button
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                handleClickNewCategory(e);
              }}
              className="flex mr-4 items-center justify-center rounded-lg w-16 h-16 bg-green-700 bg-opacity-40"
            >
              <PlusIcon width={48} />
            </button>
          </div>
          {categoryHasBeenAdded && (
            <p className="text-xs pl-2 pt-1 text-slate-500 w-48">
              New categories are only saved when you click Submit
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="quantity">
            Quantity:
          </label>
          <div className="">
            <input
              className={`${inputStyle} h-10 w-full placeholder:text-xs`}
              placeholder="1"
              type="text"
              id="quantity"
              name="quantity"
            ></input>
          </div>
        </div>
      </div>
      <Button type="submit">Save new item</Button>
    </form>
  );
}
