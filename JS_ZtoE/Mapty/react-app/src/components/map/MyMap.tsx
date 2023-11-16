import { useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';

import {
  PositionType,
  usePositionContext,
} from '../context/PositionContextProvider';

const MyMap = () => {
  const [marker, setMarker] = useState<PositionType | null>(null);
  const { position, setPosition } = usePositionContext();
  const event = useMapEvents({
    click: mapE => {
      // console.log(mapE.latlng);
      // setMarkerP(mapE.latlng);
      const { lat, lng } = mapE.latlng;
      // setMarker([lat, lng]);
      setPosition([lat, lng]);
    },
  });
  // const mapPopupBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (!marker) return;
  //   setPosition(marker);
  // };

  return (
    <>
      {position && (
        <Marker position={position}>
          {/* <Popup>
            <button className="btn" onClick={mapPopupBtnHandler}>
              New Workout
            </button>
          </Popup> */}
        </Marker>
      )}
    </>
  );
};

export default MyMap;
