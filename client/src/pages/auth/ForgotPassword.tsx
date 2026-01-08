import React, { useState } from "react";
import { growl } from "../../utils/growl";
import LoadingButton from "../../components/LoadingButton";
import Logo from "../../components/Logo";
import customFetch from "../../utils/customFetch";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const response = await customFetch.get(`/auth/forgotPassword/${email}`);

      const result = response.data;

      if (result.success) {
        setEmail("");
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error: any) {
      setIsloading(true);
      console.error("Retrieval Email could not be sent:", error);
      growl(error.message, "error");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="">
            <Logo />
            <h1 className="text-base-content text-center text-4xl font-bold lg:text-5xl">
              Retrieval Email
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingButton text="Sending mail" />
                ) : (
                  "Send Email"
                )}
              </button>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
