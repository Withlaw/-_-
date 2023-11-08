import { useState } from "react";
import classes from "./navigation-items.module.css";
import NavItem from "./navigation-item";

function NavItems() {
  const navList = ["Features", "Operations", "Testimonials", "Open account"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ul className={classes.links}>
      {navList.map(el => (
        <NavItem key={el} isHovered={isHovered} setIsHovered={setIsHovered}>
          {el}
        </NavItem>
      ))}
    </ul>
  );
}

export default NavItems;
