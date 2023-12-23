import "@/sass/main.scss";

import Header from "@/components/header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RecipeSearchForm from "@/features/recipe/recipe-search/search-form";
import Navigation, { NavigationItemType } from "@/components/nav";
import RecipeProvider from "@/contexts/recipe/search-provider";
import SearchProvider from "@/contexts/recipe/search-service-provider";
import { HttpClientAxios, HttpClientFetch } from "@/adapters/api/http-client";
import { API_AUTH_BASE_URL, API_BASE_URL, API_KEY } from "@/constants";
import { axiosInstance } from "@/adapters/api/axios";
import RecipeService from "@/services/recipeService";
import { useEffect } from "react";
import AuthButton from "@/features/auth/auth-button";
import { useAuthReq } from "@/hooks/useAuthReq";
import { AuthService } from "@/services/authService";
import { TokenRepositoryTest } from "@/adapters/repository/token-repository";

const navList: NavigationItemType[] = [
  {
    name: "Add recipe",
    iconHref: "icon-edit",
    route: "recipe/new",
  },
  {
    name: "Bookmarks",
    iconHref: "icon-bookmark",
  },
  // {
  //   name: "go paper",
  //   iconHref: "",
  //   route: "paper",
  // },
  // {
  //   name: "go paper/a",
  //   iconHref: "",
  //   route: "paper/a",
  // },
  // {
  //   name: "go paper/a/1",
  //   iconHref: "",
  //   route: "paper/a/1",
  // },
];

// recipe
const httpClient = new HttpClientAxios(axiosInstance, API_BASE_URL);
// const httpClient = new HttpClientFetch(API_BASE_URL);
const searchService = new RecipeService(httpClient, API_KEY);

// auth
const authHttpClient = new HttpClientAxios(axiosInstance, API_AUTH_BASE_URL);
const tokenSessionStorage = new TokenRepositoryTest(
  "authToken",
  window.sessionStorage
);
const authService = new AuthService(authHttpClient, tokenSessionStorage);

const SearchLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const authButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    if (value === "login") return authService.login();
    if (value === "logout") return authService.logout();

    console.log(value);
    // authService.login
  };

  useEffect(() => {
    if (pathname !== "/") return;
    navigate("recipe");
  }, []);

  return (
    <SearchProvider searchService={searchService}>
      <RecipeProvider>
        <div className="container" id="container">
          <Header>
            <RecipeSearchForm />
            {/* <Navigation>
              {navList.map((nav, idx) => (
                <Navigation.Item key={idx} {...nav} />
              ))}
            </Navigation> */}
            <AuthButton type="login" onClick={authButtonHandler} />
            <AuthButton type="logout" onClick={authButtonHandler} />
          </Header>
          <Outlet />
        </div>
      </RecipeProvider>
    </SearchProvider>
  );
};

export default SearchLayout;
