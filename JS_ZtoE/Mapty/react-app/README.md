# Mapty toy project 학습한 내용

## 1. Architecture

=> Plan or Blueprint

### `App class`

- 애플리케이션 로직을 이곳에서 작성.
- constructor 함수에는 인스턴스가 생성될 때 바로 실행될 필요가 있는 함수들(eventListener 등)을 포함.
- class 내에서 eventListener 호출할 때 this 바인딩 주의하기.
- Exporting functionality into its own methods is very very important.

### `Workout state class`

- form data, map data 정보를 포함한 workout state를 class로 관리하였음.
- form에서 type 설정에 따라 약간 다른 양식의 데이터를 저장하는데 이는 `type='Running' as const`속성을 넣어 `Discriminated Unions` 패턴을 이용하여 Runncing, Cycling 두 유형의 인스턴스를 구별(타입 가드)하였음.
- running, cycling의 인스턴스는 모두 프로퍼티만 갖도록 설계하였음. 메소드는 모두 private 처리함.
- 두 클래스의 타입은 dummy data를 넣어 인스턴스를 만들고 typeof oprerator로 타입을 추출하여 사용하였음. (WorkoutContextProvider.tsx 참고) \*여러 인스턴스를 구별하기 위한 ID 필드로 unique identifier를 부여한다. id는 key값으로 쓰기에도 좋다. \*parent class와 child class 잘 분리하기. 인스턴스는 항상 child 클래스로부터! \*documentation: 각 데이터에 대한 간단한 설명 주석 달기
- 데이터의 라이프사이클을 잘 고려해야함. 앱을 구현해나가면서 점점 데이터와 기능들이 많아지면 라이프사이클이 꼬일 수 있음. 기존 데이터가 언제 로드되는지, 새 데이터가 언제 추가되는지 그 시점을 중심으로 순서를 잘 생각하면서 혼란을 피할것

## 2. Components

### `form`

- form의 구성요소는 의존성 주입으로 처리하여 나중에 언제든 쉽게 form data 양식을 변경할 수 있도록 하였음.
- input 오토 포커싱, 제출시 value 초기화, 유효성 검사 등의 기능을 구현함.

### `css`

- 요소가 나타날 때만 animation을 주는 트릭: display:hidden이나 opacity:0를 사용해야함. display:none은 조건부 렌더링과 동일함. animation 적용이 안됨. 나타날때 hidden을 제거하고, 사라질 때 none을 추가 한 후 setTimeout으로 display:'grid'(원래값)을 적용하면 요소가 나타날 때만 애니메이션 효과를 줄 수 있음.

### `type`

- `keyof, typeof` 등의 오퍼레이터를 활용하여 기존에 만든 타입으로부터 필요한 타입을 추출하는 방식을 사용하여 중복을 줄이고 수정에 용이하도록 하였음. 예를 들어 form 컴포넌트의 중요 state인 type 값의 타입은 form을 구성하는 FormContentsType의 프로퍼티로부터 온다. 만약 여기에 Swimming 등 새로운 폼 양식이 추가되면 타입이 자동으로 반영 된다.
- 타입스크립트의 문맥적 타입 추론에 의해 타입 에러가 발생하면 `type assertion`을 적절히 사용하면 좋다. 예를 들어 form 컴포넌트에서 type state는 'Running'과 'Cycling'의 리터럴 타입을 받는다. 근데 DOM 노드의 value로 부터 가져오는 value는 일반적인 string 타입이기 때문에 타입 에러가 발생한다. 하지만 select에서 항상 받는 value는 type state의 타입과 일치하는 'Running'과 'Cycling'이기 때문에 `as keyof FormContentsType`을 써주면 해결 된다.
- state의 초깃값을 null로 초기화하는 경우가 많기 때문에 null이 아님을 나타내는 `!` 타입 연산자도 자주 사용함.
- 배열에 유니언 타입 지정 방법: (string | number)[]

### `general components`

- `Card Wrapper 컴포넌트`: 카드 모양의 스타일이 적용된 headless ui(?)
- `Loading spinner 컴포넌트`
- `No Item 컴포넌트`

