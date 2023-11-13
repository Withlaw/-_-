import { useMemo } from 'react';
import { FormDataType } from '.';
import NotItem from '../layout/NotItem';

type WorkoutProps = {
  formData: FormDataType;
};

/*
[...기존 데이터, 
  {
    title: `${type} on April 14`,
    value: 5.2,
    unit: 'km';
  
}]
*/

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
              <span className="workout__value">00</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">{data[2]}</span>
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
      {/* <li className="workout workout--running" data-id="1234567890">
        <h2 className="workout__title">Running on April 14</h2>
        <div className="workout__details">
          <span className="workout__icon">🏃‍♂️</span>
          <span className="workout__value">5.2</span>
          <span className="workout__unit">km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">24</span>
          <span className="workout__unit">min</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⚡️</span>
          <span className="workout__value">4.6</span>
          <span className="workout__unit">min/km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">🦶🏼</span>
          <span className="workout__value">178</span>
          <span className="workout__unit">spm</span>
        </div>
      </li>

      <li className="workout workout--cycling" data-id="1234567891">
        <h2 className="workout__title">Cycling on April 5</h2>
        <div className="workout__details">
          <span className="workout__icon">🚴‍♀️</span>
          <span className="workout__value">27</span>
          <span className="workout__unit">km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">95</span>
          <span className="workout__unit">min</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⚡️</span>
          <span className="workout__value">16</span>
          <span className="workout__unit">km/h</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⛰</span>
          <span className="workout__value">223</span>
          <span className="workout__unit">m</span>
        </div>
      </li> */}
    </>
  );
};

export default Workout;
