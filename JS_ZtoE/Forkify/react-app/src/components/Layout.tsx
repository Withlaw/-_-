import "@/sass/main.scss";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import RecipeSearchForm from "@/features/recipe/recipe-search/search-form";
import Navigation, { NavigationItemType } from "@/components/nav";
import RecipeSearchProvider from "@/contexts/recipe/search-provider";

const navList: NavigationItemType[] = [
  {
    name: "Add recipe",
    iconHref: "icon-edit",
  },
  {
    name: "Bookmarks",
    iconHref: "icon-bookmark",
  },
];

const SearchLayout = () => {
  return (
    <RecipeSearchProvider>
      <div className="container">
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
    </RecipeSearchProvider>
  );
};

export default SearchLayout;
