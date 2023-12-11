enum Category {
  MEAT = "Meat",
  DAIRY = "Dairy",
  FRUIT = "Fruit",
  COOKED_DISH = "Cooked dish",
}

let idCounter: number = 0;

function getId(): number {
  return idCounter++;
}

type FoodItem = {
  name: string;
  category: Category;
  freezeDate: Date;
  durationDays: number;
  volume: string;
  id: number;
};

const foodItems: FoodItem[] = [];
function addFoodItems(
  amount: number,
  name: string,
  category: Category,
  freezeDate: Date,
  durationDays: number,
  volume: string
) {
  for (let i = 0; i < amount; i++) {
    const item: FoodItem = {
      name: name,
      category: category,
      freezeDate: freezeDate,
      durationDays: durationDays,
      volume: volume,
      id: getId(),
    };
    foodItems.push(item);
  }
}

export default function getFoodItems(): FoodItem[] {
  if (foodItems.length === 0) {
    addFoodItems(
      10,
      "smør",
      Category.DAIRY,
      new Date("2023-12-10"),
      8 * 30,
      "200g"
    );
    addFoodItems(
      2,
      "flæskesteg",
      Category.MEAT,
      new Date("2023-12-10"),
      6 * 30,
      "~2 kg"
    );
    addFoodItems(
      4,
      "mango i tern",
      Category.FRUIT,
      new Date("2023-12-10"),
      4 * 30,
      "200g?"
    );
    addFoodItems(
      1,
      "jordbær",
      Category.FRUIT,
      new Date("2023-12-10"),
      4 * 30,
      "500g?"
    );
  }
  return foodItems;
}
