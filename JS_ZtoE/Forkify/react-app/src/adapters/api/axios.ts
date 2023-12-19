import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

const config = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

export const axiosInstance = axios.create(config);
