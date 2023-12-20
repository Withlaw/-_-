import logo from "@/assets/images/logo.png";
import icons from "@/assets/icons/icons.svg";
import { useEffect } from "react";
import { API_KEY, API_BASE_URL } from "@/utils/constants";
import Navigation, { NavigationItemType } from "@/components/Nav";
import RecipeSearch from "@/components/search/Search";

const Header = () => {
  // useEffect(() => {
  //   fetch(API_BASE_URL + `?search=rice&key=${API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("api test: ", data);
  //     });
  // }, []);

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

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <RecipeSearch />
      <Navigation>
        {navList.map((nav, idx) => (
          <Navigation.Item key={idx} {...nav} />
        ))}
      </Navigation>
    </header>
  );
};

export default Header;
