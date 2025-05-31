import React from "react";

type CardProps = React.PropsWithChildren;

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
