import axios from "axios";

// Create an Axios instance with a base URL
const useAxios = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://tasktrove-be.onrender.com",
});

useAxios.interceptors.request.use(
  (config: any) => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${authToken}` };
    } else {
      const { Authorization, ...headers } = config.headers;
      config.headers = headers;
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default useAxios;
