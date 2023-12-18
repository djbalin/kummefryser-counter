import mongoose from "mongoose";
import { Category } from "@/app/types/fooditem";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

const FreezerItemSchema = new Schema({
  _id: {
    type: "UUID",
    default: () => randomUUID(),
  },
  name: String,
  category: String,
  freezeDate: Date,
  expirationDate: Date,
  durationDays: Number,
  volume: String,
  quantity: Number,
  id: Number,
});

const CategorySchema = new Schema({
  category: {
    type: String,
    unique: true,
    index: true,
  },
});

CategorySchema.index({ category: 1 }, { unique: true, background: true });

export const FreezerItems =
  mongoose.models.freezeritems ||
  mongoose.model("freezeritems", FreezerItemSchema);
export const Categories =
  mongoose.models.categories || mongoose.model("categories", CategorySchema);

// export  FreezerItems;
