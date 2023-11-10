'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// 184~
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// ~ /184

// Selecting elements

const header = document.querySelector('.header'); //셀렉터 불러올 때 주로 이거 씀
document.querySelectorAll('.section'); //NodeList (not automatically update)

const message = document.createElement('div'); //():tagname, return DOM element
message.classList.add('cookie-message'); //js로 html에 div요소를 만들고 class 이름까지 붙임. html요소로 사용할 있고 하나의 돔 객체이지만 돔 자체에는 아직 포함되지 않는다.
// message.textContent = 'We use ~!@#@$ ~'; //read and set content.
message.innerHTML =
  'We use cookied for improved functionality and analutics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); //insert into out DOM. 여기사부터 돔에 생성됨
header.append(message);
//prepend : firstchild of header, append : last child.

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
//message는 변수임! 그래서 사실 이렇게 쿼리셀렉터로 또 부를 필요 없음.
//remove()는 비교적 최신 메소드이다. 이 메소드 나오기 이전에는 부모 요소 지정해서 자식요소 제거하는 방식으로 코드 짰다.
//message.parentElement.removeChild(message)  : 이런 방식을 DOM traversing라 부름

//styles
message.style.backgroundColor = '#37383d';
//css properties name -> camelCase version
// inline style code

//getComputedStyle(message) -> 렌더링된 요소의 스타일 정보를 읽어옴
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//css custom property: root는 document를 가리킴
// document.documentElement.style.setProperty('--color-primary', 'tomato');
//setProperty는 사용자 지정 속성 뿐만 아니라 width, 배경색 등 기존의 모든 속성값에 적용할 수 있다.

//Attributes
const logo = document.querySelector('.nav__logo');
//standard properties만 돔 객체 프로퍼티에 추가된다. 내 맘대로 만든사람="나" 이런 식으로 속성에 넣는 것은 인식하지 않음
// 하지만 logo.getAttribute('designer') 이 메소드를 사용하면 불러올 수 있다.
// console.log(logo.src); //절대경로
// console.log(logo.getAttribute('src')); //상대경로

//setAttribute는 getAttribute의 반대.
logo.setAttribute('company', 'Backy');

//Data attributes -> always stored in the dataset object. Data attribute store information in the DOM.
//<img data-version-number="3.0" />
// console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('a', 'b');
logo.classList.remove('a', 'b');
logo.classList.toggle('c');
logo.classList.contains('c');
// logo.className = 'abcd'; *Dont use this
// 모든 클래스 이름을 오버라이딩하기 때문에 기존의 값들이 다 사라짐.

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

/*
//in modern browsers
btnScrollTo.addEventListener('click', (event) => {
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

//Old school version
btnScrollTo.addEventListener('click', event => {
  //btn 요소 좌표 정보
  console.log(event.target.getBoundingClientRect());
  //섹션1 요소 좌표 정보
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //현재 사용자 화면 좌표 정보
  console.log('Current scroll X/Y: ', window.scrollX, scrollY);
  console.log(s1coords);
  //현재 사용자 화면 크기 정보 *스크롤바 크기는 계산하지 않음
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(s1coords.left, s1coords.top + window.scrollY);
  // 좌표 계산을 사용자가 보는 뷰포트(상대적 좌표)에 맞출지, 페이지(절대적 좌표)에 맞출지는 직접 많이 해봐야함
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// Page navigation

////events
//modern way
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', () => {
  console.log('h1 is hovered over!');
});
//old school way
h1.onclick = () => {
  console.log('h1 is clicked!');
};

//handling event
//특정 이벤트를 한 번만 이용하고 싶을 때
// 1. 이벤트핸들러가 실행됐을 때 마지막에 해당 이벤트에서 한번만 이용하고 싶은 핸들러를 제거!
const mouseLeavedEvent = () => {
  console.log('mouse leaved');
  h1.removeEventListener('click', mouseLeavedEvent);
};
h1.addEventListener('click', mouseLeavedEvent);

// 2. using HTML attribute (잘 안쓰임)
// <h1 onclick="alert('HTML alert!')"></h1>

////event propagation

//rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/

////event delegation
// 1. without delegation
document.querySelectorAll('.nav__link').forEach(el =>
  el.addEventListener('click', function (e) {
    /*
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    */
    return;
    // href = "#section--1" 자체가 아이디 셀렉터와 같기 때문에 이렇게 네이게이션 구현할 때 자주 쓰이는 테크닉이다.
  })
);
// 만약 네비게이션 버튼이 1만개 이상 존재하면? 전부 위처럼 이벤트핸들러를 직접 달아주기가 어렵다. 성능 비효율 문제를 야기.
// 2. use event delegation (use event bubble uo)
//
// 이벤트를 발생시키는 요소들의 공통 직계부모에게 이벤트 핸들러를 달아주는 것!
// -> 1) Add event listener to common parent element
// -> 2) determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy: 어떤 요소의 클릭 이벤트를 캐치 할 지를 정해줘야함! (원하지 않는 것은 무시하도록)
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//when we are working with elements that are not yet on the page on runtime. so by the time the page loads
// 아직 존재하지 않는 요소에는 이벤트 핸들러를 부착할 수가 없다. 하지만 event delegation를 이용하여 이벤트를 처리할 수 있다.

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// DOM TRAVERSING

