const Workout = () => {
  return (
    <>
      <li className="workout workout--running" data-id="1234567890">
        <h2 className="workout__title">Running on April 14</h2>
        <div className="workout__details">
          <span className="workout__icon">🏃‍♂️</span>
          <span className="workout__value">5.2</span>
          <span className="workout__unit">km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">24</span>
          <span className="workout__unit">min</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⚡️</span>
          <span className="workout__value">4.6</span>
          <span className="workout__unit">min/km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">🦶🏼</span>
          <span className="workout__value">178</span>
          <span className="workout__unit">spm</span>
        </div>
      </li>

      <li className="workout workout--cycling" data-id="1234567891">
        <h2 className="workout__title">Cycling on April 5</h2>
        <div className="workout__details">
          <span className="workout__icon">🚴‍♀️</span>
          <span className="workout__value">27</span>
          <span className="workout__unit">km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">95</span>
          <span className="workout__unit">min</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⚡️</span>
          <span className="workout__value">16</span>
          <span className="workout__unit">km/h</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⛰</span>
          <span className="workout__value">223</span>
          <span className="workout__unit">m</span>
        </div>
      </li>
    </>
  );
};

export default Workout;
