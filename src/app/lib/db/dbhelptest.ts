import mongoose from "mongoose";
import { Categories, CategorySchemaType } from "./dbschema";

export async function getAllCategories(): Promise<CategorySchemaType[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    throw new Error("Failed to connect to database.");
  }
  try {
    const all: CategorySchemaType[] = await Categories.find();
    return all;
  } catch (error) {
    console.error("Error fetching all categories: ", error);
    throw new Error("Failed to connect to database.");
  }
}
