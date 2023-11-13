import { LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';

interface MyMarkerProps {
  position: LatLngExpression;
}

const MyMarker = ({ position }: MyMarkerProps) => {
  return <Marker position={position}></Marker>;
};

export default MyMarker;
