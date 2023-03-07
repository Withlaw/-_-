import { BASE_URL } from "./constants";

export const state = {
  members: [],
};

export const loadMembers = async () => {
  try {
    const res = await fetch(BASE_URL + "/data");
    const data = await res.json();
    console.log("data: ", data);

    const payload = data.map((el, idx) => {
      return {
        ...el,
        idx,
      };
    });
    // const localstorageData = window.localStorage.getItem('personalInfo');
    if (!window.localStorage.getItem("personalInfo")) {
      window.localStorage.setItem("personalInfo", JSON.stringify(payload));
    }

    state.members = data;
  } catch (error) {
    throw error;
  }
};

export const isValidateName = name => {
  // 한글만 입력이 가능하며, 문자열의 길이는 2~4입니다. 또한 숫자 및 특수문자 입력은 불가능합니다.
  return /^[가-힣]{2,3}$/.test(name);
};

export const isValidateEmail = email => {
  // 대소문자 구분 없이 영문만 입력이 가능합니다. 숫자 입력은 가능하지만, 특수문자 입력은 불가능합니다
  // 메일 서버 도메인 주소: grepp.co 만 입력이 가능합니다.
  return /^[a-zA-Z0-9]+@grepp.co$/.test(email);
};

export const isValidateNickname = ninkname => {
  // 대소문자 구분 없이 영문만 입력이 가능하며, 문자열의 길이는 3~10 입니다.
  return /^[a-zA-z]{3,10}$/.test(ninkname);
};
