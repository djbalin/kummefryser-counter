import mongoose, { InferSchemaType, Types } from "mongoose";

const { Schema } = mongoose;
import { generateId } from "./dbhelper";

// function generateId()

const FreezerItemSchema = new Schema({
  _id: { type: String, required: true, default: generateId },
  name: { type: String, required: true },
  category: { type: String, required: true },
  freezeDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  lifespanInDays: { type: Number, required: true },
  volume: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const CategorySchema = new Schema({
  category: {
    type: String,
    unique: true,
    index: { unique: true },
    required: true,
  },
  _id: {
    type: String,
    required: true,
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
