import { RecipeServiceInterface } from "@/services/recipeService";
import React, { createContext, useCallback, useContext, useState } from "react";

// interface RecipeServiceContextProps extends RecipeServiceI {
//   isLoading: boolean;
//   loading: (value: boolean) => void;
// }

type RecipeServiceContextProps = RecipeServiceInterface & {
  isLoading: boolean;
  loading: (value: boolean) => void;
};

const RecipeServiceContext = createContext<RecipeServiceContextProps | null>(
  null
);

export const useRecipeService = () => {
  const value = useContext(RecipeServiceContext);
  if (!value)
    throw new Error("useRecipeService should be used within SearchProvider");
  return value;
};

const RecipeServiceProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: RecipeServiceInterface;
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
    <RecipeServiceContext.Provider
      value={{ search, download, upload, isLoading, loading }}
    >
      {children}
    </RecipeServiceContext.Provider>
  );
};

export default RecipeServiceProvider;
