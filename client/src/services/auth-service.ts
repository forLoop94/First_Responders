import axios from "axios";

const base_URL = "http://localhost:5500/api/auth";

export const loginAPI = async (data: any) => {
  const response = await axios.post(`${base_URL}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post(`${base_URL}/logout`, {
    withCredentials: true,
  });
  return response.data;
};
