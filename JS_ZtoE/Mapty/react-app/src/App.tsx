import React, { useEffect, useState } from 'react';
import './globals.css';

// import logo from "./logo.svg";
import { CoordsType } from './components/map';
import WorkoutContextProvider from './components/context/WorkoutContextProvider';
import PositionContextProvider from './components/context/PositionContextProvider';
import CenterContextProvider from './components/context/CenterContextProvider';
import LocalDataRepository from './components/repository/LocalDataRepository';
import Layout from './components/layout';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState<CoordsType | null>(null);

  useEffect(() => {
    // get current location coordinates
    navigator.geolocation?.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setIsLoading(false);
        setCoords([latitude, longitude]);
      },
      error => {
        setIsLoading(false);
        setCoords(null);
        alert('Could not get your position');
      }
    );
  }, []);
  return (
    <WorkoutContextProvider dataRepository={LocalDataRepository}>
      <PositionContextProvider>
        <CenterContextProvider>
          <Layout isLoading={isLoading} coords={coords} />
        </CenterContextProvider>
      </PositionContextProvider>
    </WorkoutContextProvider>
  );
}

export default App;
