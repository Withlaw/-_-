import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios } from "@/adapters/api/http-client";
import { API_BASE_URL, API_KEY } from "@/constants";
import { Recipe } from "@/features/recipe/model";
import RecipeService, { RecipeServiceI } from "@/services/recipeService";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// interface SearchContextProps extends RecipeServiceI {
//   isLoading: boolean;
//   loading: (value: boolean) => void;
// }
type SearchContextProps = RecipeServiceI & {
  isLoading: boolean;
  loading: (value: boolean) => void;
};

const SearchContext = createContext<SearchContextProps | null>(null);

export const useSearchContext = () => {
  const value = useContext(SearchContext);
  if (!value)
    throw new Error("useSearchContext should be used within SearchProvider");
  return value;
};

const SearchProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: RecipeServiceI;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  const search = useCallback(
    () => searchService.search.bind(searchService),
    []
  )();

  const download = useCallback(
    () => searchService.download?.bind(searchService),
    []
  )();

  const upload = useCallback(
    () => searchService.upload?.bind(searchService),
    []
  )();

  return (
    <SearchContext.Provider
      value={{ search, download, upload, isLoading, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
