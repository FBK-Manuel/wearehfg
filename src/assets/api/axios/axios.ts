import axios from "axios";
import { envConfig } from "../../../config/envConfig";
const authToken = sessionStorage.getItem("authToken");
export const authApi = axios.create({
  baseURL: envConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: envConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken"); // or sessionStorage

    // Skip login and register endpoints
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register")
    ) {
      return config; // don't attach token
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
