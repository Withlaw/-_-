import { useState } from "react";
import classes from "./navigation-item.module.css";

function NavItem({ children, isHovered, setIsHovered }) {
  const [isTarget, setIsTarget] = useState(false);
  const handleMouseoverToggle = e => {
    setIsHovered(prev => !prev);
    setIsTarget(prev => !prev);
  };

  return (
    <li
      className={`${classes.item} ${
        isHovered && !isTarget ? classes.hover : ""
      }`}
      onMouseOver={handleMouseoverToggle}
      onMouseOut={handleMouseoverToggle}
    >
      <a
        className={`${classes.link} ${
          children === "Open account" ? classes.button : ""
        }`}
        href=""
      >
        {children}
      </a>
    </li>
  );
}

export default NavItem;
