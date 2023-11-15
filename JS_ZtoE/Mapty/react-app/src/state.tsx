// Workout
export interface WorkoutProps {
  distance: number;
  duration: number;
  position: [number, number];
}

class Workout {
  id: string;
  date: string;
  distance: number;
  duration: number;
  position: [number, number];

  elevationGain?: number;
  speed?: string;
  cadence?: number;
  pace?: string;

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
export interface IRunningProps extends WorkoutProps {
  cadence: number;
}

export class Running extends Workout {
  type = 'Running';
  cadence: number;
  pace: string;

  constructor(values: IRunningProps) {
    super(values);
    this.cadence = values.cadence;
    this.pace = this._calcPace().toFixed(1);
    // this.pace = this.duration / this.distance;
  }

  _calcPace() {
    // min/km
    return this.duration / this.distance;
  }
}

// Cycling
export interface ICyclingProps extends WorkoutProps {
  elevationGain: number;
}

export class Cycling extends Workout {
  type = 'Cycling';
  elevationGain: number;
  speed: string;

  constructor(values: ICyclingProps) {
    super(values);
    this.elevationGain = values.elevationGain;
    this.speed = this._calcSpeed().toFixed(1);
    // this.speed = (this.distance / this.duration) * 60;
  }

  _calcSpeed() {
    // km/h
    return (this.distance / this.duration) * 60;
  }
}

export type WorkoutInstanceProps = IRunningProps | ICyclingProps;
