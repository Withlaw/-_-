import { useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";
import icons from "@/assets/icons/icons.svg";
import Modal from "@/components/modal";
import { RecipeFormData, inputDataType } from "@/features/recipe/recipe.model";
import { useSearchContext } from "@/contexts/recipe/search-service-provider";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { upload } = useSearchContext();

  const modalCloseHandler = () => {
    navigate("..", { relative: "path" });
  };

  const modalSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const formDataObj = Object.fromEntries(formData);
    try {
      const newRecipe = new RecipeFormData({
        ...RecipeFormData.extractRecipeData(formDataObj as inputDataType),
        ingredients: RecipeFormData.extractIngredients(
          formDataObj as inputDataType
        ),
      });

      console.log("formDataObj: ", formDataObj, newRecipe);

      /*
      const res = await fetch(
        "https://forkify-api.herokuapp.com/api/v2/recipes?key=f4dfabae-a9ea-4c6e-91e0-aa65496662e4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        }
      );
      const data = res.json();
      console.log("form compoleeete: ", data);
      */

      const data = await upload(JSON.stringify(newRecipe));
      console.log("form: ", data);
      // upload 완료.
      const { id } = data.recipe;
      return navigate("/recipe/" + id);
    } catch (err) {
      alert("다시작성해주세요.");
      return;
    }
  };

  return (
    <Modal className="add-recipe-window" onClose={modalCloseHandler}>
      <button className="btn--close-modal" onClick={modalCloseHandler}>
        &times;
      </button>
      <form className="upload" onSubmit={modalSubmitHandler}>
        <fieldset className="upload__column">
          <legend className="upload__heading">Recipe data</legend>
          <label htmlFor="title">Title</label>
          <input required name="title" type="text" id="title" />
          <label htmlFor="url">URL</label>
          <input required name="sourceUrl" type="text" id="url" />
          <label htmlFor="imageUrl">Image URL</label>
          <input required name="image" type="text" id="imageUrl" />
          <label htmlFor="publisher">Publisher</label>
          <input required name="publisher" type="text" id="publisher" />
          <label htmlFor="prepTime">Prep time</label>
          <input required name="cookingTime" type="number" id="prepTime" />
          <label htmlFor="servings">Servings</label>
          <input required name="servings" type="number" id="servings" />
        </fieldset>

        <fieldset className="upload__column">
          <legend className="upload__heading">Ingredients</legend>
          <label htmlFor="i1">Ingredient 1</label>
          <input
            type="text"
            required
            id="i1"
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label htmlFor="i2">Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            id="i2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label htmlFor="i3">Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            id="i3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label htmlFor="i4">Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            id="i4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label htmlFor="i5">Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            id="i5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label htmlFor="i6">Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            id="i6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </fieldset>

        <button className="btn upload__btn">
          <svg>
            <use href={`${icons}#icon-upload-cloud`}></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </Modal>
  );
};

export default AddRecipe;
