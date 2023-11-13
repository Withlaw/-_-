import { useState } from 'react';

import { Marker, useMap, useMapEvents, Popup } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';

import { CoordsType } from '.';

const MyMap = () => {
  // const [markerP, setMarkerP] = useState<LatLngExpression | null>(null);
  const [markerP, setMarkerP] = useState<CoordsType | null>(null);
  const map = useMap();
  const event = useMapEvents({
    click: mapE => {
      const { lat, lng } = mapE.latlng;

      setMarkerP([lat, lng]);
      // setMarkerP(mapE.latlng);
    },
  });
  console.log('map: ', map.getCenter());
  return (
    <>
      {markerP && (
        <Marker position={markerP}>
          {' '}
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MyMap;
