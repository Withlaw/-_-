import { MapOptions } from 'leaflet';
import { createContext, useContext, useState } from 'react';

type CenterType = MapOptions['center'];

type CenterContextType = {
  center: CenterType;
  setCenter: React.Dispatch<React.SetStateAction<CenterType>>;
};
const CenterContext = createContext<CenterContextType | null>(null);
export const useCenterContext = () => {
  const value = useContext(CenterContext);
  if (value === null)
    throw new Error(
      'useCenterContext has to be used within <WorkoutContext.Provider>'
    );
  return value;
};

const CenterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [center, setCenter] = useState<CenterType>(undefined);

  return (
    <CenterContext.Provider value={{ center, setCenter }}>
      {children}
    </CenterContext.Provider>
  );
};

export default CenterContextProvider;
