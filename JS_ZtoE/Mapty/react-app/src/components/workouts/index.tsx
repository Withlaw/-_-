import { useMemo } from 'react';
import Form from '../form';
import Workout from './Workout';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import NotItem from '../layout/NotItem';

type Value = {
  label: string;
  placeholder: string;
};

export type FormContentsType = {
  Running: Value[];
  Cycling: Value[];
};

const Workouts = () => {
  const { workouts, setWorkouts } = useWorkoutContext();

  const isData = workouts.length !== 0; // 파생된 state

  const formContents: FormContentsType = useMemo(() => {
    return {
      Running: [
        { label: 'Distance', placeholder: 'km' },
        { label: 'Duration', placeholder: 'min' },
        { label: 'Cadence', placeholder: 'step/min' },
      ],
      Cycling: [
        { label: 'Distance', placeholder: 'km' },
        { label: 'Duration', placeholder: 'min' },
        { label: 'Elevation', placeholder: 'meters' },
      ],
      // Swimming: [
      //   { label: 'Distance', placeholder: 'km' },
      //   { label: 'Duration', placeholder: 'min' },
      //   { label: 'dfslsdf', placeholder: 'cm' },
      // ],
    };
  }, []);

  return (
    <ul className="workouts">
      <Form formContents={formContents} setWorkouts={setWorkouts} />
      {isData ? <Workout workouts={workouts} /> : <NotItem />}
    </ul>
  );
};

export default Workouts;
