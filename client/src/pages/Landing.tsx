import React from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing-bg.jpg";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${landingImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there...</h1>
          <p className="mb-5">
            Optimize your Hospital Operations with a Smart Management Dasboard
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
