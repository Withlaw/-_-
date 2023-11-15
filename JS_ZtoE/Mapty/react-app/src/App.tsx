import React, { useEffect, useState } from 'react';
import './globals.css';

// import logo from "./logo.svg";
import Workouts from './components/workouts';
import Copyright from './components/footer/Copyright';
import Map, { CoordsType } from './components/map';

import logo from './assets/logo.png';
import LoadingSpinner from './components/layout/LoadingSpinner';
import NotItem from './components/layout/NotItem';
import WorkoutContextProvider from './components/context/WorkoutContextProvider';
import PositionContextProvider from './components/context/PositionContextProvider';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [coords, serCoords] = useState<CoordsType | null>(null); // success랑 함께 리듀서로 처리해보기

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setIsLoading(false);
        // setIsSuccess(true);
        serCoords([latitude, longitude]);
      },
      error => {
        setIsLoading(false);
        // setIsSuccess(false);
        serCoords(null);
        alert('Could not get your position');
      }
    );
  }, []);
  return (
    <WorkoutContextProvider>
      <PositionContextProvider>
        <div className="sidebar">
          <img className="logo" src={logo} alt="Logo" />
          {isLoading ? <LoadingSpinner /> : <Workouts />}
          <Copyright />
        </div>
        {coords !== null ? (
          <Map coords={coords} />
        ) : (
          <NotItem message="No Map" />
        )}
      </PositionContextProvider>
    </WorkoutContextProvider>
  );
}

export default App;
