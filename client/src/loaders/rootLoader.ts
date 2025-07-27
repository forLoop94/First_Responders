import axios from "axios";
import { growl } from "../utils/growl";
import { redirect } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5500/api/users/currentUser",
      {
        withCredentials: true,
      }
    );

    const result = response.data;

    if (result.success) {
      console.log("Login response:", result);
      growl(result.message, "success");
    } else {
      growl(result.message, "error");
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        await axios.post(
          "http://localhost:5500/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const res = await axios.get(
          "http://localhost:5500/api/users/currentUser",
          {
            withCredentials: true,
          }
        );
        return res.data;
      } catch (refreshError: any) {
        console.log("holla:", refreshError);

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
