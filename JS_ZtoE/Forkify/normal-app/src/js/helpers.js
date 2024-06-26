import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./constants";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    // error handling
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    return data;
  } catch (err) {
    // alert(err);
    // console.log(err);
    throw err;
  }
};

export const sendJSON = async (url, payload) => {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    // error handling
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // alert(err);
    // console.log(err);
    throw err;
  }
};
