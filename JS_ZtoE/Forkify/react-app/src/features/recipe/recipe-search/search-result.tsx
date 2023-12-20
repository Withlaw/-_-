import { useRecipeSearchContext } from "@/contexts/recipe/search-provider";
import RecipeItemPreview from "@/features/recipe/recipe-search/search-item-preview";

const RecipeSearchResult = () => {
  const { recipes } = useRecipeSearchContext();

  const noItem = !recipes.length;

  return (
    <div className="search-results">
      <ul className="results">
        {noItem && <p>no item...</p>}
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
