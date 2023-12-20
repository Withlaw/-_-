import { Recipe } from "@/features/recipe/model";
import React, { createContext, useCallback, useContext, useState } from "react";

type SearchContextProps = {
  recipes: Recipe[];
  updateRecipes(data: Recipe[]): void;
};

const RecipeSearchContext = createContext<SearchContextProps | null>(null);

export const useRecipeSearchContext = () => {
  const value = useContext(RecipeSearchContext);
  if (!value)
    throw new Error("useSearchContext should be used within ThemeProvider");
  return value;
};

const RecipeSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = useCallback((data: Recipe[]) => {
    setRecipes(data);
  }, []);
  return (
    <RecipeSearchContext.Provider value={{ recipes, updateRecipes }}>
      {children}
    </RecipeSearchContext.Provider>
  );
};

export default RecipeSearchProvider;
