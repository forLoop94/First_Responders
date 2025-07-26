import axios from "axios";

const base_URL = "http://localhost:5500/api";

export const getPatients = async () => {
  const response = await axios.get(`${base_URL}/patients`, {
    withCredentials: true,
  });
  return response.data;
};
