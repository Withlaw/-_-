import { useEffect, useRef, useState } from 'react';
import FormRow from './FormRow';
import { FormContentsType } from '../workouts';
import { initializingInput } from '../../utils';
import { WorkoutType } from '../context/WorkoutContextProvider';
import { Cycling, Running, WorkoutProps } from '../../state';
import { usePositionContext } from '../context/PositionContextProvider';

/*
1. formList 값을 의존성 주입으로 처리
2. formList의 타입 종류에 따라 type state의 타입을 동적 지정
  e.target.value는 항상 string으로 타입 추론하기 때문에 'Running'과 'Cycling'만 받을 수 있는 setType의 인자에 as keyof FormContentsType 와 같이 type assertion 함
3. 위를 통해서 form content를 완벽히 동적으로 처리
4. 여러 dom node를 ref에 저장할 때: ref={el => (inputRef.current[idx] = el!)} 혹은 narrowing
5. 배열 유니언 타입지정 (string | number)[]
key={`item-${idx}`}

form 관련 기능: 오토포커싱, 제출시 초기화, 유효성검사,

id 만드는 요령 : const id = Date.now().toString().slice(-10); 마치 주민번호?
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

소수점 표기 : (number).toFixed(1)
트러블: new Date를 직렬화하게 되면 나중에 파싱해도 문자열 타입이됨. -> Date 타입이어야 하는데...
그래서 사람이 읽기 편한 날짜값 -> new Date().toLocaleDateString(...):string 을 이용함.
조건부렌더링은 display:none과 동일함. 애니메이션이 없음. 요소가 나타나고 사라질 때 애니메이션 주려면 조나스가 hidden 클래스로 css 적용한것처럼 해야함. setTimeout으로 css 적용한것도 기억해두기.

// prettier-ignore 이 주석 다음 줄은 프리티어 적용 무시함.

*조나스가 새로운 메소드를 생성하는 과정을 보면, 구현할 기능이 필요한 위치에서 함수를 먼저 호출한 다음 함수를 정의함

guard clause : 모던 자바스크립트에서 조건문에 else 문은 잘 안쓴다.

zoom level 처럼 여러번 쓰이는 데이터는 변수로 처리하여 한번에 관리하는 습관! 아주 기본 중의 기본

public interface를 이용하여 인스턴스와 인터렉트하는 것도 중요함.

로컬 스토리지: 브라우저 저장소 api. 블로킹 특징이 있어서 적은 용량의 데이터를 다루는 것이 좋음
기본적으로 {키:밸류} 한쌍씩 저장함

객체를 직렬화하는 과정에서 프로토타입 체인이 사라진다. 따라서 스토리지에는 항상 값만 저장한다. 조나스는 cycling, running class에 메소드 없이 필드만 구성했다
-> data instanceof Running 처럼 클래스 타입 체크도 안됨.
-> 앱 전반에서 중요하게 다뤄지는 workout 데이터는 클래스로 구현하였음. 이유는 수정과 확장에 편해보여서.
-> dummy data를 넣어 예시용 인스턴스를 만들고 이를 타입화하였음. Running과 Cylcing 두 클래스의 인스턴스를 타입 지정하고, type 필드에 리터럴 타입을 지정하여 타입 가드 처리함(workout 컴포넌트 참고).

데이터의 라이프사이클을 잘 고려해야한다. 앱을 구현해나가면서 점점 데이터와 기능들이 많아지면 라이프사이클이 꼬일 수 있다. 기존 데이터가 언제 로드되는지, 새 데이터가 언제 추가되는지 그 시점을 중심으로 순서를 잘 생각하면서 혼란을 피할것

타입스크립트:

react leaflet: leaflet의 js 메소드들을 통해 어떤 식으로 동작하는 지 유추할 수 있다
맵 보여주기 -> setView()
맵에 타일,마커 등 추가하기 -> addTo()
마커에 팝업 표시하기 -> openPopup()
이 이벤트들이 리액트 컴포넌트에서는 어떻게 처리되는지는 문서 혹은 타입을 체크하면 된다 -> 컴포넌트에 props으로 주어지는 구나. 혹은 해당 요소 노드에 기존의 js 방식처럼 이벤트를 추가하면 된다 node.openPopup()

*/

type FormPropsType = {
  formContents: FormContentsType;
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutType[]>>;
};

const Form = ({ formContents, setWorkouts }: FormPropsType) => {
  const initialState = 'Running';
  const [type, setType] = useState<keyof FormContentsType>('Running'); // Literal type, 여기 상태도 리듀서로 관리해보기!
  const inputRef = useRef<HTMLInputElement[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { position, setPosition } = usePositionContext();

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as keyof FormContentsType); // type assertion
    initializingInput(...inputRef.current);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const el of inputRef.current) {
      if (el.value === '') {
        alert('항목을 입력해주세요.');
        el.focus();
        return;
      } else if (isNaN(+el.value) || +el.value < 0) {
        alert('양식에 맞게 입력해주세요.');
        el.focus();
        return;
      }
    } //validation

    const data: WorkoutProps = {
      distance: +inputRef.current[0].value,
      duration: +inputRef.current[1].value,
      position: position!,
    };

    let workout: WorkoutType;
    if (type === 'Running')
      workout = new Running({
        ...data,
        cadence: +inputRef.current[2].value,
      });
    else if (type === 'Cycling')
      workout = new Cycling({
        ...data,
        elevationGain: +inputRef.current[2].value,
      });

    setWorkouts(prevWorkouts => {
      return [workout, ...prevWorkouts];
    });

    setType(initialState);
    initializingInput(...inputRef.current);
    setPosition(null);
    formRef.current!.style.display = 'none';
    setTimeout(() => {
      formRef.current!.style.display = 'grid';
    }, 1000); // 폼 hidden 스타일에 애니메이션이 들어가있음. 폼이 나타날때 효과주려고 삽입한건데, 삭제될때도 적용됨. 나타날때만 스타일을 적용하는 법은 Css에 없음.. 다른 방법도 있겠지만 이렇게 그냥 작은 트릭으로 처리해도 된다.
  };

  useEffect(() => {
    if (position === null) return;
    initializingInput(inputRef.current[0]);
  }, [position]); // 첫 렌더링시 첫번째 input 항목 포커싱

  return (
    <form
      className={`form ${position !== null ? '' : 'hidden'}`}
      onSubmit={submitHandler}
      ref={formRef}
    >
      <FormRow label="Type">
        <select
          className="form__input form__input--type"
          onChange={selectChangeHandler}
          value={type}
        >
          {Object.keys(formContents).map((el, idx) => (
            <option key={`item-${idx}`} value={el}>
              {el}
            </option>
          ))}
        </select>
      </FormRow>
      {formContents[type].map((el, idx) => (
        <FormRow key={`item-${idx}`} label={el.label}>
          <input
            // ref={el => (inputRef.current[idx] = el)!}
            ref={el => {
              if (el !== null) inputRef.current[idx] = el;
            }}
            className={`form__input form__input--${el.label.toLowerCase()}`}
            placeholder={el.placeholder}
          />
        </FormRow>
      ))}
      <button className="form__btn">Submit</button>
    </form>
  );
};

export default Form;
