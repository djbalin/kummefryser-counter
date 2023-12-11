enum Category {
  MEAT = "Meat",
  DAIRY = "Dairy",
  FRUIT = "Fruit",
  COOKED_DISH = "Cooked dish",
}

type FoodItem = {
  name: string;
  category: Category;
  freezeDate: Date;
  durationDays: number;
  volume: string;
  id: number;
};

export default FoodItem;
