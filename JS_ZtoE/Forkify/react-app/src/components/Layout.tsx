import "@/sass/main.scss";

import Header from "@/components/header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RecipeSearchForm from "@/features/recipe/recipe-search/search-form";
import Navigation, { NavigationItemType } from "@/components/nav";
import RecipeProvider from "@/contexts/recipe/search-provider";
import SearchProvider from "@/contexts/recipe/search-service-provider";
import { HttpClientAxios, HttpClientFetch } from "@/adapters/api/http-client";
import { API_BASE_URL, API_KEY } from "@/constants";
import { axiosInstance } from "@/adapters/api/axios";
import RecipeService from "@/services/recipeService";
import { useEffect } from "react";

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

const httpClient = new HttpClientAxios(axiosInstance);
// const httpClient = new HttpClientFetch(API_BASE_URL);
const searchService = new RecipeService(httpClient, API_KEY);

const SearchLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
            <Navigation>
              {navList.map((nav, idx) => (
                <Navigation.Item key={idx} {...nav} />
              ))}
            </Navigation>
          </Header>
          <Outlet />
        </div>
      </RecipeProvider>
    </SearchProvider>
  );
};

export default SearchLayout;