//// Going downwards: child
const h12 = document.querySelector('h1');
console.log(h12.querySelectorAll('.highlight'));
console.log(h12.childNodes); //nodelist
console.log(h12.children); // htmlcollection
h12.firstElementChild.style.color = 'white';
h12.lastElementChild.style.color = 'red';

//// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
//* not a direct parent or no matter how far away it is
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // h1의 부모에서 가장 가까운 header의 클래스이름을 가진 엘리먼트
// closest은 querySelector와 반대되는 메소드이다. querySelector는 돔트리 깊이에 상관없이 자식 및 자손에서 탐색을 하고, closest은 부모 및 조상에서 탐색을 한다.
// closest은 자기 자신도 포함한다!
//위와 같이 어떤 요소의 부모요소를 찾는 방법은 event delegation를 위해 매우 유용한 도구이다.

//// Going sideways: siblings
// in JS, we can only access direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

//모든 형제 요소들을 불러오는 테크닉
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.7)';
});

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//// very popular component: TAB component
// Tab has its own content area basically

let preTabNum = '1';

const tabActiveToggle = (preNum, nowNum) => {
  // button
  document
    .querySelector(`.operations__tab--${preNum}`)
    .classList.toggle('operations__tab--active');
  document
    .querySelector(`.operations__tab--${nowNum}`)
    .classList.toggle('operations__tab--active');

  //content
  document
    .querySelector(`.operations__content--${preNum}`)
    .classList.toggle('operations__content--active');
  document
    .querySelector(`.operations__content--${nowNum}`)
    .classList.toggle('operations__content--active');
};

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', e => {
    // if (e.target.classList.contains('btn')) {
    //   const nowTabNum = e.target.dataset.tab;
    //   tabActiveToggle(preTabNum, nowTabNum);
    //   preTabNum = nowTabNum;
    // } else if (e.target.parentElement.classList.contains('btn')) {
    //   const nowTabNum = e.target.parentElement.dataset.tab;
    //   tabActiveToggle(preTabNum, nowTabNum);
    //   preTabNum = nowTabNum;
    // }

    //closest를 사용하면 자신을 포함한 상위 노드를 탐색하기 때문에 위 두 내용을 합칠 수 있다! *************************
    /*
    if (e.target.closest('.btn')) {
      const nowTabNum = e.target.closest('.btn').dataset.tab;
      tabActiveToggle(preTabNum, nowTabNum);
      preTabNum = nowTabNum;
    }
    */
    // 아래 방식이 위 방식보다 더 모던한 방식이다. if문을 거름망처럼 쓰는 것!  *************************************
    // Guard clause
    if (!e.target.closest('.btn')) return;

    const nowTabNum = e.target.closest('.btn').dataset.tab;
    tabActiveToggle(preTabNum, nowTabNum);
    preTabNum = nowTabNum;
  });

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//// menu fade animation
//  how to pass arguments into event handler functions.
// 'mouseenter' does not bubble! (opposite: mouseleaves)
// mouseover <-> mouseout

