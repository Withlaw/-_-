import classes from "./section2-operations.module.css";

function Section2Operations() {
  return (
    <div className={classes.operations}>
      <div className={classes["tab-container"]}>
        <button
          className={`btn ${classes.tab} ${classes[`tab-1`]} ${
            classes[`tab-active`]
          }`}
          data-tab="1"
        >
          <span>01</span>Instant Transfers
        </button>
        <button
          className={`btn ${classes.tab} ${classes[`tab-2`]}`}
          data-tab="2"
        >
          <span>02</span>Instant Loans
        </button>
        <button
          className={`btn ${classes.tab} ${classes[`tab-3`]}`}
          data-tab="3"
        >
          <span>03</span>Instant Closing
        </button>
      </div>
      <div
        className={`${classes.content} operations__content--1 ${
          classes[`content-active`]
        }`}
      >
        <div className={`${classes.icon} ${classes[`icon-1`]}`}>
          {/* <svg>
            <use xlink:href={img/icons.svg#icon-upload}></use>
          </svg> */}
        </div>
        <h5 className={classes.header}>
          Tranfser money to anyone, instantly! No fees, no BS.
        </h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className={`${classes.content} operations__content--2`}>
        <div className={`${classes.icon} ${classes[`icon-2`]}`}>
          {/* <svg>
            <use xlink:href={img/icons.svg#icon-home}></use>
          </svg> */}
        </div>
        <h5 className={classes.header}>
          Buy a home or make your dreams come true, with instant loans.
        </h5>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
      <div className={`${classes.content} operations__content--3`}>
        <div className={`${classes.icon} ${classes[`icon-3`]}`}>
          {/* <svg>
            <use xlink:href={img/icons.svg#icon-user-x}></use>
          </svg> */}
        </div>
        <h5 className={classes.header}>
          No longer need your account? No problem! Close it instantly.
        </h5>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    </div>
  );
}

export default Section2Operations;
