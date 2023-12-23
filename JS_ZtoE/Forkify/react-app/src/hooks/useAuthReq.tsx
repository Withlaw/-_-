import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios } from "@/adapters/api/http-client";
import { API_AUTH_BASE_URL } from "@/constants";

export const useAuthReq = async () => {
  const axios = new HttpClientAxios(axiosInstance, API_AUTH_BASE_URL);
  const res = await axios.post("/auth.json", "expame");
  console.log("auth res: ", res);
};
