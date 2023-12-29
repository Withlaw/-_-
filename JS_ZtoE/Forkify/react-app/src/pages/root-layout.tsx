import "@/sass/main.scss";

import Header from "@/ui/header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RecipeSearchForm from "@/features/recipes/recipe-search/search-form.component";
import Navigation, { NavigationItemType } from "@/ui/nav";

import { HttpClientAxios } from "@/adapters/api/http-client";
import { API_BASE_URL, API_KEY } from "@/constants";
import { axiosInstance } from "@/adapters/api/axios";
import RecipeService from "@/services/recipeService";
import { useEffect } from "react";
import { RecipeDataProvider, RecipeServiceProvider } from "@/contexts/recipe";
import { Auth } from "@/features/authentication";
import { Link } from "react-router-dom";

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
  //   route: "/paper",
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

const SearchLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") navigate("/recipe");
  }, []);

  return (
    <RecipeServiceProvider searchService={searchService}>
      <RecipeDataProvider>
        <div className="container" id="container">
          <Header>
            <RecipeSearchForm />
            <Navigation>
              {navList.map((nav, idx) => (
                <Navigation.Item key={idx} {...nav} />
              ))}
            </Navigation>
            <Auth />
          </Header>
          <Outlet />
        </div>
      </RecipeDataProvider>
    </RecipeServiceProvider>
  );
};

export default SearchLayout;