## 3. API

### `Geolocation`

- 비동기 처리.
- 브라우저에서 위치 제공 동의를 요청하고 성공시 map 컴포넌트를 렌더링, 실패시 no map 컴포넌트를 렌더링함.

### `React Leaflet`

- React Leaflet: https://react-leaflet.js.org/
- API 문서를 자세히 읽어보는 습관을 들일 것! 소개, 핵심 컨셉, 예제 등 꼭 읽기
- \*Namespace: 여러 라이브러리를 사용할 때 이름 충돌을 막기 위해서 사용됨. 일종의 컨테이너로써 연관된 변수, 객체, 함수 등을 그룹화하여 코드를 체계적이고 안정적으로 관리할 수 있음.
- 지도 스타일: open street map에서 제공하는 타일들로 구성됨. -> 다른 스타일이나 다른 api에서 제공하는 타일로 변경 가능
- leaflet의 js 메소드들을 통해 리액트 컴포넌트에서는 어떤 속성값으로 동작하는 지 유추할 수 있음
  맵 보여주기 -> setView() -> setView={...}\
  맵에 타일,마커 등 추가하기 -> addTo() -> eventHandlers={ add: ... }\
  마커에 팝업 추가하기 -> addTo() -> eventHandlers={ add: ... } \
  이 이벤트들이 리액트 컴포넌트에서는 어떻게 처리되는지는 공식 문서 혹은 타입스크립트를 확인하면 된다
- 컴포넌트에 props으로 주어지는구나. 혹은 해당 요소 노드에 기존의 js 방식처럼 이벤트를 추가하면 되는구나 node.openPopup() \*나는 타입을 확인해서 해당 속성을 전부 로깅하여 어떻게 이벤트가 동작하는 지 직접 확인했음\*ref를 사용해서 js 방식으로 (element).openPopup() 처럼 사용할 수도 있음
- 기존의 addTo()는 리액트에서 타일, 마커, 팝업 컴포넌트를 선언하는 방식으로 추상화 됨. 이벤트리스너나 여러 attribution 들은 컴포넌트에 props로 전달하면 됨.

### `storage`

- 로컬 스토리지: 브라우저 저장소 api. 블로킹 특징이 있어서 적은 용량의 데이터를 다루는 것이 좋음. 기본적으로 {키:밸류} 한쌍씩 저장함
- 객체를 직렬화하는 과정에서 프로토타입 체인이 사라진다. 따라서 스토리지에는 항상 값만 저장한다. 그래서 cycling, running class에 되도록 public field 영역만 구성함
  \*data instanceof Running 처럼 인스턴스 타입 체크도 안됨

## 4. 기타 꿀팁

- 여러 dom node를 ref에 저장할 때: ref={el => inputRef.current[idx] = el}
- id 만드는 요령 : const id = Date.now().toString().slice(-10) (마치 주민번호)
- 처음 렌더링 시에만 이펙트를 적용하지 않는 트릭: ref를 활용
- 프리티어 적용 무시: // prettier-ignore 이 주석 다음 줄은 프리티어 적용 무시함
- 조나스가 새로운 메소드를 생성하는 과정을 보면, 구현할 기능이 필요한 위치에서 함수를 먼저 호출한 다음 함수를 정의함
- guard clause : 모던 자바스크립트에서 조건문에 else 문은 잘 안씀
- zoom level 처럼 여러번 쓰이는 값은 변수로 처리하여 한번에 관리하는 습관! 아주 기본 중의 기본

## 추가 할 기능 목록

1. Ability to edit a workout
2. Ability to delete all workouts
3. Ability to sort workouts by a certain field (e.g. distance)
4. Re-build Running and Cycling objects coming from Local Storage
5. More realistic error and confirmation messages
6. Ability to position the map to show all workouts [very hard]
7. Ability to draw lines and shapes instead of just points [very hard]
8. Geocode location from coordinates (“Run in Faro, Portugal”) [only after asynchronous JavaScript section]
9. Display weather data for workout time and place [only after asynchronous JavaScript section]
