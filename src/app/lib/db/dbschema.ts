import mongoose, { InferSchemaType, Types } from "mongoose";
import { Category } from "@/app/types_schemas/typesAndSchemas";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

// function generateId()

const FreezerItemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  freezeDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  lifespanInDays: { type: Number, required: true },
  volume: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const CategorySchema = new Schema({
  _id: {
    type: "UUID",
    default: () => randomUUID(),
  },
  category: {
    type: String,
    unique: true,
    index: true,
  },
});

export type FreezerItemSchemaType = InferSchemaType<typeof FreezerItemSchema>;
export type CategorySchemaType = InferSchemaType<typeof CategorySchema>;

CategorySchema.index({ category: 1 }, { unique: true, background: true });

export const FreezerItems =
  mongoose.models.freezeritems ||
  mongoose.model("freezeritems", FreezerItemSchema);
export const Categories =
  mongoose.models.categories || mongoose.model("categories", CategorySchema);
