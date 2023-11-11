import React from "react";
// import logo from "./logo.svg";
import "./globals.css";
import Workouts from "./components/workouts";
import Copyright from "./components/footer/Copyright";
import Map from "./components/map";

import logo from "./assets/logo.png";

function App() {
  return (
    <>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        <Workouts />
        <Copyright />
      </div>
      <Map />
    </>
  );
}

export default App;
