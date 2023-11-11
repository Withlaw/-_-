'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map, mapEvent;

//Geo API
/*
navigator.geolocation?.getCurrentPosition(
  (position) => {
    //success one
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 15);
    // L : main function that leaflet gives us as an entry point. "the namespace"
    //'map' -> id selector in html <div id="map"></div>
    //setView(좌표, 줌 레벨)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // 지도 스타일: open street map에서 제공하는 타일들로 구성됨. -> 다른 스타일이나 다른 api에서 제공하는 타일로 변경 가능

    // handling clicks on map
    map.on('click', (e) => {
      mapEvent = e;
      console.log(mapEvent);
      form.classList.remove('hidden'); // form 태그 css hidden 제거
      inputDistance.focus(); // form 양식 요소 나타나자 마자 첫번째 입력 박스를 자동으로 포커싱해주면 즉시 타이핑이 가능하기 때문에 사용자 경험 굿
      /*       const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup' }))
        .setPopupContent('Workout')
        .openPopup(); */
/*
      });
    // *** leaflet API 문서 ***를 참조하여 필요한 기능을 찾는다. API를 꼭 자세히 읽어보는 습관을 들일 것!
    // 자바스크립트 이벤트 리스너로 지도에서 정보를 얻거나 표시를 하거나 등의 일은 불가능함!!!
    // 그리고 보니까 이 라이브러리는 함수형으로 구성된건가? 근간은 객체지향이긴한데.
  },
  () => {
    //error one
    alert('Could not get your position T^T');
  }
);
*/
/*
form.addEventListener('submit', (e) => {
  //clear input fields;
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value ='';
  
  e.preventDefault();
  // display the marker
  // 아래 코드는 맵이 활성화된 후 생성되는 두 변수 map,mapEvent이 필요하다. L은 리플렛 라이브러리에서 선언된 전역변수라 아무때나 사용가능하다.
  // 이 두 변수를 여기 파일 내에서 전역으로 선언해주면 이 이벤트리스너 함수에서도 사용할 수 있겠지!? 어차피 이 함수가 실행되는 상황은 사용자가 맵 내의 임의의 지역을 클릭했을때 나타나는 폼 태그에서 엔터키를 입력해야 발생하니까.
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup' }))
    .setPopupContent('Workout')
    .openPopup();

  // Clear input fields
});

// form-type select 변경할때마다 다른 cadance랑 elev 라벨 변경되게 하기
inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
*/

///////////////////////////////
//Architecture. -> create App Class
class App {
  //private instance properties
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();
    // Attach event handler
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    navigator.geolocation?.getCurrentPosition(this._loadMap.bind(this), () => {
      alert('Could not get your position T^T');
    });
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(el => this._renderWorkoutMarker(el));
  }
  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.style.display = 'none';
    // 폼 hidden 스타일에 애니메이션이 들어가있음. 폼이 나타날때 효과주려고 삽입한건데, 삭제될때도 적용됨. 나타날때만 스타일을 적용하는 법은 Css에 없음.. 다른 방법도 있겠지만 이렇게 그냥 작은 트릭으로 처리해도 된다.
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();

    // -get data from form
    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDistance.value;

    // -if activity running -> create running object
    const selectOption = type === 'running' ? +inputCadence.value : +inputElevation.value;

    // -check if data is valid
    if (Number.isNaN(distance) || Number.isNaN(duration) || (Number.isNaN(selectOption) && distance > 0 && duration > 0 && selectOption > 0))
      return alert('Inputs have to be positive numbers!');

    // -add new object to workout array
    const inputData = [[lat, lng], distance, duration, selectOption];
    const workout = type === 'running' ? new Running(...inputData) : new Cycling(...inputData);
    this.#workouts.push(workout);

    // -render workout on map as marker and on list.
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);

    // -hide form and clear input fields.
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          // className: type === 'running' ? 'running-popup' : 'cycling-popup',
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
      `;
    if (workout.type === 'running')
      html += `          
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    if (workout.type === 'cycling')
      html += `          
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
          `;
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(el => el.id === workoutEl.dataset.id);
    this.#map.setView(workout.coords, this.#mapZoomLevel, { animate: true, pan: { duration: 1 } });

    //using the public interface
    workout.click();
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = localStorage.getItem('workouts');
    if (!data) return;
    this.#workouts = JSON.parse(data);

    //render workouts
    this.#workouts.forEach(el => this._renderWorkout(el));
  }
  // public methods. use in console.
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

////////////////
//create Workout Class
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = this.type[0].toUpperCase() + this.type.slice(1) + ' on ' + months[this.date.getMonth()] + this.date.getDate();
    // Workout 클래스에선 type 프로퍼티가 없으므로 이 메소드는 사용 할 수 없음. 하지만 자식 클래스에서 공통으로 사용하기 때문에 각 자식마다 똑같이 함수를 정의할 필요 없이 상속해주는 것이 더 깔끔함
  }
  // click() {
  //   return ++this.clicks;
  // }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    // this.type = 'running';
    this.cadence = cadence;
    // this.calcPace(); 왜 이렇게 쓰는지 모르겠네.. 바로 정의하지 않고 왜 함수를 실행하지
    this.pace = this.duration / this.distance;
    this._setDescription();
  }
  // calcPace() {
  //   this.pace = this.duration / this.distance; // min/km
  //   return this.pace;
  // }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // km/h
    return this.speed;
  }
}

const app = new App();
