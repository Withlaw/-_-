import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MyMap from './MyMap';

import L, { LatLngExpression } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MyMarker from './MyMarker';
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

const dummyPositions: CoordsType[] = [
  [37.58815872848493, 127.06233027778825],
  [37.59091171093732, 127.06396058344464],
  [37.583400247115144, 127.0568816246734],
];

const Map = ({ coords, positions }: CoordsProps) => {
  return (
    <MapContainer id="map" center={coords} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <MyMap />
      {dummyPositions.map((position, idx) => (
        <MyMarker key={`marker__${idx}`} position={position} />
      ))}
    </MapContainer>
  );
};

export default Map;
