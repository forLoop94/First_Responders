import React, { useState } from "react";
import { growl } from "../../utils/growl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";
import Logo from "../../components/Logo";
import { loginAPI } from "../../services/auth-service";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await loginAPI(data);
      if (response.success) {
        navigate("/dashboard");
        growl(response.message, "success");
      } else {
        navigate("/login");
        growl(response.message, "error");
      }
    } catch (error: any) {
      setIsLoading(true);
      console.error("Login failed:", error);
      growl(error.message, "error");
    } finally {
      setIsLoading(false);
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
              Welcome Back!
            </h1>
          </div>
          <fieldset className="fieldset flex flex-col w-full max-w-sm shrink-0">
            <form
              onSubmit={handleSubmit}
              className="fieldset flex flex-col w-full max-w-sm shrink-0"
            >
              <input
                type="email"
                name="email"
                className="input mb-3 w-full"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                className="input mb-2 w-full"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <div className="self-end">
                <div
                  onClick={() => navigate("/forgot-password")}
                  className="hover:text-primary cursor-pointer"
                >
                  Forgot password?
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingButton text="Logging in" /> : "Login"}
              </button>
              <div>
                <p className="text-center text-[1rem] mt-4">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="text-primary cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Login;
