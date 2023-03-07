import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./constants";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "", // 향후 검색 순위와 같이 데이터 분석 등에 유용하게 사용됨.
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { data } = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,

      isBookmarked: false,
    };
    if (state.bookmarks.some(el => el.id === id))
      state.recipe.isBookmarked = true;

    // return state;
  } catch (err) {
    // alert(err);
    // console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const { data } = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.recipes.map(el => {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        image: el.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// 2
export const updateServings = num => {
  // side effect
  state.recipe.ingredients.forEach(el => {
    el.quantity = el.quantity * (num / state.recipe.servings);
  });

  state.recipe.servings = num;
};

//
export const bookmarking = recipe => {
  // unbookmarked
  if (state.bookmarks.some(el => el.id === recipe.id)) {
    state.bookmarks = state.bookmarks.filter(el => el.id !== recipe.id);
    state.recipe.isBookmarked = false;
    window.localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  } else {
    // add bookmark
    state.bookmarks.push(recipe);
    // if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;
    state.recipe.isBookmarked = true;
    window.localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  }
};

export const loadStorage = () => {
  const item = window.localStorage.getItem("bookmarks");
  if (item === null || item?.length === 2) return;

  state.bookmarks = JSON.parse(item);

  // 위 보다는 아래가 낫다
  // if (item) state.bookmarks = JSON.parse(item);

  return true;
};

// const init = () => {
//   const item = window.localStorage.getItem('bookmarks');
//   if (item === null || item?.length === 2) return;

//   state.bookmarks = JSON.parse(item);
// }
// init()

// const uploadRecipe = async () => {
//   try {

//   } catch (error) {

//   }
// }
