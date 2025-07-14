import axios from "axios";
import { getCurrentToken } from "../services/firebaseTokenManager";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const publicRoutes = ["/apartments"];

apiClient.interceptors.request.use(
  async (config) => {
    if (publicRoutes.some((route) => config.url?.startsWith(route))) {
      return config;
    }

    const token = await getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
