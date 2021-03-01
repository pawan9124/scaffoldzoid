import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import validator from "validator";
import { loginUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../Reusable/InputBox";
import Button from "../Reusable/Button";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const serverError = useSelector((state) => {
    return state.errors;
  });

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
    <div className="login" data-test="LoginComponent">
      <Link to="/">
        <img
          className="login__logo"
          src="https://i.ibb.co/Yh5NhSw/Untitled-1-1.png"
          alt="login_logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <div>
            <InputBox
              type="email"
              value={email}
              handleChange={setEmail}
              placeholder="Please enter email"
              name="email"
              label="E-mail"
              errors={errors.email}
            />
          </div>
          <br></br>
          <div>
            <InputBox
              type="password"
              value={password}
              handleChange={setPassword}
              placeholder="Please enter password"
              name="password"
              label="Password"
              errors={errors.password}
            />
          </div>
          <br></br>
          <div>
            <Button
              type="submit"
              onClick={signIn}
              buttonClass="login__signInButton"
              buttonLabel="Sign In"
            />
          </div>
        </form>
        <br></br>
        <div id="errormessage" className="register__validationErrors">
          {serverError &&
            Object.keys(serverError).map((key, index) => (
              <span key={"indexsever" + index}>{serverError[key]}</span>
            ))}
        </div>
        <p>
          By signing-in you agree to the SCAFFOLDZOID INC.{" "}
          <a href="#">Conditions</a> of Use & Sale. Please see our Privacy
          Notice, our Cookies <a href="#">Notice</a> and our{" "}
          <a href="#">Interest-Based Ads</a> Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your SCAFFOLDZOID account
        </button>
      </div>
    </div>
  );
}

export default withRouter(Login);
