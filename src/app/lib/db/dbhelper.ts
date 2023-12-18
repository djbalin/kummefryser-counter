import { MongoClient, ObjectId } from "mongodb";

import { placeholderData } from "../placeholderData";
import { z } from "zod";
import mongoose from "mongoose";
import { FreezerItems, Categories } from "./dbschema";
import FoodItemType, { Category } from "@/app/types/fooditem";

const FreezerItemEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  category: z.nativeEnum(Category),
  freezeDate: z.instanceof(Date),
  expirationDate: z.instanceof(Date),
  durationDays: z.number(),
  volume: z.string(),
});

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  const COLLECTION = "janfryser";

  let coll;
  try {
    await client.connect();
    console.log("connected");
    const db = client.db(COLLECTION);
    try {
      coll = db.collection(COLLECTION);
      console.log("Using collection: " + COLLECTION);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  return coll;
}

export async function getAllSorted(): Promise<FoodItemType[]> {
  mongoose.connect(process.env.MONGODB_URI!);
  const all = await FreezerItems.find().sort({ expirationDate: 1 });
  return all;
}

export default async function populateDB() {
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
    placeholderData.map(async (item) => {
      console.log("adding item: " + item.name);
      await FreezerItems.create(item);
      try {
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
