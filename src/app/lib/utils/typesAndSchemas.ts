import { z } from "zod";

export const FoodItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  category: z.string(),
  freezeDate: z.instanceof(Date),
  expirationDate: z.instanceof(Date),
  lifespanInDays: z.number(),
  volume: z.string(),
  quantity: z.number(),
});

export type Category = {
  name: string;
  id: string;
};
export type FoodItemType = z.infer<typeof FoodItemSchema>;
