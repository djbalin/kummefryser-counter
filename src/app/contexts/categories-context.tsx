"use client";
import React, { createContext, useContext, useState } from "react";

type CategoryContext = {
  categoryContext: string[];
  setCategoryContext: React.Dispatch<React.SetStateAction<string[]>>;
};

const CategoriesContext = createContext<CategoryContext | null>(null);

export default function CategoriesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<string[]>([""]);

  return (
    <CategoriesContext.Provider
      value={{ categoryContext: categories, setCategoryContext: setCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategoryContext(): CategoryContext {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoriesContextProvider"
    );
  }
  return context;
}
