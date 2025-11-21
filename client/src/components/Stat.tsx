import React from "react";

interface IStatProps {
  bg: string;
}

const bgClassMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  carton: "bg-[#E7C2DA]",
  lilac: "bg-[#CE93FA]",
};

const Stat: React.FC<IStatProps> = ({ bg }) => {
  return (
    <>
      <div className={`stats ${bgClassMap[bg]} shadow`}>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
    </>
  );
};

export default Stat;
