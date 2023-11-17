import { useMap } from 'react-leaflet';
import { MAP_ZOOM_LEVEL } from '../constants';
import { useCenterContext } from '../context/CenterContextProvider';

const ChangeView = () => {
  const { center } = useCenterContext();
  const map = useMap();
  if (center === undefined) return null;

  map.flyTo(center, MAP_ZOOM_LEVEL, {
    animate: true,
    duration: 1,
  });
  return null;
};

export default ChangeView;

/*

 ...{
    maxWidth:250,
    minWidth:100,
    autoClose:false,
    closeOnClick:false,
    // className={`${workout.type.toLowerCase()}-popup`}
    autoPan:true,
  }

  */
