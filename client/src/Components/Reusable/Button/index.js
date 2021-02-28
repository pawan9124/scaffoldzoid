import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Button(props) {
  return (
    <button
      data-test="buttonComponent"
      className={`btn  ${props.buttonClass}`}
      onClick={props.onClick}
      data-toggle={props.dataToggle}
      data-target={props.dataTarget}
      data-dismiss={props.dataDismiss}
      id={props.id}
    >
      {props.buttonLabel}
      <span className="btn-icon">{props.icon}</span>
    </button>
  );
}

Button.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Button;