const navHoverHandler = (e, opc) => {
  if (e.target.classList.contains('nav__link')) {
    const hoverd = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const navLogo = e.target.closest('.nav').querySelector('.nav__logo');
    // 셀렉팅이 document로 부터 시작되는 것이 아니라, 이벤트 타겟으로부터 시작함.
    // 찾는 요소의 부모까지 올라간(closest) 후 찾는 요소로 내려옴(querySelector)
    siblings.forEach(el => {
      if (el === hoverd) return;
      el.style.opacity = opc;
    });
    navLogo.style.opacity = opc;
  }
};

document.querySelector('.nav').addEventListener('mouseover', e => {
  navHoverHandler(e, 0.5);
});
document.querySelector('.nav').addEventListener('mouseout', e => {
  navHoverHandler(e, 1);
});
// *handler function can only take one argument **********
// 이벤트핸들러 함수는 리스너 함수가 이벤트 인자를 전달하여 실행시킨다. 즉 매개변수가 1개만 존재한다.
// 추가적으로 전달하고 싶은 인자가 있으면 this 키워드와 바인드 메소드를 이용한다.
// 전달하고 싶은 인자가 여러개이면 배열이나 객체에 담아서 전달한다.
// 아래와 같이 이벤트 외에 다른 전달하고자 하는 인자를 this로 두고 바인드 함수로 래핑한다.
/*
const navHoverHandler = function (e) {
  const hoverd = e.target;
  const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
  const navLogo = e.target.closest('.nav').querySelector('.nav__logo');
  siblings.forEach((el) => {
    if (el !== hoverd) el.style.opacity = this;
  });
  navLogo.style.opacity = this;
};
document
  .querySelector('.nav')
  .addEventListener('mouseover', navHoverHandler.bind(0.5));
document
  .querySelector('.nav')
  .addEventListener('mouseout', navHoverHandler.bind(1));
*/

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//// sticky navigation
//스크롤을 내리다가 어느 지점부터 화면 상단에 네비바가 붙어있음

//scroll event is not efficient, usually should be avoided
// 스크롤 이벤트는 마우스 휠을 움직이면 계속 실행되기 때문에 특히 모바일 환경에서 성능을 헤치게 됨.
// * scrollX scrollY 는 화면의 크기(반응형 웹)에 따라 변한다는 점에 주의!

/*
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top)
    document.querySelector('.nav').classList.add('sticky');
  else document.querySelector('.nav').classList.remove('sticky');
});
// 따라서 이 코드 보다는 아래를 사용할 것!
*/

//// Intersection Observer API
//observe changes to the way that a certain target element intersects another element or the viewport.

/*
//사용법
// 1. new IntersectionObserver(callback(fn), options(object)) 
const observer = new IntersectionObserver();

// 2. create callback
const obsCallback = (entries, observer)=> {
//entries: an array of threshold entries. -> 옵션의 threshold가 두 개 이상이라면 loop 이용해야함.
//* threshold가 한개면 entries 순회를 돌 필요 없다.
  entries.forEach((entry)=>console.log(entry))

// entry: 
// 우리 예제의 경우, 페이지를 로드하면 처음 보이는 화면에 section1이 포함되지 않기 때문에 항상 콘솔창에 intersectionRatio:0, isIntersection: false 프로퍼티를 가진 entry객체를 갖는 옵저버 이벤트가 로드된다.
// intersectionRatio가 threshold와 같아지게되면 isIntersection가 false에서 true로 바뀐다.
// 옵션에 설정한 threshold를 넘게되면 옵저버 이벤트가 이를 포착하고 알려줌!
}

// 3. create options
const obsOptions = {
  root: null, // root: element that the target is intersecting. null -> intersecting the entire viewport
  threshold: [0, 0.3], // the percentage of intersection at which the observer callback will be call.
};

//* 그냥 변수에 저장하지 않고 한 번에 써줘도 됨 -> const observer = new IntersectionObserver(()=>{}, {});

// 4. call observer(target element) method: 
observer.observe(section1);

// 요약: callback will get called each time that the observed target element is intersecting the root element at the threshold we defined.
// root:null, 즉 사용자 화면을 기준으로 타겟 요소가 threshold 만큼 침범하면 옵저버 콜백함수가 실행된다.
*/

