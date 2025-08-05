import React from "react";

interface FormRowSelectProps {
  name: string;
  labelText: string;
  list: string[];
  waterMark: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  name,
  labelText,
  list,
  waterMark = "",
  onChange,
}) => {
  return (
    <div className="fieldset">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="select select-bordered"
        defaultValue={waterMark}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
