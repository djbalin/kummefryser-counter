// import FoodItemType from "../types/fooditem";

// enum Category {
//   MEAT = "Meat",
//   DAIRY = "Dairy",
//   FRUIT = "Fruit",
//   COOKED_DISH = "Cooked dish",
// }

// let idCounter: number = 0;

// function getId(): number {
//   return idCounter++;
// }

// const foodItems: FoodItemType[] = [];
// function addFoodItems(
//   quantity: number,
//   name: string,
//   category: Category,
//   freezeDate: Date,
//   expirationDate: Date,
//   durationDays: number,
//   volume: string
// ) {
//   for (let i = 0; i < quantity; i++) {
//     const item: FoodItemType = {
//       name: name,
//       category: category,
//       freezeDate: freezeDate,
//       expirationDate: expirationDate,
//       durationDays: durationDays,
//       volume: volume,
//       id: getId(),
//     };
//     foodItems.push(item);
//   }
// }

// export default function getFoodItems(): FoodItemType[] {
//   if (foodItems.length === 0) {
//     addFoodItems(
//       1,
//       "Kødsovs",
//       Category.COOKED_DISH,
//       new Date("2023-11-18"),
//       new Date("2023-12-18"),
//       30,
//       "ca. 1kg"
//     );
//     addFoodItems(
//       1,
//       "Menneskehjerte",
//       Category.COOKED_DISH,
//       new Date("2023-10-18"),
//       new Date("2024-1-18"),
//       //   new Date("2024-1-18"),
//       90,
//       "ca. 1kg"
//     );
//     addFoodItems(
//       4,
//       "Mango i tern",
//       Category.FRUIT,
//       new Date("2023-12-10"),
//       new Date("2024-4-10"),
//       4 * 30,
//       "200g?"
//     );
//     addFoodItems(
//       1,
//       "Jordbær",
//       Category.FRUIT,
//       new Date("2023-12-10"),
//       new Date("2024-4-10"),
//       4 * 30,
//       "500g?"
//     );
//     addFoodItems(
//       10,
//       "Smør",
//       Category.DAIRY,
//       new Date("2023-12-10"),
//       new Date("2024-10-10"),
//       10 * 30,
//       "200g"
//     );
//     addFoodItems(
//       2,
//       "Flæskesteg",
//       Category.MEAT,
//       new Date("2023-12-10"),
//       new Date("2024-6-10"),
//       6 * 30,
//       "~2 kg"
//     );
//   }
//   return foodItems;
// }
