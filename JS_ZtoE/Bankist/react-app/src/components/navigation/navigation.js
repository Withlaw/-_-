import classes from "./navigation.module.css";
import logo from "../../assets/img/logo.png";

import NavItems from "./navigation-items";
import { useIntersectObsContext } from "../../context/intersectObsContext";

function Nav() {
  const { isIntersect, navRef } = useIntersectObsContext();
  return (
    <nav
      className={`${classes.nav} ${isIntersect ? classes.sticky : ""}`}
      ref={navRef}
    >
      <img
        src={logo}
        alt="Bankist logo"
        className={classes.logo}
        data-version-number="3.0"
      />
      <NavItems />
    </nav>
  );
}

export default Nav;
