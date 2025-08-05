import React from "react";

interface FormRowProps {
  type: string;
  name: string;
  labelText: string;
  waterMark: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: React.FC<FormRowProps> = ({
  type,
  name,
  labelText,
  waterMark,
  onChange,
}) => {
  return (
    <div className="fieldset">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="input"
        defaultValue={waterMark || ""}
        onChange={onChange}
        autoComplete={type === "password" ? "current-password" : "on"}
        required
      />
    </div>
  );
};

export default FormRow;
