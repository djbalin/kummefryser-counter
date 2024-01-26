"use server";
import {
  FoodItemSchema,
  FoodItemType,
} from "@/app/types_schemas/typesAndSchemas";
import { collection, doc, setDoc } from "firebase/firestore";
import { db_firebase } from "../firebase/firebase";
import { User } from "firebase/auth";
import { getDaysBetweenDates } from "../datehelper";
import { revalidatePath } from "next/cache";

export async function addItemToDB(newItem: FoodItemType, uid: string) {
  console.log("adding item");

  try {
    const docRef = doc(
      collection(db_firebase, `users/${uid}/items`),
      newItem._id
    );
    await setDoc(docRef, newItem);
  } catch (error) {
    return {
      message: `Database error. Failed to connect or to create this new item: ${newItem}`,
    };
  }
}

export async function updateItem(
  itemId: string,
  formData: FormData,
  uid: string
) {
  try {
    console.log("Updating new item: ");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const ob = Object.fromEntries(formData.entries());
    console.log(ob);

    const freezeDate = new Date(formData.get("freezeDate") as string);
    const expirationDate = new Date(formData.get("expirationDate") as string);
    const lifeSpanInDays = getDaysBetweenDates(freezeDate, expirationDate);
    // console.log("LIFESPAN IN DAYS: ", lifeSpanInDays);
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
    console.log("Updating item from fb");

    try {
      const docRef = doc(
        collection(db_firebase, `users/${uid}/items`),
        item._id
      );
      console.log("docref id:");
      // console.log(docRef.id);
      await setDoc(docRef, item);
    } catch (error) {
      console.log(error);

      // return {
      //   message: `Database error. Failed to connect or to create this new item: ${formData}`,
      // };
    }
  } catch (error) {
    console.log(console.error());
  }
  revalidatePath("/dashboard");
}