//observer method: observe the target element.
//root: null(entire viewpoint)
//threshold(문턱, 한계점): at the percentage that we want to have visible in our root(viewport). event is catched and then callback fucntion being invoked
// 주의: 사용자 화면(루트) 비율이 아니라, 대상 요소의 크기 비율을 말함! 예를 들어 20%는 루트의 20%를 타겟이 차지할 때가 아니라, 타겟 요소 면적의 20%가 화면(루트)에 나타날 때(visible) 이벤트가 발생함.
// 0%: target element moves completely out of the view. and alse as soon as enters the view
// 100% : 루트에서 대상 요소가 완전히 다 보일 때

// *rootMargin: 90 === box of 90px that will be applied outside of our targer element.
// 타겟 요소의 경계선을 재설정함. 90px after the threshold was reached.
// %, rem 등의 단위는 적용 안되고 px만 가능
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const observer = new IntersectionObserver(
  entries => {
    console.log(entries);
    const [entry] = entries;
    if (entry.isIntersecting) nav.classList.remove('sticky');
    else nav.classList.add('sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

observer.observe(header);

//--------------------------------------------------------------------------------
////reveal elements as scroll close to them.
// animation comes from css. when approach elements, adding a className.
/*
.section--hidden {
  opacity: 0;
  transform: translateY(8rem);
}
*/
//위 클래스 이름을 html 'section' element에 추가.
const allSections = document.querySelectorAll('.section');
allSections.forEach(el => {
  el.classList.add('section--hidden');
});
////Reveal sections

// *4개의 섹션을 모두 관찰하고 싶다! 같은 옵저버를 이용하도록 해야한다. 한 옵저버가 여러 요소를 관찰하게 해야함
// 이번에는 observer를 콜백함수 인자로 전달하였음. 옵저버를 따로 조작해야할 상황이 생김.
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    entry.isIntersecting && entry.target.classList.remove('section--hidden');
    // 페이지를 로드 한 후 최하단까지 스크롤다운하면 위 코드가 모두 실행됨. 각 섹션은 화면에 나타나게됨.
    // 따라서 각 섹션이 나타날 때마다 옵저버는 해당 섹션을 관찰할 필요가 없어짐.
    entry.isIntersecting && observer.unobserve(entry.target);
    // 관찰을 멈출 타겟을 인자로 전달해야함.

    /*
    if (!entry.isIntersecting) return; 
  // 이렇게 관련 없는 상황만 걸러주면 코드 피드백이 훨씬 좋다. 위는 계속 앞에 조건을 추가해 줘야함 entry.isIntersecting 와 같은..

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
    */
  },
  {
    root: null,
    threshold: 0.15,
  }
);
allSections.forEach(el => {
  sectionObserver.observe(el);
});

//--------------------------------------------------------------------------------
//// lazy Loading Images
// 웹사이트를 제작할 때 가장 중요한 것은 성능이다. 이미지는 페이지 로딩에 매우 큰 영향을 갖는다. 페이지 마다 이미지를 최적화하는 것은 까다롭다.
// 대신, Lazy Loading Images라 불리는 전략을 이용할 수 있다.
// 우선 원본 사진의 용량을 대폭 줄인 사본을 준비한다.
// 페이지 로딩시 용량이 작은 사진을 로드하고, 사용자가 해당 사진에 접근하면 (스크롤을 내리거나 해서) 그때 원본 사진을 로드한다.
// 이때 사본 이미지는 블러 처리를 하여 가려주는 센스! css-> filter: blur(20px);
// html의 이미지 태그에 data-src라는 특별한 속성을 사용! -> ~.target.dataset 에 저장됨
// data~ attribute는 함수 작업을 만들때 사용할 데이터를 보관하는 용도!

////using observer API again!!!!
const imgTargets = document.querySelectorAll('img[data-src]'); // data-src arritbute 셀렉터에 주의!!
const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    //이미지 로딩은 비동기 작업이기 때문에, 원본 이미지가 로드된 후에 블러 스타일의 클래스를 제거해주려면 이벤트리스터를 사용해야한다!
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '200px', // 미리 경계점을 밟아 옵저버를 실행시켜서, 이미지 로드를 조금 더 일찍 시작하게 한다!. 동영상 버퍼링처럼.
  }
);
imgTargets.forEach(el => imgObserver.observe(el));

