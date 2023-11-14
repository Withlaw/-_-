// Workout
interface WorkoutProps {
  id: number;
  distance: number;
  duration: number;
  position: [number, number];
  date: string;
}

class Workout {
  id: string;
  date: string;
  distance: number;
  duration: number;
  position: [number, number];

  constructor(values: WorkoutProps) {
    this.distance = values.distance; // in km
    this.duration = values.duration; // in min
    this.position = values.position; // [lat, lng]

    this.id = Date.now().toString().slice(-10);
    this.date = this._setDescription({
      month: 'long',
      day: 'numeric',
    });
  }
  _setDescription(option: Intl.DateTimeFormatOptions) {
    /*
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
    */
    return new Date().toLocaleDateString('en-US', option);
  }
}

// Running
interface RunningProps extends WorkoutProps {
  cadence: number;
  pace: number;
}

export class Running extends Workout {
  type = 'Running';
  cadence: number;
  pace: number;

  constructor(values: RunningProps) {
    super(values);
    this.cadence = values.cadence;
    this.pace = this._calcPace();
  }

  _calcPace() {
    // min/km
    return this.duration / this.distance;
  }
}

// Cycling
interface CyclingProps extends WorkoutProps {
  elevationGain: number;
  speed: number;
}

export class Cycling extends Workout {
  type = 'Cycling';
  elevationGain: number;
  speed: number;

  constructor(values: CyclingProps) {
    super(values);
    this.elevationGain = values.elevationGain;
    this.speed = this._calcSpeed();
  }

  _calcSpeed() {
    // km/h
    return (this.distance / this.duration) * 60;
  }
}
