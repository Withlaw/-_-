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
import CenterContextProvider from './components/context/CenterContextProvider';
import LocalDataRepository from './components/repository/LocalDataRepository';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [coords, setCoords] = useState<CoordsType | null>(null); // success랑 함께 리듀서로 처리해보기

  useEffect(() => {
    // get current location coordinates
    navigator.geolocation?.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setIsLoading(false);
        // setIsSuccess(true);
        setCoords([latitude, longitude]);
      },
      error => {
        setIsLoading(false);
        // setIsSuccess(false);
        setCoords(null);
        alert('Could not get your position');
      }
    );
  }, []);
  return (
    <WorkoutContextProvider dataRepository={LocalDataRepository}>
      <PositionContextProvider>
        <CenterContextProvider>
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
        </CenterContextProvider>
      </PositionContextProvider>
    </WorkoutContextProvider>
  );
}

export default App;
