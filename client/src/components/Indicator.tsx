import React from "react";

interface IIndicator {
  textCol: string;
  bgCol: string;
  value: number | string;
}

const Indicator: React.FC<IIndicator> = ({ textCol, bgCol, value }) => {
  return (
    <>
      <small
        className={`px-1 text-[.5rem] tracking-widest rounded-full ${bgCol} ${textCol}`}
      >
        {value}
      </small>
    </>
  );
};

export default Indicator;
