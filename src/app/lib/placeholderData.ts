import { FoodItemType } from "./utils/typesAndSchemas";
import { addDaysToDate } from "./utils/datehelper";

import { generateId } from "./utils/tools";

enum PlaceholderCategory {
  MEAT = "Meat",
  DAIRY = "Dairy",
  FRUIT = "Fruit",
  COOKED_DISH = "Cooked dish",
  VEGETABLE = "Vegetable",
}

export const placeholderData: FoodItemType[] = [
  {
    _id: generateId(10),
    name: "Kødsovs",
    category: PlaceholderCategory.COOKED_DISH,
    freezeDate: new Date("2023-12-18"),
    expirationDate: addDaysToDate(new Date("2023-12-18"), 30),
    lifespanInDays: 30,
    volume: "ca. 1kg",
    quantity: 1,
  },
  {
    _id: generateId(10),
    name: "Ærter",
    category: PlaceholderCategory.VEGETABLE,
    freezeDate: new Date("2023-12-05"),
    expirationDate: addDaysToDate(new Date("2023-12-05"), 150),
    lifespanInDays: 150,
    volume: "500g",
    quantity: 3,
  },
  {
    _id: generateId(10),
    name: "Tomatsuppe",
    category: PlaceholderCategory.COOKED_DISH,
    freezeDate: new Date("2023-10-18"),
    expirationDate: addDaysToDate(new Date("2023-11-18"), 90),
    lifespanInDays: 90,
    volume: "plastikbeholder",
    quantity: 2,
  },
  {
    _id: generateId(10),
    name: "Mango  i tern",
    category: PlaceholderCategory.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "200g?",
    quantity: 4,
  },
  {
    _id: generateId(10),
    name: "Jordbær",
    category: PlaceholderCategory.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "500g?",
    quantity: 1,
  },
  {
    _id: generateId(10),
    name: "Smør",
    category: PlaceholderCategory.DAIRY,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 10 * 30),
    lifespanInDays: 10 * 30,
    volume: "200g",
    quantity: 10,
  },
  {
    _id: generateId(10),
    name: "Flæskesteg",
    category: PlaceholderCategory.MEAT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 6 * 30),
    lifespanInDays: 6 * 30,
    volume: "~2 kg",
    quantity: 2,
  },
];
