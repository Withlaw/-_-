export type ICoords = {
  latitude: number;
  longitude: number;
};

const Map = ({ coords }: { coords: ICoords | null }) => {
  console.log(coords);
  return <div id="map"></div>;
};

export default Map;
