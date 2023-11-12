import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export type ICoords = [number, number];

const Map = ({ coords }: { coords: ICoords }) => {
  console.log(coords);

  return (
    <MapContainer
      id="map"
      center={[37.5866169, 127.0607943]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
