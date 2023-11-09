import { useMemo, useState } from "react";
import useObserve from "../../hooks/useObserve";
import classes from "./section1-features.module.css";
// import iconMonitor from "../../assets/img/icons.svg#icon-monitor";
// import { ReactComponent as MonitorSVG } from "../../assets/img/svg/moi.svg";

// import MonitorSVG from "../../assets/img/svg/monitor";

import digitalLazyImg from "../../assets/img/digital-lazy.jpg";
import digitalImg from "../../assets/img/digital.jpg";
import growLazyImg from "../../assets/img/grow-lazy.jpg";
import growImg from "../../assets/img/grow.jpg";
import cardLazyImg from "../../assets/img/card-lazy.jpg";
import cardImg from "../../assets/img/card.jpg";

function Section1Features() {
  const [isLazy, setIsLazy] = useState({
    digital: true,
    grow: true,
    card: true,
  });
  const [isLoading, setIsLoading] = useState({
    digital: true,
    grow: true,
    card: true,
  });
  // const fn = useMemo(
  //   () => (entry, observer) => {
  //     if (!entry.isIntersecting) return;

  //     const { src } = entry.target.dataset;
  //     if (src === "digital")
  //       setIsLazy(prev => {
  //         return { ...prev, digital: false };
  //       });
  //     if (src === "grow")
  //       setIsLazy(prev => {
  //         return { ...prev, grow: false };
  //       });
  //     if (src === "card")
  //       setIsLazy(prev => {
  //         return { ...prev, card: false };
  //       });
  //     observer.unobserve(entry.target);
  //   },
  //   []
  // );
  // const op = useMemo(() => {
  //   return {
  //     root: null,
  //     threshold: 0,
  //     rootMargin: "200px",
  //   };
  // }, []);

  const { observerTarget } = useObserve(
    (entry, observer) => {
      if (!entry.isIntersecting) return;

      const { src } = entry.target.dataset;
      if (src === "digital")
        setIsLazy(prev => {
          return { ...prev, digital: false };
        });
      if (src === "grow")
        setIsLazy(prev => {
          return { ...prev, grow: false };
        });
      if (src === "card")
        setIsLazy(prev => {
          return { ...prev, card: false };
        });
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "200px",
    },
    []
  );
  const handleLoadImg = e => {
    if (isLazy.digital && isLazy.grow && isLazy.card) return;

    const { src } = e.currentTarget.dataset;
    if (src === "digital")
      setIsLoading(prev => {
        return { ...prev, digital: false };
      });
    if (src === "grow")
      setIsLoading(prev => {
        return { ...prev, grow: false };
      });
    if (src === "card")
      setIsLoading(prev => {
        return { ...prev, card: false };
      });
  };
  return (
    <div className={classes.features}>
      <img
        src={isLazy["digital"] ? digitalLazyImg : digitalImg}
        data-src="digital"
        alt="Computer"
        className={`${classes.img} ${
          isLoading["digital"] ? classes["lazy-img"] : ""
        }`}
        ref={el => (observerTarget.current[0] = el)}
        onLoad={handleLoadImg}
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
        src={isLazy["grow"] ? growLazyImg : growImg}
        data-src="grow"
        alt="Plant"
        className={`${classes.img} ${
          isLoading["grow"] ? classes["lazy-img"] : ""
        }`}
        ref={el => (observerTarget.current[1] = el)}
        onLoad={handleLoadImg}
      />

      <img
        src={isLazy["card"] ? cardLazyImg : cardImg}
        data-src="card"
        alt="Credit card"
        className={`${classes.img} ${
          isLoading["card"] ? classes["lazy-img"] : ""
        }`}
        ref={el => (observerTarget.current[2] = el)}
        onLoad={handleLoadImg}
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
