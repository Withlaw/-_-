import { useState } from "react";
import classes from "./section2-operations.module.css";

function Section2Operations() {
  const [activeNum, setActiveNum] = useState(0);
  const handleClickTab = (e, i) => {
    setActiveNum(i);
  };
  return (
    <div className={classes.operations}>
      <div className={classes["tab-container"]}>
        {TabContent.map((el, idx) => (
          <button
            key={idx}
            className={`btn ${classes.tab} ${classes[`tab-${idx + 1}`]} ${
              activeNum === idx ? classes[`tab-active`] : ""
            }`}
            data-tab={idx}
            onClick={e => handleClickTab(e, idx)}
          >
            <span>{`${idx < 10 ? "0" : ""}${idx + 1}`}</span>
            {el.title}
          </button>
        ))}
      </div>
      {TabContent.map((el, idx) => (
        <div
          key={idx}
          className={`${classes.content} operations__content--1 ${
            activeNum === idx ? classes[`content-active`] : ""
          }`}
        >
          <div className={`${classes.icon} ${classes[`icon-${idx + 1}`]}`}>
            {/* <svg>
            <use xlink:href={img/icons.svg#icon-upload}></use>
          </svg> */}
          </div>
          <h5 className={classes.header}>{el.header}</h5>
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  );
}

const TabContent = [
  {
    title: "Instant Transfers",
    header: "Tranfser money to anyone, instantly! No fees, no BS.",
    text: "       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ualiquip ex ea commodo consequat.",
  },
  {
    title: "Instant Loans",
    header: "Buy a home or make your dreams come true, with instant loans.",
    text: " Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id estlaborum.",
  },
  {
    title: "Instant Closing",
    header: "No longer need your account? No problem! Close it instantly.",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficia deserunt mollit anim id est laborum. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.",
  },
];
export default Section2Operations;
