import Message from "@/components/message";
import { useSearchContext } from "@/contexts/recipe/search-service-provider";
import {
  RecipeDetail,
  RecipeDetailData,
  RecipeDetailDataRes,
} from "@/features/recipe/model";
import RecipeItemDetail from "@/features/recipe/recipe-search/search-item-detail";
import { useEffect, useState } from "react";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useParams,
} from "react-router-dom";

const RecipeContent = () => {
  const { download } = useSearchContext();
  const { recipeId } = useParams();
  const [data, setData] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    if (!recipeId) return;
    const loadRecipe = async () => {
      const { recipe } = await download<RecipeDetailDataRes>(recipeId);
      setData(new RecipeDetail(recipe));
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

const Default = () => {
  return (
    <Message message="Start by searching for a recipe or an ingredient. Have fun!" />
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const { recipeId } = params;
  console.log("recipe detail loader start: ", recipeId);

  const b = await new Promise(resolve => {
    setTimeout(() => {
      resolve("loader");
      console.log("recipe detail loade done.");
    }, 1000);
  });
  return null;
};

RecipeContent.Default = Default;

export default RecipeContent;
