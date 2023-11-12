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

export type FormDataType = (string | number)[][];

const Workouts = () => {
  // const dummyFormData: FormTypeList | [] = [];
  const dummyFormData = [
    ['Running', 5.2, 4.6, 178],
    ['Cycling', 27, 16, 223],
  ];
  const [isFormActive, setIsFormActive] = useState(true);
  const [formData, setFormData] = useState<FormDataType>(dummyFormData);

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
      <Workout formData={formData} />
    </ul>
  );
};

export default Workouts;
