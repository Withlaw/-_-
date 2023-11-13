import { useMemo } from 'react';
import { FormDataType } from '.';
import NotItem from '../layout/NotItem';

type WorkoutProps = {
  formData: FormDataType;
};

const Workout = ({ formData }: WorkoutProps) => {
  const isData = formData.length !== 0;
  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );
  return (
    <>
      {isData ? (
        formData.map((data, idx) => (
          <li
            key={`item-${idx}`}
            // className={`workout workout--${
            //   typeof data[0] === 'string' && data[0].toLowerCase()
            // }`}
            className={`workout workout--${data[0].toLowerCase()}`}
            data-id={data[4].getTime().toString().slice(-10)}
          >
            <h2 className="workout__title">{`${data[0]} on ${
              months[data[4].getMonth()]
            } ${data[4].getDate()}`}</h2>
            <div className="workout__details">
              <span className="workout__icon">🏃‍♂️</span>
              <span className="workout__value">{data[1]}</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⏱</span>
              <span className="workout__value">{data[2]}</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">
                {(data[1] / data[2]).toFixed(1)}
              </span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">🦶🏼</span>
              <span className="workout__value">{data[3]}</span>
              <span className="workout__unit">spm</span>
            </div>
          </li>
        ))
      ) : (
        <NotItem />
      )}
    </>
  );
};

export default Workout;
