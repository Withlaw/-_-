# Forkify toy project 학습한 내용

\*미구현: 북마크, 페이지네이션

## 1. Architecture

### `관심사 분리`

1. state

-client-side data: 사용자 디바이스(브라우저) 상에 존재하며 사용자와의 상호작용을 통해 생성된다.\
-server-side data: Web server에 존재하며 http api를 통해 클라이언트로 가져오거나 서버에 업데이트할 수 있다.\
\*ajax call 방법: fetch api, http library(axios) 등

2. logic

-business logic: 도메인(현실문제)과 관련된 핵심적인 기능 및 규칙 등을 관리함.\

\*데이터 처리, 계산, 분석 등

-application logic: 애플리케이션의 흐름을 관리함. 사용자의 입력을 받아 적절한 비즈니스 로직을 호출하여 처리한 후 적절한 프레젠테이션 로직을 통해 사용자에게 피드백을 제공함.\

\*router, ui events, state management 등

-presentation logic: 사용자 인터페이스를 관리함. 사용자의 입력을 수집하고, 사용자에게 데이터를 보여주는 역할을 함.\

\*ui layout, dynamic & reactive ui, form, query parameters 등

### Project Directory Structure: `Feature-driven folder structure`

- 원칙: "아키텍처는 사용된 프레임워크가 아니라 시스템을 내포해야 한다." [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)

-각 맥락에 따라 최대한 관련성 있는 것들을 중첩 및 군집화 한다.\
-각 기능을 entity로 그룹화하여 `features` 폴더에 둔다.\

\*한 기능과 관련한 모든 파일들을 한 곳에 조직화하여 해당 기능 구현 작업에만 집중할 수 있도록 한다. hooks, components, model, utils, test 등 파일 명에 각 타입을 포함 시킨다.

-공용적으로 사용되는 기본 컴포넌트는 `ui`, 헬퍼 함수는 `utils`, 상수는 `constants`에 둔다.\
-각 route에 연결된 페이지 컴포넌트는 `pages` 폴더에 둔다.\

### `MVC` -> `MVVM`

-MVC 패턴에서는 모델과 뷰의 동작에 관한 애플리케이션 로직을 컨트롤러에서 처리한다. 즉 컨트롤러는 모델과 뷰에 의존한다.\

\*컨트롤러의 실행은 이벤트 기반이다. 뷰의 독립성을 유지하기 위해 프로젝트에서 pub-sub 디자인 패턴을 적용하였다.

-MVVM에서는 애플리케이션 로직이 ViewModel에 존재하고 이를 뷰가 의존한다.\

## 2. Components

### `form`

-form 구조화를 통해 접근성을 높일 것. [참고1](https://ko.javascript.info/form-elements), [참고2](https://developer.mozilla.org/ko/docs/Learn/Forms/How_to_structure_a_web_form)\
-fieldset-legend: 필드셋 요소는 폼 내부에서 하위 폼처럼 사용된다. 같은 목적을 가진 위젯들을 그룹화한다. \*라디오 버튼 세트는 반드시 필드셋으로 래핑한다.\
-input(textaria)-label [인풋타입](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)\
-select(multiple)-option\
-*figure-img \

- `FormData 인터페이스`: form 필드와 그 값을 나타내는 key:value 쌍을 쉽게 생성할 수 있는 방법을 제공한다.

\*body: new Formdata()로 보낼 때 인코딩타입을 다음과 같이 설정해준다. `Content-Type: multipart/form-data`

### `modal`

-dialog: 모달 혹은 비모달 대화상자를 생성할 때 사용하는 요소 태그이다. [참고1](https://ui.toast.com/posts/ko_20220518), [참고2](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)\
-모달(showModal())과 비모달(show())의 차이: 비활성화된 부분의 상호작용 가능 여부\
-form과 함께 사용시 submit 이벤트 발생 후 자동으로 모달창이 닫힌다. `<form method='dialog'>` or `<button formmethod='dialog>`\
-키보드 esc 누르면 모달창이 닫힌다.\
-오버레이 스타일: `::backdrop` 모달의 비활성 컨텐츠에 접근 불가한 영역에 스타일을 적용할 수 있다.

### `인증/인가`

-인가 확인은 페이지에 접근시 가장 먼저 실행되어야 하므로 리액트-라우터-로더를 잘 활용할 것\
-인가 보호 페이지는 인증/인가 바운더리 컴포넌트로 컴포지션? -> 라우터 만들 때 각 라우트 객체를 탐색하기 어려움. App.tsx 파일 확인하기\

## 3. Adapters

### `axios 횡단 관심사 처리 방법`

- `transformer`: axios 응답 객체의 data 속성에만 영향을 미친다. 모든 요청에 대해 일관된 형식의 데이터를 얻을 수 있게 도와 준다.
- `interceptor`: 요청과 응답의 전체적인 흐름에 영향을 미친다. 요청 직전 및 응답 직후에 요청/응답을 가로채어 추가적인 작업을 처리할 수 있다. 헤더 추가 설정, 오류 전역 처리

## 4. Domain

### `model`

- http response json data를 class instance로 변환해야 하는 이유

1. 받아 온 데이터에 대해 추가 작업을 하는 비즈니스 로직이 거의 항상 수반 된다.
2. 데이터 가공 로직을 클래스로 만들면 응집성, 확장성 있게 유지 보수 할 수 있다.
3. 데이터와 관련된 책임은 모두 이 클래스에 위임할 수 있다.

- OOP, 도메인 기반의 Entity 설계 등을 고려할 때 "어떤 객체에 어떤 책임을 줄 것인가"는 매우 중요한 과제이다.

### `DAO, DTO, VO`

- DAO: data access object. db등 데이터 소스와 관련된 로직(접근, 수정 등)을 책임
- DTO: data transfer object. 이때 dto는 getter, setter 메소드만 가짐.
- VO: value object. read-only이다. (getter만 존재)

\* DTO vs VO : vo는 값 그 자체로써 불변적이고, dto는 가변적임. vo는 리터럴이고 dto는 인스턴스

## 5. 기타

### TypeScript

-처음에 확정되지 않은 data type에 대하여 기본값으로 any를 설정하고 추후에 구체적인 타입을 지정할 것.\
-클래스 interface 작성 할 때, 이미 만들어져 있는 것을 일반화하는 관점에서 접근할 것\

\*axios나 localstorage 등을 노드 환경에서 테스트하려면?

### 컨벤션

-파일 이름: PascalCase 보다 kebab-case를 권장한다. 맥북 파일시스템은 대소문자 구별이 없는 경우가 있어 깃 에러가 발생할 수 있다고 한다.\
-파일 이름에는 파일 타입을 명시한다. recipe.model.ts, recipe.context.tsx\
-이벤트에 바인딩하는 래퍼함수는 `이벤트이름handler`, props로 내려줄 땐 `on이벤트`\

### 에러 핸들링

-try/catch 문에서 타입가드를 적절히 잘 활용 할 것\
-렌더링 시나리오에서 예외처리 잘 해줄 것\

## 6. 트러블 슈팅

### `절대 경로` 설정

-tsconfig, craco\
-vscode settings -> import module specifier -> non-relative 확인 하기\

### `의존성 인젝션`

-의존성 트리를 잘 관리하기 위해 module import를 사용한 의존성 주입은 자제하는 것이 좋아 보임\
-컨텍스트를 통해서만 컴포넌트 내부에서 접근 가능하도록하고, 제한적인 상황에선 클래스를 싱글톤 패턴으로 만들어 사용할 것.\
