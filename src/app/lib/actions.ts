"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchema } from "../types_schemas/typesAndSchemas";
import { addDaysToDate, getDaysBetweenDates } from "./datehelper";
import { addOne, tryAddCategory, updateOne } from "./db/dbhelper";
import { redirect } from "next/navigation";
import { generateId } from "./tools";

export async function createItem(formData: FormData) {
  console.log("Creating new item: ");
  const ob = Object.fromEntries(formData.entries());
  console.log(ob);
  try {
    const item = FoodItemSchema.parse({
      name: formData.get("itemName"),
      category: formData.get("category"),
      freezeDate: new Date(formData.get("freezeDate") as string),
      expirationDate: addDaysToDate(
        new Date(formData.get("freezeDate") as string),
        parseInt(formData.get("lifespanInDays") as string)
      ),
      lifespanInDays: parseInt(formData.get("lifespanInDays") as string),
      volume: formData.get("itemSize"),
      quantity: parseInt(formData.get("quantity") as string),
      _id: formData.get("_id"),
    });
    try {
      await addOne(item);
      await tryAddCategory(item);
    } catch (error) {
      return {
        message: "Database error. Could not create new item.",
      };
    }
  } catch (error) {
    console.error("Error parsing new item. ", error);
    throw new Error(
      'Error creating new item. Verify that the input fields conform to their types (e.g. "quantity" must be a number)'
    );
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function addCategory(categoryName: string) {
  console.log("in add category in actions.ts");

  await tryAddCategory({ category: categoryName, _id: generateId(16) });
}

export async function updateItem(formData: FormData) {
  console.log("Updating new item: ");
  const ob = Object.fromEntries(formData.entries());
  console.log(ob);

  const freezeDate = new Date(formData.get("freezeDate") as string);
  const expirationDate = new Date(formData.get("expirationDate") as string);
  const lifeSpanInDays = getDaysBetweenDates(freezeDate, expirationDate);
  console.log("LIFESPAN IN DAYS: ", lifeSpanInDays);

  try {
    const item = FoodItemSchema.parse({
      name: formData.get("itemName"),
      category: formData.get("itemCategory"),
      freezeDate: freezeDate,
      expirationDate: expirationDate,
      // expirationDate: addDaysToDate(
      //   new Date(formData.get("freezeDate") as string),
      //   parseInt(formData.get("lifespanInDays") as string)
      // ),
      lifespanInDays: lifeSpanInDays,
      // lifespanInDays: parseInt(formData.get("lifespanInDays") as string),
      volume: formData.get("itemVolume"),
      quantity: parseInt(formData.get("itemQuantity") as string),
      _id: formData.get("_id"),
    });
    try {
      await updateOne(item);
      await tryAddCategory(item);
    } catch (error) {
      return {
        message: "Database error. Could not create new item.",
      };
    }
  } catch (error) {
    console.error("Error parsing new item. ", error);
    throw new Error(
      'Error creating new item. Verify that the input fields conform to their types (e.g. "quantity" must be a number)'
    );
  }

  revalidatePath("/dashboard");
  // redirect("/dashboard");
}
