// "use server";

// import { PlusIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";

// const inputStyle = "bg-slate-500 bg-opacity-40 pl-2 rounded-lg";

// export default async function AddCategory() {
//   const [newCategory, setNewCategory] = useState<string>("");
//   function handleTypeNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
//     setNewCategory(e.target.value);
//     // TODO:
//     // Implement searching and validation to check if the inputted new cateogyr already exists
//     // "Did you mean 'fruit'? Already exists"
//   }
//   <div className="flex flex-col">
//     <div className="flex gap-x-2">
//       <input
//         type="text"
//         className={`${inputStyle} w-48 h-10 text-lg placeholder:text-[1rem]`}
//         placeholder="New category"
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//           handleTypeNewCategory(e);
//         }}
//         value={newCategory}
//         // ref={newCategoryInput}

//         //   autoFocus
//       />
//       <button
//         // onClick={(e: React.MouseEvent<HTMLElement>) => {
//         //   document;
//         //   // .getElementById("categoriesContainer")
//         //   // ?.classList.remove(...invalidInputStyle);
//         //   handleClickNewCategory(e);
//         // }}
//         type="submit"
//         // onClick={(e) => e.preventDefault()}
//         className="flex mr-4 items-center justify-center rounded-lg w-16 h-10 bg-green-400 bg-opacity-50"
//       >
//         <PlusIcon width={40} />
//       </button>
//     </div>
//     {/* {categoryHasBeenAdded && ( */}
//     <p className="text-xs pl-2 pt-1 text-slate-500 w-48">
//       New categories are only saved when you click Submit
//     </p>
//     {/* )} */}
//   </div>;
// }
