import axios from "axios";
import { envConfig } from "../../../config/envConfig";

const api = axios.create({
  baseURL: envConfig.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
