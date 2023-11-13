import { useEffect, useMemo, useRef, useState } from 'react';
import FormRow from './FormRow';
import { FormDataType, FormTypeList } from '../workouts';

/*
1. formList 값을 의존성 주입으로 처리
2. formList의 타입 종류에 따라 type state의 타입을 동적 지정
  e.target.value는 항상 string으로 타입 추론하기 때문에 'Running'과 'Cycling'만 받을 수 있는 setType의 인자에 as keyof FormTypeList 와 같이 type assertion 함
3. 위를 통해서 form content를 완벽히 동적으로 처리
4. 여러 dom node를 ref에 저장할 때: ref={el => (inputRef.current[idx] = el!)} 혹은 narrowing
5. 배열 유니언 타입지정 (string | number)[]
key={`item-${idx}`}

form 관련 기능: 오토포커싱, 제출시 초기화, 유효성검사,
id 만드는 요령 : const id = Date.now().toString().slice(-10); 마치 주민번호?

*/

type FormPropsType = {
  formList: FormTypeList;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  setIsFormActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ formList, setFormData, setIsFormActive }: FormPropsType) => {
  const initialState = 'Running';
  const [type, setType] = useState<keyof FormTypeList>(initialState); // Literal type, 여기 상태도 리듀서로 관리해보기!
  const inputRef = useRef<HTMLInputElement[]>([]);

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as keyof FormTypeList); // type assertion
    inputRef.current.forEach((el, idx) => {
      if (idx === 0) el.focus(); // 첫번째 요소 오토 포커싱
      el.value = ''; // input 초기화
    });
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

    setFormData(prevFormData => {
      const date = new Date();
      // const id = Date.now().toString().slice(-10);
      return [
        ...prevFormData,
        [
          type,
          +inputRef.current[0],
          +inputRef.current[1],
          +inputRef.current[2],
          date,
        ],
        // [type, ...inputRef.current.map(el => +el.value), date],
      ];
    });
    // setIsFormActive(false);
    setType(initialState);

    inputRef.current.forEach((el, idx) => {
      if (idx === 0) el.focus(); // 첫번째 요소 오토 포커싱
      el.value = ''; // 양식 제출 후 input 초기화
    });
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []); // 첫 렌더링시 첫번째 input 항목 포커싱

  return (
    <form className="form" onSubmit={submitHandler}>
      <FormRow label="Type">
        <select
          className="form__input form__input--type"
          onChange={selectChangeHandler}
          value={type}
        >
          {Object.keys(formList).map((el, idx) => (
            <option key={`item-${idx}`} value={el}>
              {el}
            </option>
          ))}
        </select>
      </FormRow>
      {formList[type].map((el, idx) => (
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
