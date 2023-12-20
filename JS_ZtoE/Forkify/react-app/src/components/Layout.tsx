import "@/sass/main.scss";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import RecipeSearchForm from "@/features/recipe/recipe-search/search-form";
import Navigation, { NavigationItemType } from "@/components/nav";

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

const Layout = () => {
  return (
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
  );
};

export default Layout;
