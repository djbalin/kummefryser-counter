"use server";
import { revalidatePath } from "next/cache";
import { FoodItemSchema } from "../types_schemas/typesAndSchemas";
import { addDaysToDate, getDaysBetweenDates } from "./datehelper";
import {
  addItemFirebase,
  addOne,
  tryAddCategory,
  updateOne,
} from "./db/dbhelper";
import { redirect } from "next/navigation";
import { generateId } from "./tools";
import { cookies } from "next/headers";
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { NextResponse } from "next/server";
import { auth, signInGooglePopup } from "./firebase/firebase";

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
      await addItemFirebase(item);
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

  revalidatePath("/example");
  redirect("/example");
}

export async function addCategory(categoryName: string) {
  console.log("in add category in actions.ts");

  await tryAddCategory({ category: categoryName, _id: generateId(16) });
}

export async function updateItem(formData: FormData) {
  console.log("Updating new item: ");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const ob = Object.fromEntries(formData.entries());
  console.log(ob);

  const freezeDate = new Date(formData.get("freezeDate") as string);
  const expirationDate = new Date(formData.get("expirationDate") as string);
  const lifeSpanInDays = getDaysBetweenDates(freezeDate, expirationDate);
  // console.log("LIFESPAN IN DAYS: ", lifeSpanInDays);

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

// export async function handleLogin(sessionData) {
//   const encryptedSessionData = encrypt(sessionData); // Encrypt your session data
//   cookies().set("session", encryptedSessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: "/",
//   });
//   // Redirect or handle the response after setting the cookie
// }

// export async function handleSignIn(redirectPath: string) {
//   const signInResult = await signInWithPopup(auth, provider);
//   if (signInResult.user) {
//     redirect(redirectPath);
//   }
// }

export async function cookiesTest() {
  "use server";
  cookies().set("cookietest", "true");
  // log(request.cookies.size);
}

export async function handleSignInGooglePopup() {
  console.log("SERVER ACTION RUNNING");
  await signInGooglePopup();
  // const provider = new GoogleAuthProvider();
  // await signInWithPopup(auth, provider);

  // await signInGooglePopup();
  cookies().set("USER", "yeye");
  redirect("/");
}

export async function signOutGoogle() {
  "use server";
  console.log("LOGGIN OUT:)");
  const loggedIn = cookies().has("USER");
  if (loggedIn) {
    alert("Error: already logged in");
  } else {
    await signOut(auth);
    cookies().delete("USER");
    // revalidatePath("/");
    redirect("/");
  }
}

export async function revalidateTest() {
  revalidatePath("/");
  redirect("/");
}
