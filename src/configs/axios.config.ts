import loginStore from "../store/auth/LoginStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";


const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: "http://localhost:8000",
};


const axiosToDataBase = axios.create(axiosConfig);


axiosToDataBase.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
);

axiosToDataBase.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError) => {
    if (error.response!.status === 426) {
      localStorage.removeItem("token");
      loginStore.setIsLogin(false);
    }

    throw error;
  }
);


export default axiosToDataBase;