import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function InputBox(props) {
  return (
    <>
      <label
        htmlFor=""
        className="reigster__name_label"
        data-test="inputBoxComponent"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className={`form-control register__name_input ${props.inputClassName} `}
        data-test="InputBoxComponent"
        id={props.id}
        placeholder={props.placeholder}
        onChange={(e) => props.handleChange(e.target.value)}
        name={props.name}
        value={props.value}
        disabled={props.disabledMode}
      />
      {props.errors && (
        <small className="register__validationErrors">{props.errors}</small>
      )}
    </>
  );
}

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InputBox;
