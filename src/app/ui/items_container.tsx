"use server";
import {
  getAllSorted,
  getAllFilteredByCategories,
  getAllCategories,
  wipeAndPopulateDB,
} from "../lib/db/dbhelper";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import FoodItem from "./food_item";
import ListHeader from "./list_header";
import CategoriesHolder from "./categories_holder";
import CategoriesContextProvider from "../contexts/categories-context";
import ItemList from "./item_list";
import WipeDB from "./WIPEDB";
import { useAuthContext } from "../contexts/auth_context";
//
// URL SEARCH PARAM APPROACH
//
// export default async function ItemList({
//   searchParams,
// }:
// {
//   searchParams?: {
//     category?: string[];
//   };
// }) {
export default async function ItemsContainer() {
  //
  // URL SAERCH PARAMS APPROACH
  //
  // const categories: string[] = searchParams?.category || [];
  // let foodItems: FoodItemType[];
  // // console.log();
  // if (categories.length > 0) {
  //   foodItems = await getAllFilteredByCategories(categories);
  // } else {
  //   foodItems = await getAllSorted();
  // }

  // const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  // const { user } = useAuthContext();
  const foodItems = await getAllSorted();
  const allCategories = await getAllCategories();
  console.log("No. of fooditems in foodlist:" + foodItems.length);

  const foodItemsSerialized = await JSON.stringify(foodItems);
  const foodItemsParsed: FoodItemType[] = JSON.parse(
    foodItemsSerialized,
    (key, value) => {
      if (key.endsWith("Date")) {
        return new Date(value);
      } else {
        return value;
      }
    }
  );

  return (
    <>
      {foodItems.length == 0 ? (
        <span className="text-xl text-red-500">
          The database seems empty, please fill it with example data by clicking
          the button below:
        </span>
      ) : (
        <>
          <CategoriesHolder
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></CategoriesHolder>
          <ItemList
            foodItemsParsed={foodItemsParsed}
            allCategories={JSON.parse(JSON.stringify(allCategories))}
          ></ItemList>
        </>
      )}

      {/* if (foodItems.length == 0){<span>Seems empty</span>} */}
      <WipeDB wipeDBAndRefresh={wipeAndPopulateDB}></WipeDB>
    </>
  );
}
