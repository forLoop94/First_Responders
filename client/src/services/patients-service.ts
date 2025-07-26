import axios from "axios";
import { growl } from "../utils/growl";

const base_URL = "http://localhost:5500/api";

export const getPatients = async () => {
  try {
    const response = await axios.get(`${base_URL}/patients`, {
      withCredentials: true,
    });
    const result = response.data;
    // console.log(result);

    if (result.success) {
      growl(result.message, "success");
    } else {
      growl(result.message, "error");
    }
    return result.data;
  } catch (error: any) {
    console.error("Failed to fetch Patients:", error);
    growl(error.message, "error");
  }
};
