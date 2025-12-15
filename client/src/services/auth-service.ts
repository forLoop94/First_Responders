import axios from "axios";

const base_URL = "/api/auth";

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

export const refreshToken = async () => {
  const response = await axios.post(
    `${base_URL}/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
