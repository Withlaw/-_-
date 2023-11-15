import { Marker, Popup } from 'react-leaflet';
import { useWorkoutContext } from '../context/WorkoutContextProvider';

const MyMarker = () => {
  const { workouts } = useWorkoutContext();
  return (
    <>
      {workouts.map((workout, idx) => (
        <Marker key={`item__${idx}`} position={workout.position}>
          <Popup
            maxWidth={250}
            minWidth={100}
            autoClose={false}
            closeOnClick={false}
            className={`${workout.type.toLowerCase()}-popup`}
          >
            {workout.type === 'Running' && '🏃‍♂️'}
            {workout.type === 'Cycling' && '🚴‍♀️'}
            {` ${workout.type} on ${workout.date}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MyMarker;
