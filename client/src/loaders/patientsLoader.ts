import { getPatients } from "../services/patients-service";
import { growl } from "../utils/growl";

export const loader = async () => {
  try {
    const response = await getPatients();
    if (response.success) {
      growl(response.message, "success");
    } else {
      growl(response.message, "error");
    }
    console.log("testD", response);
    return response;
  } catch (error: any) {
    console.error("Failed to fetch Patients:", error);
    growl(error.message, "error");
  }
};
