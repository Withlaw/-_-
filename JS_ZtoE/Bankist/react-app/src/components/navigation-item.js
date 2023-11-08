import { useState } from "react";
import classes from "./navigation-item.module.css";
import OpenAccount from "./open-account";

function NavItem({ textContext, isHovered, setIsHovered }) {
  const [isTarget, setIsTarget] = useState(false);

  const handleMouseoverToggle = e => {
    setIsHovered(prev => !prev);
    setIsTarget(prev => !prev);
  };

  return textContext === "Open account" ? (
    <OpenAccount
      isHovered={isHovered}
      isTarget={isTarget}
      handleMouseoverToggle={handleMouseoverToggle}
    />
  ) : (
    <li
      className={`${classes.item} ${
        isHovered && !isTarget ? classes.hover : ""
      }`}
      onMouseOver={handleMouseoverToggle}
      onMouseOut={handleMouseoverToggle}
    >
      <a className={classes.link} href="">
        {textContext}
      </a>
    </li>
  );
}

export default NavItem;
