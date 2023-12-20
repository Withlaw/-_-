import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import icons from "@/assets/icons/icons.svg";
import { useRecipeContext } from "@/contexts/recipe/search-provider";
import { useSearchContext } from "@/contexts/recipe/search-service-provider";
import { Recipe } from "@/features/recipe/model";

const RecipeSearchForm = () => {
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);
  const { updateRecipes } = useRecipeContext();
  const { search, loading } = useSearchContext();

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    loading(true);

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    const recipes = await search<Recipe[]>(value);
    loading(false);
    updateRecipes(recipes);
  };

  // const [searchParam, setSearchParam] = useSearchParams();
  // const submitHandler   = async (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   const { value } = searchElementRefTarget.current as HTMLInputElement;
  // };

  // <form
  //   className="search"
  //   onSubmit={e => {
  //     e.preventDefault();
  //     setSearchParam({
  //       search: searchElementRefTarget.current?.value as string,
  //     });
  //   }}
  // >

  return (
    <form className="search" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        name="search"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        ref={searchElementRefTarget}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

/*
const Form = () => {
  return (
    <form className="search">
      <input
        type="text"
        name="search"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

RecipeSearch.Form = Form;
*/

export default RecipeSearchForm;
