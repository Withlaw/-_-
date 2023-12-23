import icons from "@/assets/icons/icons.svg";
import { IngredientType } from "@/features/recipes/recipe.model";
import Fraction from "fraction.js";

const Ingredient = ({ data }: { data: IngredientType }) => {
  return (
    <li className="recipe__ingredient">
      <svg className="recipe__icon">
        <use href={`${icons}#icon-check`}></use>
      </svg>
      <div className="recipe__quantity">
        {data.quantity && new Fraction(data.quantity).toFraction(true)}
      </div>
      <div className="recipe__description">
        <span className="recipe__unit">{data.unit}</span>
        {data.description}
      </div>
    </li>
  );
};

export default Ingredient;
