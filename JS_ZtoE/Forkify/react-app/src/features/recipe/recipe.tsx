import { useSearchContext } from "@/contexts/recipe/search-service-provider";
import {
  RecipeDetail,
  RecipeDetailData,
  RecipeDetailDataRes,
} from "@/features/recipe/model";
import RecipeItemDetail from "@/features/recipe/recipe-search/\bsearch-item-detail";
import { useEffect, useState } from "react";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useParams,
} from "react-router-dom";

const RecipeContents = () => {
  const { load } = useSearchContext();
  const { recipeId } = useParams();
  const [data, setData] = useState<RecipeDetail | null>(null);
  useEffect(() => {
    if (!recipeId) return;
    const loadRecipe = async () => {
      const { recipe } = await load<RecipeDetailDataRes>(recipeId);
      const transformRecipe = new RecipeDetail(recipe);
      setData(transformRecipe);
    };

    loadRecipe();
  }, [recipeId]);

  return (
    <>
      {data && <RecipeItemDetail data={data} />}
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
  console.log("recipeId: ", recipeId);
  return null;
};

export default RecipeContents;
