import { ObjectId } from "mongodb";
import { z } from "zod";

export enum Category {
  MEAT = "Meat",
  DAIRY = "Dairy",
  FRUIT = "Fruit",
  COOKED_DISH = "Cooked dish",
}

const FoodItemSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  category: z.string(),
  // category: z.nativeEnum(Category),
  freezeDate: z.instanceof(Date),
  expirationDate: z.instanceof(Date),
  lifespanInDays: z.number(),
  volume: z.string(),
  quantity: z.number(),
});

// const FreezerItemEntitySchema = z.object({ ...FoodItem, _id: z.instan });
export const FoodItemSchemaNoId = FoodItemSchema.omit({ _id: true });
export type FoodItemType = z.infer<typeof FoodItemSchema>;
export type NakedFoodItemType = z.infer<typeof FoodItemSchemaNoId>;

// type FoodItemType = {
//   name: string;
//   category: Category;
//   freezeDate: Date;
//   expirationDate: Date;
//   durationDays: number;
//   volume: string;
//   id: number;
//   quantity: number;
// };

// export default NakedFoodItemType;
