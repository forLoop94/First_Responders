import React, { useState } from "react";
import { growl } from "../../utils/growl";
import LoadingButton from "../../components/LoadingButton";
import { Role } from "../../enums/auth/e-auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import customFetch from "../../utils/customFetch";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole] = useState<Role>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response: any = await customFetch.post("/auth/register", data);

      const result = response.data;

      if (result.success) {
        navigate("/login");
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error: any) {
      setIsLoading(true);
      console.error("Login failed:", error);
      growl(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
              Create Account!
            </h1>
          </div>
          <fieldset className="fieldset flex flex-col w-full max-w-sm shrink-0">
            <form
              onSubmit={handleSubmit}
              className="fieldset flex flex-col w-full max-w-sm shrink-0"
            >
              <input
                type="text"
                name="name"
                className="input mb-3 w-full"
                placeholder="Name"
                onChange={handleChange}
                required
              />
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
              <select
                defaultValue="Pick a Role"
                className="select select-bordered w-full"
                name="role"
                value={selectedRole}
                onChange={handleChange}
              >
                <option disabled={true}>Pick a Role</option>
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingButton text="Signing up" /> : "Register"}
              </button>
              <div>
                <p className="text-center text-[1rem] mt-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-primary cursor-pointer"
                  >
                    Login
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

export default Register;
