import icons from "@/assets/icons/icons.svg";
import React from "react";

export type NavigationProps = { children?: React.ReactNode };

const Navigation = ({ children }: NavigationProps) => {
  return (
    <nav className="nav">
      <ul className="nav__list">{children}</ul>
    </nav>
  );
};

export type NavigationItemType = {
  name: string;
  iconHref: string;
  route?: string;
};

const Item = ({ name, iconHref, route }: NavigationItemType) => {
  return (
    <li className="nav__item">
      <button className="nav__btn">
        <svg className="nav__icon">
          <use href={`${icons}#${iconHref}`}></use>
        </svg>
        <span>{name}</span>
      </button>
    </li>
  );
};

Navigation.Item = Item;

export default Navigation;
