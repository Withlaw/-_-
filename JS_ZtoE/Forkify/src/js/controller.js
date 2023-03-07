import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import pagenationView from "./views/pagenation";
import bookmarkListView from "./views/bookmarkListView";
import addRecipeView from "./views/addRecipeView";

// most old browsers are supported.
import "core-js/stable"; // polifiling everything else
import "regenerator-runtime/runtime"; // polifiling async/await

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // guard clause
    recipeView.renderSpinner();

    // update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // recipeView.render(recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagenation button
    pagenationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagenation = page => {
  resultsView.render(model.getSearchResultsPage(page));
  pagenationView.render(model.state.search);
};

const controlServings = num => {
  model.updateServings(num);
  // recipeView.render(model.state.recipe);

  // update
  recipeView.update(model.state.recipe);
};

const controlBookmarking = () => {
  model.bookmarking(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkListView.render(model.state.bookmarks);
};

// const controlBookmarkList = () => {
//   bookmarkListView.render(model.state.bookmarks);
// };

const controlAddRecipe = newRecipe => {
  console.log(newRecipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmarking(controlBookmarking);

  searchView.addHandlerSearch(controlSearchResults);
  pagenationView.addHandlerClick(controlPagenation);

  bookmarkListView.render(model.state.bookmarks);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
