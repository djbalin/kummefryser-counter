// "use client";

// export default function Providers() {
//   return (
//     <CategoriesContextProvider>
//       <CategoriesHolder
//         allCategories={JSON.parse(JSON.stringify(allCategories))}
//       ></CategoriesHolder>

//       <div className="flex flex-col border-2 sm:px-4 border-opacity-30 sm:py-2 w-full gap-y-2">
//         <ListHeader></ListHeader>
//         {foodItemsParsed.map((foodItem) => {
//           return (
//             <FoodItem
//               key={foodItem._id}
//               // key={idx}
//               foodItem={foodItem}
//               allCategories={JSON.parse(JSON.stringify(allCategories))}
//             ></FoodItem>
//           );
//         })}
//       </div>
//     </CategoriesContextProvider>
//   );
// }
