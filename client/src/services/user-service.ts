import axios from "axios";
import { IUserResponseFormat } from "../interfaces/i-response";

const base_URL = "http://localhost:5500/api/users";

export const getCurrentUser = async () => {
  const response = await axios.get(`${base_URL}/currentUser`, {
    withCredentials: true,
  });
  return response.data as IUserResponseFormat;
};
