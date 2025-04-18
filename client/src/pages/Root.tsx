import React, { useEffect } from "react";
import axios from "axios";
import { growl } from "../utils/growl";

const Root = () => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
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
      console.error("Login failed:", error);
      growl(error.message, "error");
    }
  };

  return (
    <>
      <h1>Root</h1>
    </>
  );
};

export default Root;
