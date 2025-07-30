import React from "react";
import "cally";

const Cally: React.FC = () => {
  return (
    <>
      {React.createElement(
        "calendar-date",
        {
          className:
            "cally w-full h-100 bg-base-100 border border-base-300 shadow-lg rounded-box",
        },
        <>
          <svg
            aria-label="Previous"
            className="fill-current size-4"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next"
            className="fill-current size-4"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          {React.createElement("calendar-month")}
        </>
      )}
    </>
  );
};

export default Cally;
