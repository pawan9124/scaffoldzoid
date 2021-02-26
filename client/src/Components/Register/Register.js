import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import isEmpty from "../../validations/isEmpty";
import "./Register.css";
import validator from "validator";
import InputBox from "../Reusable/InputBox";
import Button from "../Reusable/Button";

function Register(props) {
  //usestate hooks from the react
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isSeller, setSeller] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerErrors] = useState({});

  useEffect(() => {
    setServerErrors(props.errors);
  }, [props.errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    /* Validating the fields with errors */
    const tempErrors = {};
    if (validator.isEmpty(username)) {
      tempErrors.username = "Please enter username";
    }
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      tempErrors.email = "Please enter valid email";
    }
    if (isEmpty(password)) {
      tempErrors.password = "Please enter password";
    }
    if (password.length < 6) {
      tempErrors.password = "Please must be greater than 6";
    }
    if (isEmpty(repassword)) {
      tempErrors.repassword = "Please re-enter password";
    }
    if (password.toLowerCase() !== repassword.toLowerCase()) {
      tempErrors.repassword = "Password entered does not match";
    }
    if (password && password.split("").length < 6) {
      tempErrors.password = "Password length should be greater than 6";
    }
    /* If the entry is valid then register */
    if (Object.keys(tempErrors).length === 0) {
      const obj = {
        username: username,
        email: email,
        password: password,
        isSeller: isSeller,
      };
      props.registerUser(obj, props.history);
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="login_logo"
        />
      </Link>
      <form>
        <div className="register__box">
          <h3>Create Account</h3>
          {/* Username input box */}
          <div className=" register_format register__name_box">
            <InputBox
              type="text"
              value={username}
              handleChange={setUsername}
              placeholder="Please enter user name"
              name="username"
              label="Username"
              errors={errors.username}
            />
          </div>
          {/* Email input box */}
          <div className=" register_format register__name_box">
            <InputBox
              type="email"
              value={email}
              handleChange={setEmail}
              placeholder="Please enter email"
              name="email"
              label="Email"
              errors={errors.email}
            />
          </div>
          {/* Password input box */}
          <div className=" register_format register__name_box">
            <InputBox
              type="password"
              value={password}
              handleChange={setPassword}
              placeholder="Please enter password"
              name="password"
              label="Password"
              errors={errors.password}
            />
            <small>Password must be greater than 6 digit</small>
          </div>
          {/* Repeat password input box */}
          <div className=" register_format register__name_box">
            <InputBox
              type="password"
              value={repassword}
              handleChange={setRePassword}
              placeholder="Please retype password"
              name="password"
              label="Retype Password"
              errors={errors.repassword}
            />
          </div>
          {/* Check box set as seller  */}
          <div className="register__seller">
            <input
              type="checkbox"
              value={isSeller}
              onClick={(e) => {
                setSeller(e.target.checked);
              }}
              className="register__checkbox"
            />
            <p>Register as a seller</p>
          </div>
          <div className="register_format register__confirmation_box">
            <Button
              type="submit"
              onClick={onSubmit}
              buttonClass="confirmation__button"
              buttonLabel="Sign Up"
            />
          </div>
          <div id="errormessage" className="register__validationErrors">
            {serverError &&
              Object.keys(serverError).map((key, index) => (
                <span key={"indexsever" + index}>{serverError[key]}</span>
              ))}
          </div>
          <div
            className="register_format register__already"
            id="registerMessage"
          ></div>
          <div className="register_format register__already">
            <p>Already have an account?</p>
            <Link to="/">Sign in ➤</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
