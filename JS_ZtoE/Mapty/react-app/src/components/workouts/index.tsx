import { useMemo, useState } from 'react';
import Form from '../Form';
import Workout from './Workout';

type Value = {
  label: string;
  placeholder: string;
};

export type FormTypeList = {
  Running: Value[];
  Cycling: Value[];
};

export type FormStateType = (string | number)[];

const Workouts = () => {
  const [isFormActive, setIsFormActive] = useState(true);
  const [formData, setFormData] = useState<FormStateType>([]);

  console.log('form: ', formData);
  const formList = useMemo(() => {
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
      {isFormActive && (
        <Form
          formList={formList}
          setFormData={setFormData}
          setIsFormActive={setIsFormActive}
        />
      )}
      <Workout />
    </ul>
  );
};

export default Workouts;
