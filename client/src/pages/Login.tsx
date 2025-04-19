import React, { useState } from "react";
import { growl } from "../utils/growl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await axios.post(
        "http://localhost:5500/api/auth/login",
        data,
        { withCredentials: true }
      );

      const result = response.data;

      if (result.success) {
        navigate("/");
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      growl(error.message, "error");
    }
  };

  const handleChange = (e: any) => {
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
            <h2 className="text-2xl mb-6 md:text-3xl">
              <span className="text-base-content">Life</span>
              <span className="text-primary">Care</span>
            </h2>
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
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Login
              </button>
              <div>
                <p className="text-center text-[1rem] mt-4">
                  Don't have an account?{" "}
                  <span className="text-primary cursor-pointer">Sign up</span>
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
