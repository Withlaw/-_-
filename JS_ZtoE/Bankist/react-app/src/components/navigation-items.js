import classes from "./navigation-items.module.css";

function NavItems() {
  const navList = ["Features", "Operations", "Testimonials"];

  return (
    <ul className={classes.links}>
      {navList.map(el => (
        <li key={el} className={classes.item}>
          <a className={classes.link} href="#">
            {el}
          </a>
        </li>
      ))}
      <li className={classes.item}>
        <a className={`${classes.link} ${classes.button}`} href="#">
          Open account
        </a>
      </li>
    </ul>
  );
}

export default NavItems;
