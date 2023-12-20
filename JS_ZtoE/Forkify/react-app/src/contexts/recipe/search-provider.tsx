import { Recipe } from "@/features/recipe/model";
import React, { createContext, useCallback, useContext, useState } from "react";

type RecipeContextProps = {
  recipes: Recipe[];
  updateRecipes(data: Recipe[]): void;
};

const RecipeContext = createContext<RecipeContextProps | null>(null);

export const useRecipeContext = () => {
  const value = useContext(RecipeContext);
  if (!value)
    throw new Error("useRecipeContext should be used within RecipeProvider");
  return value;
};

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = useCallback((data: Recipe[]) => {
    setRecipes(data);
  }, []);
  return (
    <RecipeContext.Provider value={{ recipes, updateRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
