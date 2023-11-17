import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import MyMap from './MyMap';

import L, { LatLngExpression } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MyMarkers from './MyMarkers';
import { MAP_ZOOM_LEVEL } from '../constants';
import ChangeView from './ChangeView';
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

const Map = ({ coords }: CoordsProps) => {
  return (
    <MapContainer
      id="map"
      center={coords}
      zoom={MAP_ZOOM_LEVEL}
      scrollWheelZoom={true}
      // whenReady={console.log}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <MyMap />
      <MyMarkers />
      <ChangeView />
    </MapContainer>
  );
};

export default Map;
