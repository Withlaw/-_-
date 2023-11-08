import classes from "./header-title.module.css";
import hero from "../assets/img/hero.png";

function HeaderTitle() {
  return (
    <div class={classes.title}>
      <h1>
        When
        <span class={classes.highlight}>banking</span>
        meets
        <br />
        <span class={classes.highlight}>minimalist</span>
      </h1>
      <h4>A simpler banking experience for a simpler life.</h4>
      <button class={classes.text}>Learn more &darr;</button>
      <img src={hero} class={classes.img} alt="Minimalist bank items" />
    </div>
  );
}

export default HeaderTitle;
