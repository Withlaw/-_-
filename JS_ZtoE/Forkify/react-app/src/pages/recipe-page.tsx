import RecipeSearchResult from "@/features/recipe/recipe-search/search-result";
import RecipeContents from "@/features/recipe/recipe";
import { Outlet, useNavigation } from "react-router-dom";
import Message from "@/components/message";

const RecipePage = () => {
  const { state: pageState } = useNavigation();
  console.log("pageState: ", pageState);
  return (
    <>
      <RecipeSearchResult />
      <div className="recipe">
        <Message message="Start by searching for a recipe or an ingredient. Have fun!" />

        <Outlet />
      </div>
    </>
  );
};

export default RecipePage;
