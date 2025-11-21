import axios from "axios";
import { IResponseFormat } from "../interfaces/i-response";
import { IPatientData } from "../interfaces/i-patients";

const base_URL = "http://localhost:5500/api";

export const getPatients = async (params: any) => {
  const response = await axios.get(`${base_URL}/patients`, {
    withCredentials: true,
    params,
  });
  return response.data as IResponseFormat<IPatientData>;
};
