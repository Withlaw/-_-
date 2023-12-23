import { RecipeSearchResult } from "@/features/recipes";
import LoadingSpinner from "@/ui/loading-spinner";

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
