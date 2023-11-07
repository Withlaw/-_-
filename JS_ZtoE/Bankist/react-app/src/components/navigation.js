import classes from "./navigation.module.css";
import logo from "../assets/img/logo.png";

import NavItems from "./navigation-items";

function Nav() {
  return (
    <nav className={classes.nav}>
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
