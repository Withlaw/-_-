import * as model from "./src/model";
import app from "./src/app.js";
import header from "./src/components/Header.js";
import contentTitle from "./src/components/ContentTitle.js";
import homePage from "./src/page/HomePage.js";
import signupPage from "./src/page/SignupPage.js";

const controlLoadPage = async () => {
  try {
    await model.loadMembers();
    homePage.render(model.state.members);
  } catch (error) {
    console.error(error.message);
  }
};

const controlHomePage = path => {
  if (path === "/") {
    // contentTitle.render('Great PeoPle');
    homePage.render(model.state.members);
    return;
  }
  if (path === "/signup") {
    // contentTitle.render('Sign Up, GreatPeoPle!');
    signupPage.render();
    return;
  }
};

export const init = () => {
  // app.render();
  app.addHandlerLoad(controlLoadPage);
  app.addHanderRouting(controlHomePage);
  // header.render();
  // homePage.render();
  // homePage.addHanderRouting(constrolPageMove);
};

init();
