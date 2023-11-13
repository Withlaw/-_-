import { useEffect, useMemo, useState } from 'react';
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
// export type FormValueType = ;

export type FormDataType = {
  type: keyof FormTypeList;
  id: number;
  value: number[];
  date: string;
};

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
const dummyFormData: FormDataType[] = [
  {
    type: 'Running',
    id: 1243145213,
    value: [5.2, 4.6, 178],
    date: 'May 1',
  },
  {
    type: 'Cycling',
    id: 1243140013,
    value: [27, 16, 223],
    date: 'July 2',
  },
];

const Workouts = () => {
  // const dummyFormData: FormTypeList | [] = [];
  const [isFormActive, setIsFormActive] = useState(true);
  const [formData, setFormData] = useState<FormDataType[]>(dummyFormData);

  // useEffect(() => {
  //   const data = window.localStorage.getItem('workouts');
  //   if (!data) return;
  //   setFormData(JSON.parse(data));
  // }, []); // get data from local storage

  // useEffect(() => {
  //   if (!isFormActive) return;
  //   window.localStorage.setItem('workouts', JSON.stringify(formData));
  // }, [formData]); // set data to local storage

  return (
    <ul className="workouts">
      {/* {isFormActive && (
        <Form
          isFormActive={isFormActive}
          formList={dummyFormList}
          setFormData={setFormData}
          setIsFormActive={setIsFormActive}
        />
      )} */}
      <Form
        isFormActive={isFormActive}
        formList={dummyFormList}
        setFormData={setFormData}
        setIsFormActive={setIsFormActive}
      />
      <Workout formData={formData} />
      {/* <button
        onClick={() => {
          setIsFormActive(prev => !prev);
        }}
      >
        form
      </button> */}
    </ul>
  );
};

export default Workouts;
