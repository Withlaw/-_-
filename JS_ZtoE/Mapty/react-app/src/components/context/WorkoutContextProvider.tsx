import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Cycling, ICyclingProps, IRunningProps, Running } from '../../state';

const dummyRunning = new Running({
  distance: 5.2,
  duration: 4.6,
  cadence: 178,
  position: [37.58815872848493, 127.06233027778825],
});
const dummyCycling = new Cycling({
  distance: 5.2,
  duration: 4.6,
  elevationGain: 223,
  position: [37.58815872848493, 127.06233027778825],
});
const dummyWorkouts = [dummyRunning, dummyCycling];

type RunningType = typeof dummyRunning;

export type WorkoutType = typeof dummyRunning | typeof dummyCycling;

// context
type WorkoutContextType = {
  workouts: WorkoutType[];
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutType[]>>;
};

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const useWorkoutContext = () => {
  const value = useContext(WorkoutContext);
  if (value === null)
    throw new Error(
      'useWorkoutContext has to be used within <WorkoutContext.Provider>'
    );
  return value;
};

const WorkoutContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const isFirstRendering = useRef(true);

  useEffect(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    window.localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]); // set data to local storage

  useEffect(() => {
    isFirstRendering.current = true; // set item이 첫 렌더링에만 실행되기 위해 이 둘의 이펙트 훅 순서는 항상 set이 get보다 앞서야함. 안그러면 get 이펙트에서 state를 업데이트 하면서 재평가가 일어나 set도 실행됨.

    const data = window.localStorage.getItem('workouts');
    if (data === null) setWorkouts([]);
    else setWorkouts(JSON.parse(data));
  }, []); // get data from local storage

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
