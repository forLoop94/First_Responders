import React from "react";

interface Props {
  text: string;
}

const LoadingButton: React.FC<Props> = ({ text }) => {
  return (
    <span className="flex items-center gap-2">
      {`${text}...`}
      <span className="loading loading-spinner text-primary"></span>
    </span>
  );
};

export default LoadingButton;
