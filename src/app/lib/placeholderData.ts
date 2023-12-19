import { NakedFoodItemType, Category } from "../types_schemas/typesAndSchemas";
import { addDaysToDate } from "./datehelper";

export const placeholderData: NakedFoodItemType[] = [
  {
    name: "Kødsovs",
    category: Category.COOKED_DISH,
    freezeDate: new Date("2023-11-18"),
    expirationDate: addDaysToDate(new Date("2023-11-18"), 30),
    lifespanInDays: 30,
    volume: "ca. 1kg",
    quantity: 1,
  },
  {
    name: "Menneskehjerte",
    category: Category.COOKED_DISH,
    freezeDate: new Date("2023-10-18"),
    expirationDate: addDaysToDate(new Date("2023-11-18"), 90),
    lifespanInDays: 90,
    volume: "ca. 1kg",
    quantity: 1,
  },
  {
    name: "Mango  i tern",
    category: Category.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "200g?",
    quantity: 4,
  },
  {
    name: "Jordbær",
    category: Category.FRUIT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 4 * 30),
    lifespanInDays: 4 * 30,
    volume: "500g?",
    quantity: 1,
  },
  {
    name: "Smør",
    category: Category.DAIRY,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 10 * 30),
    lifespanInDays: 10 * 30,
    volume: "200g",
    quantity: 10,
  },
  {
    name: "Flæskesteg",
    category: Category.MEAT,
    freezeDate: new Date("2023-12-10"),
    expirationDate: addDaysToDate(new Date("2023-12-10"), 6 * 30),
    lifespanInDays: 6 * 30,
    volume: "~2 kg",
    quantity: 2,
  },
];
