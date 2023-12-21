import RecipeSearchResult from "@/features/recipe/recipe-search/search-result";
import RecipeContents from "@/features/recipe/recipe-content";
import { Outlet, useNavigation } from "react-router-dom";

const RecipePage = () => {
  const { state: pageState } = useNavigation();
  console.log("pageState: ", pageState);
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
