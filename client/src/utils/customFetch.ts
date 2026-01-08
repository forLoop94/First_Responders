import axios, { AxiosInstance } from "axios";

const customFetch: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default customFetch;
