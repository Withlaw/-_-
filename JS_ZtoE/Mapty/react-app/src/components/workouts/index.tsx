import { useEffect, useMemo, useState } from 'react';
import Form from '../form';
import Workout from './Workout';
import { CoordsType } from '../map';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import NotItem from '../layout/NotItem';
import { usePositionContext } from '../context/PositionContextProvider';

type Value = {
  label: string;
  placeholder: string;
};

export type FormContentsType = {
  Running: Value[];
  Cycling: Value[];
};

export type FormDataType = {
  type: keyof FormContentsType;
  id: number;
  value: number[];
  date: string;
  positions?: CoordsType;
};

// const dummyFormData: FormDataType[] = [
//   {
//     type: 'Running',
//     id: 1243145213,
//     value: [5.2, 4.6, 178],
//     date: 'May 1',
//     positions: [37.58815872848493, 127.06233027778825],
//   },
//   {
//     type: 'Cycling',
//     id: 1243140013,
//     value: [27, 16, 223],
//     date: 'July 2',
//     positions: [37.59091171093732, 127.06396058344464],
//   },
// ];

const Workouts = () => {
  // const dummyFormData: FormTypeList | [] = [];
  // const [isFormActive, setIsFormActive] = useState(true);
  // const [formData, setFormData] = useState<FormDataType[]>(dummyFormData);
  const { workouts, setWorkouts } = useWorkoutContext();

  const isData = workouts.length !== 0;

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
      {/* {isFormActive && (
        <Form
          isFormActive={isFormActive}
          formList={formContents}
          setFormData={setFormData}
          setIsFormActive={setIsFormActive}
        />
      )} */}

      <Form formContents={formContents} setWorkouts={setWorkouts} />
      {isData ? <Workout workouts={workouts} /> : <NotItem />}
    </ul>
  );
};

export default Workouts;
