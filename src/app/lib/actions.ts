"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchema } from "../types_schemas/typesAndSchemas";
import { addDaysToDate } from "./datehelper";
import { addOne, tryAddCategory } from "./db/dbhelper";
import { redirect } from "next/navigation";
import { generateId } from "./tools";

export async function createItem(formData: FormData) {
  console.log("Creating new item: ");
  const ob = Object.fromEntries(formData.entries());
  console.log(ob);

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

  await addOne(item);
  await tryAddCategory(item);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function addCategory(categoryName: string) {
  console.log("in add category in actions.ts");

  await tryAddCategory({ category: categoryName, _id: generateId(16) });
}
