import { Category, FoodItemType } from "../types_schemas/typesAndSchemas";
import { addDaysToDate } from "./datehelper";

import { generateId } from "./db/dbhelper";

export const placeholderData: FoodItemType[] = [
  {
    _id: generateId(10),
    name: "Kødsovs",
    category: Category.COOKED_DISH,
    freezeDate: new Date("2023-11-18"),
    expirationDate: addDaysToDate(new Date("2023-11-18"), 30),
    lifespanInDays: 30,
    volume: "ca. 1kg",
    quantity: 1,
  },
  {
    _id: generateId(10),
    name: "Menneskehjerte",
    category: Category.COOKED_DISH,
    freezeDate: new Date("2023-10-18"),
    expirationDate: addDaysToDate(new Date("2023-11-18"), 90),
    lifespanInDays: 90,
    volume: "ca. 1kg",
    quantity: 1,
  },
  {
    _id: generateId(10),
    name: "Mango  i tern",
    category: Category.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "200g?",
    quantity: 4,
  },
  {
    _id: generateId(10),
    name: "Jordbær",
    category: Category.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "500g?",
    quantity: 1,
  },
  {
    _id: generateId(10),
    name: "Smør",
    category: Category.DAIRY,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 10 * 30),
    lifespanInDays: 10 * 30,
    volume: "200g",
    quantity: 10,
  },
  {
    _id: generateId(10),
    name: "Flæskesteg",
    category: Category.MEAT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 6 * 30),
    lifespanInDays: 6 * 30,
    volume: "~2 kg",
    quantity: 2,
  },
];
