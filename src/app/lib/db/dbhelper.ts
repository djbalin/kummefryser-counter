"use server";
import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { placeholderData } from "@/app/lib/placeholderData";
import mongoose from "mongoose";
import {
  FreezerItems,
  Categories,
  CategorySchemaType,
} from "@/app/lib/db/dbschema";
import { FoodItemType } from "@/app/types_schemas/typesAndSchemas";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    throw new Error("Failed to connect to database.");
  }
}

export async function updateOne(updatedItem: FoodItemType) {
  await connectToDB();
  try {
    await FreezerItems.findByIdAndUpdate(updatedItem._id, updatedItem);
  } catch (error) {
    console.error("Following error thrown while updating item: ", error);
  }
}

export async function getAllCategories(): Promise<CategorySchemaType[]> {
  // noStore();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await connectToDB();
  console.log("call get all ee categories");

  try {
    const all: CategorySchemaType[] = await Categories.find();
    return all;
  } catch (error) {
    console.error("Error fetching all categories: ", error);
    throw new Error("Error fetching all categories.");
  }
}

export async function tryAddCategory(category: CategorySchemaType) {
  await connectToDB();
  try {
    await Categories.updateOne(
      { category: category.category },
      { $setOnInsert: { category: category.category } },
      { upsert: true }
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Database error. Could not update category: ${category}`);
  }
}

export async function getAllSorted(): Promise<FoodItemType[]> {
  // noStore();
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  await connectToDB();

  try {
    const all: FoodItemType[] = await FreezerItems.find().sort({
      expirationDate: 1,
    });
    return all;
  } catch (error) {
    console.log(error);
    throw new Error("Database error while trying to retrieve all items");
  }
}

export async function getAllFilteredByCategories(
  queryCategories: string[]
): Promise<FoodItemType[]> {
  // noStore();
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Call get al lfiltered by cats");

  await connectToDB();
  try {
    const filteredByCategories: FoodItemType[] = await FreezerItems.find({
      category: queryCategories,
    }).sort({
      expirationDate: 1,
    });
    return filteredByCategories;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch items.");
  }
}

export async function addOne(newItem: FoodItemType) {
  try {
    await connectToDB();
    const result = await FreezerItems.create(newItem);
    console.log("RESULT" + result);
  } catch (error) {
    return {
      message: `Database error. Failed to connect or to create this new item: ${newItem}`,
    };
  }
}

export async function wipeAndPopulateDB() {
  await connectToDB();
  try {
    const itemRes = await mongoose.connection
      .collection("freezeritems")
      .deleteMany({});
    console.log("REMOVED FREEZERITEMS: ");
    console.log(itemRes);

    const catRes = await mongoose.connection
      .collection("categories")
      .deleteMany({});
    console.log("REMOVED categories: ");
    console.log(catRes);
  } catch (error) {
    console.error("Error deleting contents of database");
    console.error(error);
  }
  let numDocs: number = await FreezerItems.countDocuments();
  if (numDocs > 0) {
    console.log("already data inside, this many docs: " + numDocs);
  } else {
    console.log("Empty");
    console.log("Inserting placeholder data: ");

    for (const d of placeholderData) {
      console.log(d);
    }
    await Promise.all(
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
        } finally {
        }
      })
    );
  }
  console.log("END OF WIPING");
  // Ghetto solution for now: To attempt to ensure that database population has occurred successfully before redirecting to the dashboard.
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
