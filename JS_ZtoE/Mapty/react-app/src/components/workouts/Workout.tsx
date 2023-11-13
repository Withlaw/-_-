import { FormDataType } from '.';
import NotItem from '../layout/NotItem';

type WorkoutProps = {
  formData: FormDataType[];
};

const Workout = ({ formData }: WorkoutProps) => {
  const isData = formData.length !== 0;
  return (
    <>
      {isData ? (
        formData.map((data, idx) => (
          <li
            key={`item-${idx}`}
            className={`workout workout--${data.type.toLowerCase()}`}
            data-id={data.id}
          >
            <h2 className="workout__title">{`${data.type} on ${data.date}`}</h2>
            <div className="workout__details">
              <span className="workout__icon">🏃‍♂️</span>
              <span className="workout__value">{data.value[0]}</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⏱</span>
              <span className="workout__value">{data.value[1]}</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">
                {(data.value[1] / data.value[2]).toFixed(1)}
              </span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">🦶🏼</span>
              <span className="workout__value">{data.value[2]}</span>
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
