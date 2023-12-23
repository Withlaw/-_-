import { Recipe } from "@/features/recipe/recipe.model";
import { NavLink } from "react-router-dom";

const RecipeItemPreview = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li className="preview">
      <NavLink
        to={recipe.id}
        className={({ isActive }) =>
          isActive ? "preview__link preview__link--active" : "preview__link"
        }
      >
        <figure className="preview__fig">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipe.title}</h4>
          <p className="preview__publisher">{recipe.publisher}</p>
          <div className="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default RecipeItemPreview;
