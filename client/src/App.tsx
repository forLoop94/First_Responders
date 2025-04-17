import { useState } from "react";
import "./App.css";

function App() {
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
            <input
              type="email"
              className="input mb-3 w-full"
              placeholder="Email"
            />
            <input
              type="password"
              className="input mb-2 w-full"
              placeholder="Password"
            />
            <div className="self-end">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-2">Login</button>
            <div>
              <p className="text-center text-[1rem] mt-4">
                Don't have an account?{" "}
                <span className="text-primary cursor-pointer">Sign up</span>
              </p>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default App;
