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

// export type FormDataType = (string | number | Date)[][];
export type FormDataType = [keyof FormTypeList, number, number, number, Date][];

const dummyFormList: FormTypeList = {
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
const dummyFormData: FormDataType = [
  ['Running', 5.2, 4.6, 178, new Date()],
  ['Cycling', 27, 16, 223, new Date()],
];

const Workouts = () => {
  // const dummyFormData: FormTypeList | [] = [];
  const [isFormActive, setIsFormActive] = useState(true);
  const [formData, setFormData] = useState<FormDataType>(dummyFormData);

  return (
    <ul className="workouts">
      {isFormActive && (
        <Form
          formList={dummyFormList}
          setFormData={setFormData}
          setIsFormActive={setIsFormActive}
        />
      )}
      <Workout formData={formData} />
    </ul>
  );
};

export default Workouts;
