import { LatLngExpression } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface MyMarkerProps {
  position: LatLngExpression;
}

const MyMarker = ({ position }: MyMarkerProps) => {
  return (
    <Marker position={position}>
      <Popup
        maxWidth={250}
        minWidth={100}
        autoClose={false}
        closeOnClick={false}
        className={`${''}-popup`}
      >
        hello
      </Popup>
    </Marker>
  );
};

export default MyMarker;
