import LoadingSpinner from "@/components/loading-spinner";
import { useRecipeContext } from "@/contexts/recipe/search-provider";
import { useSearchContext } from "@/contexts/recipe/search-service-provider";
import RecipeItemPreview from "@/features/recipe/recipe-search/search-item-preview";
import { useRouteLoaderData } from "react-router-dom";

const RecipeSearchResult = () => {
  const { recipes } = useRecipeContext();
  const { isLoading } = useSearchContext();

  const noItem = !recipes.length;

  // root loader
  const data = useRouteLoaderData("root");
  console.log("root loader data: ", data);

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

      <div className="pagination"></div>

      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
          rel="noreferrer"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
};

export default RecipeSearchResult;
