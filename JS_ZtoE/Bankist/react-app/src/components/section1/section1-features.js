// import iconMonitor from "../../assets/img/icons.svg#icon-monitor";
// import { ReactComponent as MonitorSVG } from "../../assets/img/svg/moi.svg";

// import MonitorSVG from "../../assets/img/svg/monitor";
import classes from "./section1-features.module.css";
import digitalLazyImg from "../../assets/img/digital-lazy.jpg";
import growLazyImg from "../../assets/img/grow-lazy.jpg";
import cardLazyImg from "../../assets/img/card-lazy.jpg";

function Section1Features() {
  return (
    <div className={classes.features}>
      <img
        src={digitalLazyImg}
        data-src="img/digital.jpg"
        alt="Computer"
        // className={`${classes.img} ${classes.lazy}`}
        className={`${classes.img} ${classes["lazy-img"]}`}
      />
      <div className={classes.feature}>
        <div className={classes.icon}>
          {/* <svg>
            <use xlinkhref={iconMonitor}></use>
          </svg> */}
          {/* <MonitorSVG /> */}
        </div>
        <h5 className={classes.header}>100% digital bank</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
          sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
          debitis ducimus.
        </p>
      </div>

      <div className={classes.feature}>
        <div className={classes.icon}>
          {/* <svg>
            <use xlinkhref="img/icons.svg#icon-trending-up"></use>
          </svg> */}
        </div>
        <h5 className={classes.header}>Watch your money grow</h5>
        <p>
          Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
          inventore ab? Nulla incidunt eius numquam sequi iste pariatur
          quibusdam!
        </p>
      </div>
      <img
        src={growLazyImg}
        data-src="img/grow.jpg"
        alt="Plant"
        className={`${classes.img} ${classes["lazy-img"]}`}
      />

      <img
        src={cardLazyImg}
        data-src="img/card.jpg"
        alt="Credit card"
        className={`${classes.img} ${classes["lazy-img"]}`}
      />
      <div className={classes.feature}>
        <div className={classes.icon}>
          {/* <svg>
            <use xlinkhref="img/icons.svg#icon-credit-card"></use>
          </svg> */}
        </div>
        <h5 className={classes.header}>Free debit card included</h5>
        <p>
          Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
          eveniet consequatur odit quam quos possimus assumenda dicta fuga
          inventore ab.
        </p>
      </div>
    </div>
  );
}

export default Section1Features;
