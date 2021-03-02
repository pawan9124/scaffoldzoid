import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import AlertBar from "../Components/Reusable/AlertBar";

/* 
  Register of the user action from the register component
*/
export const registerUser = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/userAuth/register", userData)
      .then((res) => {
        document.getElementById("registerMessage").innerHTML =
          "User Registered Successfully!";
        dispatch(loginUser(userData, history));
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: true,
            opentAlertBox: true,
            message: "Registration Successful!",
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ERRORS",
          payload: error.response.data,
        });
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: false,
            opentAlertBox: true,
            message: "Registration Failed!",
          },
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Registration Failed!",
      },
    });
  }
};

/* 
  Login of the user action from the Login component
*/
export const loginUser = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/userAuth/login", userData)
      .then((res) => {
        //Save to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        //Decoded the token to get the user data
        const decoded = jwt_decode(token);

        //Set the user
        dispatch(setCurrentUser(decoded));
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: true,
            opentAlertBox: true,
            message: "Login Successful",
          },
        });
        /* Checking if the user is seller or not */
        if (decoded.isSeller) {
          setTimeout(() => {
            history.push(`/profile/${decoded.id}`);
          });
        } else {
          history.push("/sellers");
        }
      })
      .catch((err) => {
        console.log("ERRO", err, err.response.data);
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data,
        });
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: false,
            opentAlertBox: true,
            message: "Login Failed!",
          },
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Login Failed!",
      },
    });
  }
};

/* 
  Set the Current user to get information
*/
export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};

/* 
  Logout the user and remove local storage
*/
export const logoutUser = () => (dispatch) => {
  //Remove the current user from localstorga
  localStorage.removeItem("jwtToken");
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
