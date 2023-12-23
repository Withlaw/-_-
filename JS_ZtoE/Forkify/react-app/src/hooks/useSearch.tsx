import React, { useRef } from "react";
import { Recipe } from "@/features/recipe/recipe.model";
import { useRecipeContext } from "@/contexts/recipe/search-provider";

const useSearch = () => {
  /*
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);
  const { updateRecipes } = useSearchContext();

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    const recipes = await searchService.search<Recipe[]>(value);
    console.log("search res data: ", recipes);

    updateRecipes(recipes);
    // setSearchTerm(value);
  };

  // return { searchElementRefTarget, searchTerm, handleSearchSubmit };
  return { searchElementRefTarget, handleSearchSubmit };
  */
};

export default useSearch;
