import icons from "@/assets/icons/icons.svg";
import { RecipeDetail } from "@/features/recipe/model";
import Ingredient from "@/features/recipe/recipe-search/ingredient";

const RecipeItemDetail = ({ data }: { data: RecipeDetail }) => {
  return (
    <>
      <figure className="recipe__fig">
        <img src={data.imageUrl} alt={data.title} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{data.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${icons}#icon-clock`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {data.cookingTime}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${icons}#icon-users`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {data.servings}
          </span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div className="recipe__user-generated">
          <svg>
            <use href={`${icons}#icon-user`}></use>
          </svg>
        </div>
        <button className="btn--round">
          <svg>
            <use href={`${icons}#icon-bookmark-fill`}></use>
          </svg>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {data.ingredients.map((ingredient, idx) => (
            <Ingredient key={idx} data={ingredient} />
          ))}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__publisher">{data.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href={data.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href={`${icons}#icon-arrow-right`}></use>
          </svg>
        </a>
      </div>
    </>
  );
};

export default RecipeItemDetail;
