"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchema } from "./utils/types_schemas/typesAndSchemas";
import { addDaysToDate } from "./utils/datehelper";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import {
  addCategoryToDB,
  addItemToDB,
  deleteCollectionAndSubcollections,
} from "./db/firebase";
import { placeholderData } from "./placeholderData";

export async function createItem(formData: FormData, uid: string) {
  // console.log("Creating new item: ");
  // const ob = Object.fromEntries(formData.entries());
  // console.log(ob);

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
      await addItemToDB(item, uid);
      await addCategoryToDB(item.category, uid);
    } catch (error) {
      throw new Error("Error: could not add new item");
    }
  } catch (error) {
    console.error("Error parsing new item. ", error);
    throw new Error(
      'Error creating new item. Verify that the input fields conform to their types (e.g. "quantity" must be a number)'
    );
  }
  if (uid === "_EXAMPLE") {
    revalidatePath("/example");
    redirect("/example");
  } else {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
}

export async function revalidateAndRedirectDashboard() {
  "use server";
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function handleSignOut() {
  "use server";

  // const loggedIn = cookies().has("user_id");
  // if (!loggedIn) {
  //   throw new Error(
  //     "Error while trying to log out: No user is currently logged in"
  //   );
  // } else {
  //   cookies().delete("user_id");
  //   await signOut(auth);
  //   revalidatePath("/");
  //   redirect("/");
  // }
  // cookies().delete("user_id");
  await signOut(auth);
  revalidatePath("/");
  redirect("/");
}

export async function resetDB(uid: string) {
  try {
    if (uid) {
      await deleteCollectionAndSubcollections("items", uid);
      await deleteCollectionAndSubcollections("categories", uid);
      await Promise.all(
        placeholderData.map(async (item) => {
          try {
            await addItemToDB(item, uid);
            await addCategoryToDB(item.category, uid);
          } catch (error) {
            console.log("Error");
            console.log(error);
          }
        })
      );
    } else {
      throw new Error("No authenticated user");
    }
    if (uid === "_EXAMPLE") {
      revalidatePath("/example");
    } else {
      revalidatePath("/dashboard");
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error");
  }
}
