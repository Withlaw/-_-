import logo from "@/assets/images/logo.png";
import icons from "@/assets/icons/icons.svg";
import React, { useEffect } from "react";
import { API_KEY, API_BASE_URL } from "@/constants";
import Navigation, { NavigationItemType } from "@/components/nav";
import RecipeSearch from "@/features/recipe/recipe-search/search-form";

export type HeaderProps = { children?: React.ReactNode };

const Header = ({ children }: HeaderProps) => {
  // useEffect(() => {
  //   fetch(API_BASE_URL + `?search=rice&key=${API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("api test: ", data);
  //     });
  // }, []);

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      {children}
    </header>
  );
};

export default Header;
