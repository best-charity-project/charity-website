import React from "react";
import "./CharityInput.css";

const CharityInput = ({ name, label, isSelect, options, error, ...rest }) => {
  return (
    <div className="charity-input-container">
      <label className="charity-label" htmlFor={name}>
        {label}:
      </label>
      {!isSelect && (
        <input {...rest} name={name} id={name} className="charity-input" />
      )}
      {isSelect && (
        <select name={name} id={name} {...rest} className="charity-input">
          <option value="" />
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
      )}
      {error && (
        <div className="charity-alert charity-alert-danger">{error}</div>
      )}
    </div>
  );
};

export default CharityInput;
