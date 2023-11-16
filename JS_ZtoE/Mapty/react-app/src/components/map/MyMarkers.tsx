import { Marker, Popup, useMap } from 'react-leaflet';
import { useWorkoutContext } from '../context/WorkoutContextProvider';

const MyMarkers = () => {
  const { workouts } = useWorkoutContext();
  const map = useMap();
  // console.log('map', map);

  // )
  return (
    <>
      {workouts.map((workout, idx) => (
        <Marker
          key={`item__${idx}`}
          position={workout.position}
          eventHandlers={{
            add: e => {
              // console.log(e.target);
              e.target.openPopup();
            },
          }}
        >
          <Popup
            maxWidth={250}
            minWidth={100}
            autoClose={false}
            closeOnClick={false}
            className={`${workout.type.toLowerCase()}-popup`}
            // eventHandlers={{
            //   add: console.log,
            // }}
          >
            {workout.type === 'Running' && '🏃‍♂️'}
            {workout.type === 'Cycling' && '🚴‍♀️'}
            {` ${workout.type} on ${workout.date}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MyMarkers;

// baselayerchange: console.log,
// overlayadd: console.log,
// overlayremove: console.log,

// layeradd: console.log,
// layerremove: console.log,

// zoomlevelschange: console.log,
// unload: console.log,
// viewreset: console.log,
// load: console.log,
// zoomstart: console.log,
// movestart: console.log,
// zoom: console.log,
// move: console.log,
// zoomend: console.log,
// moveend: console.log,
// autopanstart: console.log,
// dragstart: console.log,
// drag: console.log,
// add: console.log,
// remove: console.log,
// loading: console.log,
// error: console.log,
// update: console.log,
// down: console.log,
// predrag: console.log,

// resize: console.log,

// popupopen: console.log,
// popupclose: console.log,

// tooltipopen: console.log,
// tooltipclose: console.log,

// locationerror: console.log,

// locationfound: console.log,

// click: console.log,
// dblclick: console.log,
// mousedown: console.log,
// mouseup: console.log,
// mouseover: console.log,
// mouseout: console.log,
// mousemove: console.log,
// contextmenu: console.log,
// preclick: console.log,

// keypress: console.log,
// keydown: console.log,
// keyup: console.log,

// zoomanim: console.log,

// dragend: console.log,

// tileunload: console.log,
// tileloadstart: console.log,
// tileload: console.log,
// tileabort: console.log,

// tileerror: console.log,
