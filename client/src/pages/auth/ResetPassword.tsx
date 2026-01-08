import React, { useState } from "react";
import { growl } from "../../utils/growl";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";
import Logo from "../../components/Logo";
import customFetch from "../../utils/customFetch";

interface IResetData {
  password: string;
  confirmPassword: string;
  userId: string;
  resetString: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [data, setData] = useState<IResetData>({
    password: "",
    confirmPassword: "",
    userId: params.id!,
    resetString: params.resetString!,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const response: any = await customFetch.post("/auth/resetPassword", data);

      const result = response.data;

      if (result.success) {
        setData({
          password: "",
          confirmPassword: "",
          userId: "",
          resetString: "",
        });
        navigate("/login");
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error: any) {
      setIsloading(true);
      console.error("Password reset failed:", error);
      growl(error.message, "error");
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="">
            <Logo />
            <h1 className="text-base-content text-center text-4xl font-bold lg:text-5xl">
              Reset Password
            </h1>
          </div>
          <fieldset className="fieldset flex flex-col w-full max-w-sm shrink-0">
            <form
              onSubmit={handleSubmit}
              className="fieldset flex flex-col w-full max-w-sm shrink-0"
            >
              <input
                type="password"
                name="password"
                className="input mb-3 w-full"
                placeholder="New Password"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                className="input mb-3 w-full"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingButton text="Logging in" /> : "Login"}
              </button>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
