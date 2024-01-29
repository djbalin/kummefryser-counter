"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchema } from "./utils/types_schemas/typesAndSchemas";
import { addDaysToDate } from "./utils/datehelper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { addCategoryToDB, addItemToDB } from "./db/firebase";

export async function createItem(formData: FormData, uid: string) {
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
      console.log("adding");

      await addItemToDB(item, uid);
      await addCategoryToDB(item.category, uid);
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
  redirect("/dashboard");
}

export async function revalidateAndRedirectDashboard() {
  "use server";
  console.log("LOGGIN IN:)");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function handleSignOut() {
  "use server";
  console.log("LOGGIN OUT:)");

  const loggedIn = cookies().has("user_id");
  if (!loggedIn) {
    throw new Error(
      "Error while trying to log out: No user is currently logged in"
    );
  } else {
    console.log("signin out");

    cookies().delete("user_id");
    await signOut(auth);
    revalidatePath("/");
    redirect("/");
  }
}
