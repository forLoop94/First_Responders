import { IUserResponseFormat } from "../interfaces/i-response";
import customFetch from "../utils/customFetch";

export const getCurrentUser = async () => {
  const response = await customFetch.get("/users/currentUser");
  return response.data as IUserResponseFormat;
};
