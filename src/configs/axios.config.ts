import axios, { AxiosError, AxiosRequestConfig } from "axios";


const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: "http://localhost:8000",
}

export const axiosToDataBase = axios.create(axiosConfig);

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
//     return config
//   }
// );


// axios.interceptors.response.use(
//   // в случае валидного accessToken:
//   (config) => {
//     return config;
//   },
//   // в случае просроченного accessToken:
//   async (error: AxiosError) => {
//     if (error.response!.status === 426) {
//       // localStorage.removeItem("token");
//       // loginStore.setIsLogin(false);
//     }
   
//     throw error;
//   }
// );