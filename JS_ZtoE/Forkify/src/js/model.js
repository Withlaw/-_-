import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, API_KEY } from "./constants";
import { getJSON, sendJSON } from "./helpers";

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

const createRecipeObj = data => {
  let { recipe } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    isBookmarked: false,
    ...(recipe.key && { key: recipe.key }), // very nice trick
  };
};

export const loadRecipe = async function (id) {
  try {
    const { data } = await getJSON(`${API_URL}/${id}`);

    state.recipe = createRecipeObj(data);
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

// 새로고침하면 북마크 리스트에서 클릭한 요소 배경색 변경이 계속 유지되는 문제 있음
export const getBookmarksFromStorage = () => {
  const item = window.localStorage.getItem("bookmarks");
  if (item === null || item?.length === 2) return;

  state.bookmarks = JSON.parse(item);

  // 위 보다는 아래가 낫다
  // if (item) state.bookmarks = JSON.parse(item);

  return true;
};

export const uploadRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(el => el[0].startsWith("ingredient") && el[1] !== "")
      .map(el => {
        const ingredientArr = el[1].replaceAll(" ", "").split(",");
        if (ingredientArr.length !== 3)
          throw new Error("Wrong ingredient format!");
        const [quantity, unit, description] = ingredientArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const { data } = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObj(data);
    bookmarking(state.recipe);
  } catch (error) {
    throw error;
  }
};

const init = () => {
  getBookmarksFromStorage();
};
init();
