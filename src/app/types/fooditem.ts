export enum Category {
  MEAT = "Meat",
  DAIRY = "Dairy",
  FRUIT = "Fruit",
  COOKED_DISH = "Cooked dish",
}

type FoodItemType = {
  name: string;
  category: Category;
  freezeDate: Date;
  expirationDate: Date;
  durationDays: number;
  volume: string;
  id: number;
  // quantity: number;
};

export default FoodItemType;
