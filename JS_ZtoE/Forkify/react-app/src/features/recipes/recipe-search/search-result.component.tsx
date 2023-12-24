import Copyright from "@/ui/copyright";
import LoadingSpinner from "@/ui/loading-spinner";
import RecipePagenation from "@/features/recipes/recipe-pagenation/recipe-pagenation.component";
import RecipeItemPreview from "@/features/recipes/recipe-search/recipe-preview.component";
import { useRouteLoaderData } from "react-router-dom";
import { useRecipeData, useRecipeService } from "@/contexts/recipe";

const RecipeSearchResult = () => {
  const { recipes } = useRecipeData();
  const { isLoading } = useRecipeService();

  const noItem = !recipes.length;

  // root loader
  const data = useRouteLoaderData("root");
  // console.log("root loader data: ", data);

  return (
    <div className="search-results">
      <ul className="results">
        {isLoading && <LoadingSpinner />}
        {!isLoading && noItem && <p>no item...</p>}
        {!noItem &&
          recipes.map(recipe => (
            <RecipeItemPreview key={recipe.id} recipe={recipe} />
          ))}
      </ul>
      <RecipePagenation />
      <Copyright />
    </div>
  );
};

export default RecipeSearchResult;
