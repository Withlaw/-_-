import { useContext, useState } from "react";
import classes from "./navigation-item.module.css";
import OpenAccount from "./open-account";
import { ScrollContext } from "../../context/scrollContext";

function NavItem({ textContext, isHovered, setIsHovered }) {
  const [isTarget, setIsTarget] = useState(false);
  const { handleScrolling, navRef } = useContext(ScrollContext);
  const handleNavScroll = e => {
    e.preventDefault();

    if (textContext === "Features") handleScrolling(navRef.current[0]);
    if (textContext === "Operations") handleScrolling(navRef.current[1]);
    if (textContext === "Testimonials") handleScrolling(navRef.current[2]);
  };

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
      onClick={handleNavScroll}
    >
      <a className={classes.link} href="">
        {textContext}
      </a>
    </li>
  );
}

export default NavItem;
