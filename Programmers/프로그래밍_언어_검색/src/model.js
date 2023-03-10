import { BASE_URL } from "./constants.js";

export const state = {
  languages: [],
  languagesSelected: [],
  inputFocusedIndexNum: -1,
  inputIndexCount: 0,
  searchElmentSelected: "",
};

export const cache = {};

export const loadLanguages = async keyword => {
  try {
    if (keyword === "") throw new Error("Keyword is required");

    //check cache
    if (cache[keyword]) {
      initiate(cache[keyword]);
      return;
    }

    const res = await fetch(`${BASE_URL}/languages?keyword=${keyword}`);
    if (!res.ok) throw new Error(data.error);

    const data = await res.json();

    //cacheing
    cache[keyword] = data;
    initiate(data);
  } catch (error) {
    throw error;
  }
};

const initiate = data => {
  state.languages = data;
  state.inputFocusedIndexNum = -1;
  state.inputIndexCount = data.length - 1;
};

export const getSelectedLanguage = () => {};
