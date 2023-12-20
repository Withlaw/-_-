import RecipeItemDetail from "@/features/recipe/recipe-search/\bsearch-item-detail";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

const RecipeContents = () => {
  return (
    <>
      <RecipeItemDetail />
      {/* <div className="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>

      <div className="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>

      <div className="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div> */}
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const { recipeId } = params;
  return null;
};

export default RecipeContents;
