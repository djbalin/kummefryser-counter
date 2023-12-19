"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchemaNoId } from "../types_schemas/typesAndSchemas";
import { addDaysToDate } from "./datehelper";
import { addOne, tryAddCategory } from "./db/dbhelper";
import { redirect } from "next/navigation";

// export async function createItem(formData: FormData) {
//   console.log("HELLO");
// }

export async function createItem(formData: FormData) {
  console.log("Creating new item: ");
  const ob = Object.fromEntries(formData.entries());
  console.log(ob);

  const item = FoodItemSchemaNoId.parse({
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
  });
  // const expirationDate = addDaysToDate(item.freezeDate, item.lifespanInDays);

  // const newItem = { ...item, expirationDate };

  await addOne(item);
  await tryAddCategory(item);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
