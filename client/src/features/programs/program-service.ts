import { IProgramsData } from "./programs-interfaces";
import {
  IPaginated,
  IPaginatedResponseFormat,
} from "../../interfaces/i-response";
import customFetch from "../../utils/customFetch";

const base_URL = "/programs";

export const fetchPrograms = async (
  params: any,
): Promise<IPaginatedResponseFormat<IPaginated<IProgramsData>>> => {
  const response = await customFetch.get("/programs", {
    params,
  });
  return response.data;
};

export const addProgram = async (payload: any) => {
  const response = await customFetch.post("/programs", payload);
  return response.data;
};

export const updateProgram = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const response = await customFetch.patch(`/programs/${id}`, payload);
  return response.data;
};

export const deleteProgram = async (id: any) => {
  const response = await customFetch.delete(`/programs/${id}`);
  return response.data;
};
