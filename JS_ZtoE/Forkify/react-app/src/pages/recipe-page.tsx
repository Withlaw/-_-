import LoadingSpinner from "@/components/loading-spinner";
import RecipeSearchResult from "@/features/recipe/recipe-search/search-result";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";

const RecipePage = () => {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <>
      <RecipeSearchResult />
      <div className="recipe">
        {isLoading && <LoadingSpinner />}
        {!isLoading && <Outlet />}
      </div>
    </>
  );
};

export default RecipePage;
