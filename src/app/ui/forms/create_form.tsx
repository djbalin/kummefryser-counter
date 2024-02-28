"use client";
import { Button } from "@/app/ui/button";
import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { createItem } from "@/app/lib/actions";
import { generateId } from "../../lib/utils/tools";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/app/lib/firebase/firebase";
import { getCookie } from "cookies-next";
import { Category } from "@/app/lib/utils/types_schemas/typesAndSchemas";
import { getAllCategories } from "@/app/lib/db/firebase";
const dropdownNumbers = Array(14)
  .fill(0)
  .map((_, i) => i + 1);

const invalidInputStyle = ["border-red-500", "border-2"];

// export function CreateForm({ categories }: { categories: Category[] }) {
export function CreateForm() {
  const currentDate = new Date();
  // const [user, loading] = useAuthState(auth);
  let uid: string;
  const user = getCookie("user_id");
  if (user) {
    uid = user.valueOf();
  } else {
    uid = "_EXAMPLE";
  }
  // const uid = getCookie("user_id")?.valueOf();

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const [inputName, setInputName] = useState("");
  const [inputSize, setInputSize] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryHasBeenAdded, setCategoryHasBeenAdded] = useState(false);
  const [selectedLifespanInteger, setSelectedLifespanInteger] = useState("0");
  const [selectedCategoryButton, setSelectedCategoryButton] =
    useState<HTMLElement | null>(null);
  const [selectedLifespanQualifier, setSelectedLifespanQualifier] =
    useState("30");
  const [creatingItem, setCreatingItem] = useState(false);
  const [freezeDate, setFreezeDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [freezeDateIsSet, setFreezeDateIsSet] = useState(false);
  const clickedCategoryButton = useRef<HTMLButtonElement | null>(null);

  function resetForm() {
    setInputName("");
    setInputSize("");
    setInputQuantity("");
    setNewCategory("");
    setCategoryHasBeenAdded(false);
    setSelectedLifespanInteger("0");
    setSelectedCategoryButton(null);
    setSelectedLifespanQualifier("30");
    setFreezeDate(currentDate.toISOString().split("T")[0]);
    setFreezeDateIsSet(false);
    formRef.current?.reset();
    clickedCategoryButton.current?.classList.remove("bg-green-500");
    clickedCategoryButton.current?.classList.add("bg-red-300");
    clickedCategoryButton.current = null;
  }
  useEffect(() => {
    getAllCategories(uid).then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  function handleSelectLifespan(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedLifespanInteger(e.target.value);
  }

  function handleSelectCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    clickedCategoryButton.current = e.target as HTMLButtonElement;
    if (selectedCategoryButton != null) {
      selectedCategoryButton.classList.remove("bg-green-500");
      selectedCategoryButton.classList.add("bg-red-300");
    }
    clickedCategoryButton.current.classList.add("bg-green-500");
    clickedCategoryButton.current.classList.remove("bg-red-300");
    setSelectedCategoryButton(clickedCategoryButton.current);
  }

  const newCategoryRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleClickNewCategory(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    // const trimmed = newCategory.trim();
    // const parsed = trimmed.substring(0, 1).toUpperCase() + trimmed.substring(0);
    // if (!categories.includes(parsed)) {
    // }
    if (newCategory.trim().length == 0) {
      newCategoryRef.current?.classList.add(...invalidInputStyle);
    } else {
      categories!.push({ id: generateId(10), name: newCategory });
      if (categoryHasBeenAdded == false) {
        setCategoryHasBeenAdded(true);
      }
      setNewCategory("");
    }
    // await handleAddNewCategory(newCategory, uid);
  }

  function validateInputs(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): boolean {
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
      return false;
    } else {
      return true;
    }
  }

  function handleTypeNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCategory(e.target.value);
    newCategoryRef.current?.classList.remove(...invalidInputStyle);
  }

  return (
    <>
      {creatingItem ? (
        <div className="absolute w-full h-full bg-black flex cursor-not-allowed justify-center bg-opacity-60 text-3xl">
          <h1 className="bg-slate-800 w-64 text-center h-min absolute top-[30%] p-10 rounded-[2rem]">
            CREATING ITEM...
          </h1>
        </div>
      ) : (
        <></>
      )}
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          if (!uid) {
            throw new Error("Error: no uid with which to create item");
          }
          formData.delete("daysweeksmonths");
          formData.delete("lifespan");
          const categoryTrimmedLower = selectedCategoryButton!.innerHTML
            .trim()
            .toLowerCase();
          const categoryParsed =
            categoryTrimmedLower.charAt(0).toUpperCase() +
            categoryTrimmedLower.substring(1);
          formData.append("category", categoryParsed);
          formData.set(
            "lifespanInDays",
            (
              parseInt(selectedLifespanInteger) *
              parseInt(selectedLifespanQualifier)
            ).toString()
          );
          formData.append("_id", generateId(16));
          await createItem(formData, uid);
          setCreatingItem(false);
          resetForm();
        }}
        className="w-[95%] max-w-[800px]  gap-y-8 border-2 p-4 bg-slate-800 bg-opacity-40 rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="itemName">Item name:</label>
          <div className="">
            <input
              className={` h-10 w-full placeholder:text-xs`}
              placeholder="tomato sauce, dhal, rye bread ..."
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
          <label htmlFor="itemSize">Size:</label>
          <div className="">
            <input
              className={` h-10 w-full placeholder:text-xs`}
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

        <label>Category:</label>
        <div
          id="categoryMenu"
          className="md:grid lg:grid-cols-2 gap-x-2 gap-y-4 mb-8 "
        >
          <div
            id="categoriesContainer"
            className="grid sm:p-1 my-2 rounded-lg lg:grid-cols-3 grid-cols-3 gap-y-4 gap-x-2 sm:gap-x-8"
          >
            {isLoading ? (
              <p>LOADING...</p>
            ) : (
              categories!.map((category) => {
                return (
                  <button
                    key={category.id}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.currentTarget.parentElement!.classList.remove(
                        ...invalidInputStyle
                      );
                      handleSelectCategory(e);
                    }}
                    className="text-xs sm:text-sm rounded-lg max-w-[10rem] px-2 h-12 bg-red-300 bg-opacity-40 "
                  >
                    {category.name}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex w-full gap-x-2 flex-row ">
              <input
                ref={newCategoryRef}
                type="text"
                className={"placeholder:text-sm w-full max-w-sm"}
                placeholder="New category"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleTypeNewCategory(e);
                }}
                value={newCategory}
              />
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  // document;
                  handleClickNewCategory(e);
                }}
                className="flex items-center justify-center rounded-lg  bg-green-400 bg-opacity-50"
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

        <div
          id="dateContainer"
          className="flex md:flex-row flex-col justify-between mb-4 gap-y-2"
        >
          <div className="flex justify-between max-w-xs    items-center gap-x-4">
            <label className={` flex`} htmlFor="freezeDate">
              Freeze date:
            </label>
            <input
              className={` h-10 text-xs sm:text-base`}
              type="date"
              id="freezeDate"
              name="freezeDate"
              defaultValue={freezeDate}
              onChange={(e) => {
                e.target.classList.remove(...invalidInputStyle);
                setFreezeDate(e.target.value);
                setFreezeDateIsSet(true);
              }}
            ></input>
          </div>
          <div className="flex flex-col  max-w-xs">
            <div className="flex items-center justify-between h-14 gap-x-4">
              <label htmlFor="lifespan">Lifespan:</label>
              <div className="flex sm:flex-row flex-col gap-y-2 h-full ">
                <select
                  id="lifespan"
                  name="lifespan"
                  className="h-full text-xs sm:text-base"
                  defaultValue=""
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
                  className={` h-full ml-2 text-xs sm:text-base`}
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
            {/* <span className="py-1 flex text-sm text-white text-opacity-70">
              The item will expire:{" "}
            </span> */}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity">Quantity:</label>
          <input
            className={` h-10 w-full max-w-[300px] placeholder:text-md`}
            placeholder="..."
            type="text"
            id="quantity"
            name="quantity"
            onChange={(e) => {
              e.target.classList.remove(...invalidInputStyle);
              setInputQuantity(e.target.value);
            }}
          />
        </div>
        {/* {loading ? (
        <Button
          className="bg-red-500"
          disabled
          color="red-500"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            validateInputs(e);
          }}
        >
          Wait...
        </Button>
      ) : (
      )} */}
        <Button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // setCreatingItem(true);
            if (validateInputs(e)) {
              setCreatingItem(true);
            }
          }}
        >
          Save new item
        </Button>
      </form>
    </>
  );
}