//--------------------------------------------------------------------------------
//// Slider Components

// html에 조나스가 작성해 둔 슬라이드 태그를 복붙해서 자유롭게 변형하여 사용할 것!
// 이번 과제에선 이미지 통채로 사용하였음.
// 초기 값은 이미지들이 같은 위치에 쌓여져 있음. 이를 트랜스폼 스타일을 통해 옆으로 옮겨줄 것임
const slides = document.querySelectorAll('.slide');
slides.forEach((el, i) => {
  el.style.transform = `translateX(${i * 100}%)`; // 각 이미지를 포함하는 디브 태그를 오른쪽으로 100%씩 이동!
  // 초기값: 0 100% 200% 300%
});

//작업하기 편하게 이미지를 축소시켜놓고, 현재 이미지만 페이지에 보이도록하는 overflow:hidden 속성을 제거!
const slider = document.querySelector('.slider');
slider.style.overflow = 'visible';
slider.style.transform = 'scale(0.2)';
// 이 위는 슬라이더 컴포넌트 구현 이후에 없애줄 것임! 작업할 때만 사용하는 부분.

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

////next slide
let currentSlide = 0; // 현재 슬라이드를 보여주는 포인터 변수를 사용!

btnRight.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) currentSlide++;
  else currentSlide = 0;
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    // 0 100% 200% 300% -> -100 0 100 200  ////i - currentSlide가 매우 중요한 로직!!
  });
});
btnLeft.addEventListener('click', () => {
  if (currentSlide > 0) currentSlide--;
  else currentSlide = slides.length - 1;

  slides.forEach((el, i) => {
    el.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    // -100 0 100 200 -> 0 100% 200% 300%
  });
});

//refactoring, 반복되는 코드는 함수로!
/*
const goToSlide = function (slide) {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${(i - slide) * 100}%)`;
}
goToSlide(0)는 위에 슬라이더 구현 부분 맨 처음에 각 이미지를 오른쪽으로 이동시킨 코드와 같다!
*/

//// keyboard event
/*
document.addEventListener('keydown', e=>{
  if(e.key === 'ArrowLeft') goToSlide('left');
  e.key === 'ArrowRight' && goToSlide('right')
})
*/

//// dot slide;
// dot은 슬라이더 개수에 따라 결정되므로, html이 아닌 자바스크립트로 동적으로 관리해주는게 맞다!
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};
createDots();

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    // goToSlide(slide) -> 이 함수를 제대로 구현하지 않아서 각주처리했음.
    // 버튼을 누를때마다 해당 슬라이드로 이동되게 하면된다.
    console.log(slide);
  }
});

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(el => el.classList.remove('dots__dot--activate'));
  document
    .querySelector(`.dots__dot[data-slider="${slide}"]`)
    .classList.add('dots__dot--activate');
  // 데이터셋 속성을 지닌 요소 불러올 때, 셀렉터를 클래스[속성값]으로 지정해주면 된다!
};
// 이 함수를 0을 전달하여 기본값을 실행하고, 슬라이드를 변경하는 함수를 실행할 때마다 그에 맞는 슬라이드 번호를 전달하여 함께 실행되도록 해준다!

/*
const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
init();
*/
// 이렇게 초기값을 실행시키는 함수들을 따로 묶어서 관리해주면 베리 굿~

//마지막으로, 리액트처럼 각 컴포넌트를 함수에 통채로 담아서 관리해주면 좋다.
/*
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
*/
