interface WorkoutDataProps {
  type: 'Running' | 'Cycling';
  id: number;
  distance: number;
  duration: number;
  position: [number, number];
  date: string;
  cadence?: number;
  elevationGain?: number;
}

export class WorkoutData {
  type: 'Running' | 'Cycling';
  id: string;
  date: string;
  distance: number;
  duration: number;
  position: [number, number];
  // Running
  cadence?: number;
  pace?: number;
  // Cycling
  elevationGain?: number;
  speed?: number;

  constructor(values: WorkoutDataProps) {
    this.type = values.type;
    this.distance = values.distance; // in km
    this.duration = values.duration; // in min
    this.position = values.position; // [lat, lng]

    if (this.type === 'Running') {
      this.cadence = values.cadence;
      this.pace = this._calcPace();
    }
    if (this.type === 'Cycling') {
      this.elevationGain = values.elevationGain;
      this.speed = this._calcSpeed();
    }

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

  _calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }

  _calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
