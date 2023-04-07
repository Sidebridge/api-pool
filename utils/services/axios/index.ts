import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL, // Set your API base URL here
  timeout: 5000, // Set a default timeout for requests
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // Add any custom headers or configurations to the request here

    return config;
  },
  (error: any) => {
    // Handle any request errors here
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    // Handle any successful responses here
    return response;
  },
  (error: any) => {
    // Handle any response errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
