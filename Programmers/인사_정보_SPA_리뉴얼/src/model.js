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
