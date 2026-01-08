import { IResponseFormat } from "../interfaces/i-response";
import { IPatientData } from "../interfaces/i-patients";
import customFetch from "../utils/customFetch";

export const getPatients = async (params: any) => {
  const response = await customFetch.get("/patients", {
    params,
  });
  return response.data as IResponseFormat<IPatientData>;
};
