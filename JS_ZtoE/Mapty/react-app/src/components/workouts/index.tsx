import { useState } from 'react';
import Form from '../Form';
import Workout from './Workout';

const Workouts = () => {
  const [isFormActive, setIsFormActive] = useState(true);
  return (
    <ul className="workouts">
      {isFormActive && <Form />}
      <Workout />
    </ul>
  );
};

export default Workouts;
