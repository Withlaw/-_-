import React, { useState } from 'react';
// import logo from "./logo.svg";
import './globals.css';
import Workouts from './components/workouts';
import Copyright from './components/footer/Copyright';
import Map from './components/map';

import logo from './assets/logo.png';
import LoadingSpinner from './components/layout/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Workouts />
          </>
        )}
        <Copyright />
      </div>
      <Map />
    </>
  );
}

export default App;
