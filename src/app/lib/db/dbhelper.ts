"use server";
import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { placeholderData } from "@/app/lib/placeholderData";
import mongoose from "mongoose";
import {
  FreezerItems,
  Categories,
  CategorySchemaType,
} from "@/app/lib/db/dbschema";
import { CategorySchema } from "./dbschema";
import { FoodItemType } from "@/app/types_schemas/typesAndSchemas";

export async function getAllCategories(): Promise<CategorySchemaType[]> {
  await mongoose.connect(process.env.MONGODB_URI!);
  const all: CategorySchemaType[] = await Categories.find();
  return all;
}

export async function tryAddCategory(category: CategorySchemaType) {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Categories.updateOne(
    { category: category.category },
    { $setOnInsert: { category: category.category } },
    { upsert: true }
  );
}

export async function getAllSorted(): Promise<FoodItemType[]> {
  await mongoose.connect(process.env.MONGODB_URI!);
  const all: FoodItemType[] = await FreezerItems.find().sort({
    expirationDate: 1,
  });
  return all;
}

export async function getAllFilteredByCategories(
  queryCategories: string[]
): Promise<FoodItemType[]> {
  await mongoose.connect(process.env.MONGODB_URI!);
  const filteredByCategories: FoodItemType[] = await FreezerItems.find({
    category: queryCategories,
  }).sort({
    expirationDate: 1,
  });
  return filteredByCategories;
}

export async function addOne(newItem: FoodItemType) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const result = await FreezerItems.create(newItem);
  console.log("RESULT" + result);
}

export default async function wipeAndPopulateDB() {
  mongoose.connect(process.env.MONGODB_URI!);
  await mongoose.connection
    .collection("freezeritems")
    .drop()
    .then((res) => console.log("REMOVED FREEZERITEMS: " + res));
  await mongoose.connection
    .collection("categories")
    .drop()
    .then((res) => console.log("REMOVED CATEGORIES: " + res));
  let numDocs: number = await FreezerItems.countDocuments();
  if (numDocs > 0) {
    console.log("already data inside, this many docs: " + numDocs);
  } else {
    console.log("Empty");
    console.log("Inserting placeholder data: ");

    for (const d of placeholderData) {
      console.log(d);
    }

    placeholderData.map(async (item) => {
      console.log("adding item w lifespan " + item.lifespanInDays);
      try {
        await FreezerItems.create(item);
        await Categories.updateOne(
          { category: item.category },
          { $setOnInsert: { category: item.category } },
          { upsert: true }
        ).then((upsert) =>
          console.log(
            `Inserted ${upsert.upsertedCount} new categories for category ${item.category}`
          )
        );
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    });
  }
  console.log("END OF WIPING");
}

export async function wipeDBAndRefresh() {
  console.log("b4 wipeandpop");
  await wipeAndPopulateDB();
  console.log("b4 revalid");

  revalidatePath("/dashboard");
  console.log("b4 redirect");
  redirect("/dashboard");
}
