import { LatLngExpression } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { FormDataType } from '../workouts';

interface MyMarkerProps {
  data: FormDataType;
}

const MyMarker = ({ data }: MyMarkerProps) => {
  console.log(data);
  return (
    <Marker position={data.positions as [number, number]}>
      <Popup
        maxWidth={250}
        minWidth={100}
        autoClose={false}
        closeOnClick={false}
        className={`${data.type.toLowerCase()}-popup`}
      >
        {`${data.type === 'Running' ? '🏃‍♂️' : '🚴‍♀️'} ${data.type} on ${
          data.date
        }`}
      </Popup>
    </Marker>
  );
};

export default MyMarker;
