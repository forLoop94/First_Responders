import React from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>LANDING PAGE</h1>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </div>
  );
};

export default Landing;
