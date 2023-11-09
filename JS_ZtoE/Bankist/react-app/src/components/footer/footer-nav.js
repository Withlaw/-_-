import classes from "./footer-nav.module.css";

function FooterNav() {
  return (
    <ul className={classes.nav}>
      <li className={classes.item}>
        <a className={classes.link} href="">
          About
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Pricing
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Terms of Use
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Privacy Policy
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Careers
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Blog
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href="">
          Contact Us
        </a>
      </li>
    </ul>
  );
}

export default FooterNav;
