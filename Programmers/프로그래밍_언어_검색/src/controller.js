import * as model from "./model.js";
import searchView from "./views/searchView.js";
import selectedView from "./views/selectedView.js";

const controlSearch = async keyword => {
  try {
    await model.loadLanguages(keyword);
    searchView.render(model.state);
  } catch (error) {
    if (error.message === "Keyword is required") {
      searchView.delete();
      return;
    }
    console.error("controlLoad", error);
  }
};

const controlArrowKey = num => {
  if (model.state.languages.length <= 0) return;

  let { inputFocusedIndexNum, inputIndexCount } = model.state;

  if (num < 0) {
    if (inputFocusedIndexNum <= 0) {
      inputFocusedIndexNum = inputIndexCount;
    } else {
      inputFocusedIndexNum -= 1;
    }
  } else {
    if (inputFocusedIndexNum === inputIndexCount) {
      inputFocusedIndexNum = 0;
    } else {
      inputFocusedIndexNum += 1;
    }
  }

  model.state.inputFocusedIndexNum = inputFocusedIndexNum;
  model.state.searchElmentSelected =
    model.state.languages[inputFocusedIndexNum];
  searchView.render(model.state);
};

const controlElert = (lan = "") => {
  if (!lan) {
    lan = model.state.searchElmentSelected;
  }
  if (lan === "") return;

  window.alert(lan);

  model.state.languagesSelected = model.state.languagesSelected.filter(
    el => el !== lan
  );
  model.state.languagesSelected.push(lan);
  selectedView.render(model.state);
};

const init = () => {
  searchView.addHandlerInput(controlSearch);
  searchView.addHandlerArrow(controlArrowKey);
  searchView.addHandlerAlert(controlElert);
};

init();
