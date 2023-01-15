import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "constants/index";
import { ROOT_ENV } from "env";

const axiosInstance = axios.create({
  baseURL: ROOT_ENV.BACKEND_URL,
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if (token && req.headers) {
    (req.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

export default axiosInstance;
