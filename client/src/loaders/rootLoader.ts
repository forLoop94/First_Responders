import { growl } from "../utils/growl";
import { redirect } from "react-router-dom";
import { refreshToken } from "../services/auth-service";
import { getCurrentUser } from "../services/user-service";

export const loader = async () => {
  try {
    const response = await getCurrentUser();
    if (response.success) {
      console.log("Login response:", response);
      growl(response.message, "success");
      return response.data;
    } else {
      growl(response.message, "error");
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        await refreshToken();
        const res = await getCurrentUser();
        return res.data;
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401) {
          growl("Session expired. Login again", "info");
          return redirect("/login");
        }
        console.error("Token refresh failed", refreshError);
      }
    }
    console.error("Login failed:", error);
    growl(error.message, "error");
  }
};
