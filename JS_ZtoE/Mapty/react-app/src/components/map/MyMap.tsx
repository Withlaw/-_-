import { useState } from 'react';

import { Marker, useMap, useMapEvents, Popup } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';

const MyMap = () => {
  const [markerP, setMarkerP] = useState<LatLngExpression | null>(null);
  const map = useMap();
  const event = useMapEvents({
    click: mapE => {
      // const { lat, lng } = mapE.latlng;

      // setMarkerP([lat, lng]);
      console.log(mapE.latlng);
      setMarkerP(mapE.latlng);
    },
  });

  const mapPopupBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  return (
    <>
      {markerP && (
        <Marker position={markerP}>
          <Popup>
            <button className="btn" onClick={mapPopupBtnHandler}>
              New Workout
            </button>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MyMap;
