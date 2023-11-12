import React, { useEffect, useState } from 'react';
// import logo from "./logo.svg";
import './globals.css';
import Workouts from './components/workouts';
import Copyright from './components/footer/Copyright';
import Map, { ICoords } from './components/map';

import logo from './assets/logo.png';
import LoadingSpinner from './components/layout/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coords, serCoords] = useState<ICoords | null>(null); // success랑 함께 리듀서로 처리해보기

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setIsLoading(false);
        setIsSuccess(true);
        serCoords({ latitude, longitude });
      },
      error => {
        setIsLoading(false);
        setIsSuccess(false);
        serCoords(null);
        alert('Could not get your position');
      }
    );
  }, []);
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
      {isSuccess ? <Map coords={coords} /> : <div> sorry ...</div>}
    </>
  );
}

export default App;
