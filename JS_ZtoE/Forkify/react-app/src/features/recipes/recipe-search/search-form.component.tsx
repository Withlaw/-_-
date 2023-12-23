import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import icons from "@/assets/icons/icons.svg";
import {
  Recipe,
  RecipeDataPreview,
  RecipeDataPreviewRes,
} from "@/features/recipes/recipe.model";
import { useRecipeData, useRecipeService } from "@/contexts/recipe";

const RecipeSearchForm = () => {
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);
  const { updateRecipes } = useRecipeData();
  const { search, loading } = useRecipeService();

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    if (!value.trim()) return;

    loading(true);
    // try/catch로 에러핸들링 나중에 추가...
    const { recipes } = await search<RecipeDataPreviewRes>(value);

    // domain: data transform
    updateRecipes(
      recipes.map((recipe: RecipeDataPreview) => new Recipe(recipe))
    );
    loading(false);
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
