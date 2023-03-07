import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".nav__btn--add-recipe");
  _recipeForm = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  _toggleWindow() {
    this._recipeForm.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._window.addEventListener("click", this._toggleWindow.bind(this));
    this._overlay.addEventListener("click", e => {
      console.log(this);
      this._toggleWindow();
    });
    this._recipeForm.addEventListener("click", e => {
      const btn = e.target.closest(".btn--close-modal");
      if (!btn) return;
      this._toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
