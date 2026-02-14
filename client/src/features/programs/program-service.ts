import { IProgramsData } from "./i-programs";
import {
  IPaginated,
  IPaginatedResponseFormat,
} from "../../interfaces/i-response";
import customFetch from "../../utils/customFetch";

export const fetchPrograms = async (
  params: any,
): Promise<IPaginatedResponseFormat<IPaginated<IProgramsData>>> => {
  const response = await customFetch.get("/programs", {
    params,
  });
  return response.data;
};
