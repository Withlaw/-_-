## 학습한 내용

html 구성 및 css 속성 참고하기~\

### `CSS Module`

컴포넌트 기반 아키텍쳐를 위한 css 방법\
style을 특정 컴포넌트에 encapsulation 할 수 있다.\
파일 이름은 컴포넌트를 따른다.\
컴포넌트에서 module.css 파일을 import하면 class 셀렉터를 프로퍼티로 갖는 js 객체를 반환한다.\
하이픈 등 BEM 방식에 따라 명명한 클래스는 [ ]로 접근한다.\

### `JS`

Select elements & DOM traversing\
Create elements & add properties(classList, textContent, style, attributes(src, data\*\*\*, … 등,))\
Insert elements\
Delete elements\

### `Event`

'element'.addEventListener();\
'element'.onClick = fn;\
\*Event Propagation & Delegation\

### `React`

1. Navigation Menu ‘Fade Animation’\

- 컴포넌트를 잘 쪼개서 조건부 렌더링 방법으로 스타일을 적용 (기본중의기본)\

2. Modal\

- 모달 컴포넌트는 modal window와 modal overlay로 구성됨. \
- react portal을 사용함.\
- 열고 닫힘 기능은 toggle 개념을 이용함.\
- esc로 닫는 기능은 useEffect로 document.이벤트리스너를 호출함. (이펙트 클린업 필수)\

3. Scrolling\

- useRef와 scrollIntoView()로 스크롤 이동을 구현함.\
- contextAPI를 이용하여 ref를 공유\

4. Sticky navigation, Reveal section elements\

- Intersection Observer API 를 사용함.\
- 옵저버 객체에 전달하는 인자: observed됐을 때 호출할 콜백함수와 옵저버 옵션.\
- entry.isIntersecting이 true면 침범할 때를, false면 나올 때를 가리킴.\

5.  lazy loading images\

- 원본 사진의 용량을 대폭 줄인 사본과 blur style을 이용\
- 처음 페이지 로딩시 사본을 로딩하고, 유저가 해당 사진에 접근할 때 원본 사진을 로드하는 방식임\
- 이미지 로딩은 비동기 작업으로, onLoad 이벤트를 활용하여 원본 이미지가 로드됐을 때 블러 효과를 제거함\

6. Tab component\

- 탭은 각자 고유의 컨텐트 영역을 소유한 컴포넌트임\

7. Slider\

- translateX(${i \* 100}%) 속성을 이용하여 이미지를 이동시킴.\
- overflow: hidden으로 현재 이미지만 화면에 나타나도록 함\
- 좌우 화살표 버튼, dots 버튼, 키보드 화살표 등으로 슬라이드를 이동할 수 있게 함.\

### `기타`

const randomInt = (min, max) => Math.floor(Math.random() \* (max - min + 1) + min);\
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;\
