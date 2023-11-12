import React, { useEffect, useState } from 'react';
import './globals.css';

// import logo from "./logo.svg";
import Workouts from './components/workouts';
import Copyright from './components/footer/Copyright';
import Map, { CoordsType } from './components/map';

import logo from './assets/logo.png';
import LoadingSpinner from './components/layout/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [coords, serCoords] = useState<CoordsType | null>([
    37.5866169, 127.0607943,
  ]); // success랑 함께 리듀서로 처리해보기

  // useEffect(() => {
  //   navigator.geolocation?.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setIsLoading(false);
  //       // setIsSuccess(true);
  //       serCoords([latitude, longitude]);
  //     },
  //     error => {
  //       setIsLoading(false);
  //       // setIsSuccess(false);
  //       serCoords(null);
  //       alert('Could not get your position');
  //     }
  //   );
  // }, []);
  return (
    <>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        {isLoading ? <LoadingSpinner /> : <Workouts />}
        <Copyright />
      </div>
      {/* {coords !== null ? <Map coords={coords} /> : <div> sorry ...</div>} */}
    </>
  );
}

export default App;
