import React from "react";

const Select = ({ options }) => {
  return (
    <select className="form-control">
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
