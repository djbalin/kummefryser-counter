import "server-only";

import { placeholderData } from "@/app/lib/placeholderData";
import mongoose from "mongoose";
import {
  FreezerItems,
  Categories,
  CategorySchemaType,
} from "@/app/lib/db/dbschema";
import { CategorySchema } from "./dbschema";
import {
  FoodItemType,
  NakedFoodItemType,
} from "@/app/types_schemas/typesAndSchemas";

export async function getAllCategories(): Promise<CategorySchemaType[]> {
  mongoose.connect(process.env.MONGODB_URI!);
  const all: CategorySchemaType[] = await Categories.find();
  return all;
}

export async function tryAddCategory(item: NakedFoodItemType) {
  mongoose.connect(process.env.MONGODB_URI!);
  await Categories.updateOne(
    { category: item.category },
    { $setOnInsert: { category: item.category } },
    { upsert: true }
  );
}

export async function getAllSorted(): Promise<FoodItemType[]> {
  mongoose.connect(process.env.MONGODB_URI!);
  const all: FoodItemType[] = await FreezerItems.find().sort({
    expirationDate: 1,
  });
  return all;
}

export async function getAllFilteredByCategories(
  queryCategories: string[]
): Promise<FoodItemType[]> {
  mongoose.connect(process.env.MONGODB_URI!);
  const filteredByCategories: FoodItemType[] = await FreezerItems.find({
    category: queryCategories,
  }).sort({
    expirationDate: 1,
  });
  return filteredByCategories;
}

export async function addOne(newItem: NakedFoodItemType) {
  mongoose.connect(process.env.MONGODB_URI!);
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
        Categories.updateOne(
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
}
