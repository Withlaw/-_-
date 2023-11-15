import { Cycling, Running } from '../../state';
import { WorkoutType } from '../context/WorkoutContextProvider';

type WorkoutProps = {
  workouts: WorkoutType[];
};

const Workout = ({ workouts }: WorkoutProps) => {
  return (
    <>
      {workouts.map(data => {
        // const isInstanceofRunning = data instanceof Running;
        // const isInstanceofCycling = data instanceof Cycling;
        return (
          <li
            key={data.id}
            className={`workout workout--${data.type.toLowerCase()}`}
            data-id={data.id}
          >
            <h2 className="workout__title">{`${data.type} on ${data.date}`}</h2>
            <div className="workout__details">
              <span className="workout__icon">
                {/* {data instanceof Running && '🏃‍♂️'}
                {data instanceof Cycling && '🚴‍♀️'} */}
                {data.type === 'Running' && '🏃‍♂️'}
                {data.type === 'Cycling' && '🚴‍♀️'}
              </span>
              <span className="workout__value">{data.distance}</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⏱</span>
              <span className="workout__value">{data.duration}</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">
                {/* {data instanceof Running && data.pace}
                {data instanceof Cycling && data.speed} */}
                {data.type === 'Running' && data.pace}
                {data.type === 'Cycling' && data.speed}
              </span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">
                {/* {data instanceof Running && '🦶🏼'}
                {data instanceof Cycling && '⛰'} */}
                {data.type === 'Running' && '🦶🏼'}
                {data.type === 'Cycling' && '⛰'}
              </span>
              <span className="workout__value">
                {/* {data instanceof Running && data.cadence}
                {data instanceof Cycling && data.elevationGain} */}
                {data.type === 'Running' && data.cadence}
                {data.type === 'Cycling' && data.elevationGain}
              </span>
              <span className="workout__unit">spm</span>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Workout;
