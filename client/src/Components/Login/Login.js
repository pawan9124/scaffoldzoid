import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import validator from "validator";
import { loginUser } from "../../actions/authActions";
import { connect, useDispatch } from "react-redux";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  /* Hooks to dispatch the action */
  const dispatchProps = useDispatch();

  /* Login function dispatch action */
  const signIn = (e) => {
    const tempErrors = {};
    e.preventDefault();
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      tempErrors.email = "Please enter valid email";
    }
    if (validator.isEmpty(password)) {
      tempErrors.password = "Please enter password";
    }

    if (Object.keys(tempErrors).length === 0) {
      const loginObj = {
        email,
        password,
      };
      dispatchProps(loginUser(loginObj, history));
    } else {
      setErrors(tempErrors);
    }
  };

  const register = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="login_logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <small className="login__validationErrors">{errors.email}</small>
          )}
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <small className="login__validationErrors">{errors.password}</small>
          )}
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON CLONE <a href="#">Conditions</a>{" "}
          of Use & Sale. Please see our Privacy Notice, our Cookies{" "}
          <a href="#">Notice</a> and our <a href="#">Interest-Based Ads</a>{" "}
          Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default withRouter(Login);
