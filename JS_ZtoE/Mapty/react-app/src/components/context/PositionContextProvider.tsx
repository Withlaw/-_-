import { createContext, useContext, useState } from 'react';

export type PositionType = [number, number] | null;
type PositionContextType = {
  position: PositionType;
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
};
const PositionContext = createContext<PositionContextType | null>(null);
export const usePositionContext = () => {
  const value = useContext(PositionContext);
  if (value === null)
    throw new Error(
      'useWorkoutContext has to be used within <WorkoutContext.Provider>'
    );
  return value;
};

const PositionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useState<PositionType>(null);

  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionContextProvider;
