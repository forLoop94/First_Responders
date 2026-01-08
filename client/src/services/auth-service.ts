import customFetch from "../utils/customFetch";

const base_URL = "/auth";

export const loginAPI = async (data: any) => {
  const response = await customFetch.post(`${base_URL}/login`, data);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await customFetch.post(`${base_URL}/logout`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await customFetch.post(`${base_URL}/refresh`, {});
  return response.data;
};
