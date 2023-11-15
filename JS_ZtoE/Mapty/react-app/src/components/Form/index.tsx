import { useEffect, useMemo, useRef, useState } from 'react';
import FormRow from './FormRow';
import { FormDataType, FormContentsType } from '../workouts';
import { initializingInput } from '../../utils';
import { WorkoutType } from '../context/WorkoutContextProvider';
import {
  Cycling,
  Running,
  WorkoutInstanceProps,
  WorkoutProps,
} from '../../state';
import {
  PositionType,
  usePositionContext,
} from '../context/PositionContextProvider';

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

데이터의 라이프사이클을 잘 고려해야한다. 앱을 구현해나가면서 점점 데이터와 기능들이 많아지면 라이프사이클이 꼬일 수 있다. 기존 데이터가 언제 로드되는지, 새 데이터가 언제 추가되는지 그 시점을 중심으로 순서를 잘 생각하면서 혼란을 피할것

*/

type FormPropsType = {
  formContents: FormContentsType;
  // setFormData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  // setIsFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  // isFormActive: boolean;
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutType[]>>;
};

const Form = ({ formContents, setWorkouts }: FormPropsType) => {
  const initialState = 'Running';
  const [type, setType] = useState<keyof FormContentsType>('Running'); // Literal type, 여기 상태도 리듀서로 관리해보기!
  // const inputRef = useRef<HTMLInputElement[]>([]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const { position, setPosition } = usePositionContext();

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as keyof FormContentsType); // type assertion
    // inputRef.current.forEach((el, idx) => {
    //   if (idx === 0) el.focus();
    //   el.value = '';
    // });
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
  };

  useEffect(() => {
    if (position === null) return;
    // inputRef.current[0].focus();
    initializingInput(inputRef.current[0]);
  }, []); // 첫 렌더링시 첫번째 input 항목 포커싱

  return (
    <form
      className={`form ${position !== null ? '' : 'hidden'}`}
      onSubmit={submitHandler}
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
