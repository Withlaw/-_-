import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios } from "@/adapters/api/http-client";
import { API_BASE_URL, API_KEY } from "@/constants";
import { Recipe } from "@/features/recipe/model";
import RecipeService, { RecipeServiceI } from "@/services/searchService";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SearchContextProps = {
  recipes: Recipe[];
  updateRecipes(data: Recipe[]): void;
};

const SearchContext = createContext<RecipeServiceI | null>(null);

export const useSearchContext = () => {
  const value = useContext(SearchContext);
  if (!value)
    throw new Error("useSearchContext should be used within ThemeProvider");
  return value;
};

const SearchProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: RecipeServiceI;
}) => {
  const search = useCallback(
    () => searchService.search.bind(searchService),
    []
  )();

  return (
    <SearchContext.Provider value={{ search }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
