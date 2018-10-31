import React from "react";
import "./CharityInput.css";

const CharityInput = ({ name, label, error, ...rest }) => {
  return (
    <div className="charity-input-container">
      <label className="charity-label" htmlFor={name}>
        {label}:
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="charity-input"
      />
      {error && <div className="charity-alert charity-alert-danger">{error}</div>}
    </div>
  );
};

export default CharityInput;
