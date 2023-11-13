import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import MyMap from './MyMap';

import L, { LatLngExpression } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MyMarker from './MyMarker';
import { FormDataType } from '../workouts';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [13, 41],
  popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

export type CoordsType = [number, number];

interface CoordsProps {
  coords: CoordsType;
  positions?: LatLngExpression;
}

const dummyFormData: FormDataType[] = [
  {
    type: 'Running',
    id: 1243145213,
    value: [5.2, 4.6, 178],
    date: 'May 1',
    positions: [37.58815872848493, 127.06233027778825],
  },
  {
    type: 'Cycling',
    id: 1243140013,
    value: [27, 16, 223],
    date: 'July 2',
    positions: [37.59091171093732, 127.06396058344464],
  },
];

const Map = ({ coords }: CoordsProps) => {
  return (
    <MapContainer id="map" center={coords} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <MyMap />
      {dummyFormData.map((data, idx) => (
        <MyMarker key={`item__${idx}`} data={data} />
      ))}
    </MapContainer>
  );
};

export default Map;
