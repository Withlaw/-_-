import RecipeSearchResult from "@/features/recipe/recipe-search/search-result";
import { Outlet } from "react-router-dom";

const RecipePage = () => {
  return (
    <>
      <RecipeSearchResult />
      <div className="recipe">
        <Outlet />
      </div>
    </>
  );
};

export default RecipePage;
