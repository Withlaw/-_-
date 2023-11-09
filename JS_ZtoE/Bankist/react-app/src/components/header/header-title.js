import classes from "./header-title.module.css";
import hero from "../../assets/img/hero.png";
import { useContext } from "react";
import { ScrollContext } from "../../context/scrollContext";
import { useIntersectObsContext } from "../../context/intersectObsContext";

function HeaderTitle() {
  const { navRef, handleScrolling } = useContext(ScrollContext);
  const { obsRef } = useIntersectObsContext();

  const handleBtnClick = e => {
    handleScrolling(navRef.current[0]);
  };
  return (
    <div className={classes.title} ref={el => (obsRef.current[1] = el)}>
      <h1>
        When
        <span className={classes.highlight}>banking</span>
        meets
        <br />
        <span className={classes.highlight}>minimalist</span>
      </h1>
      <h4>A simpler banking experience for a simpler life.</h4>
      <button className={classes.text} onClick={handleBtnClick}>
        Learn more &darr;
      </button>
      <img src={hero} className={classes.img} alt="Minimalist bank items" />
    </div>
  );
}

export default HeaderTitle;
