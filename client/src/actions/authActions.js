import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//This action for auth is called when an actons happen

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/userAuth/register", userData)
      .then((res) => {
        console.log("RSPOSE", res);
        document.getElementById("registerMessage").innerHTML =
          "User Registered Successfully!";
        dispatch(loginUser(userData, history));
      })
      .catch((error) => {
        dispatch({
          type: "GET_ERRORS",
          payload: error.response.data,
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data,
    });
  }
};

//Login - Get the User token and save in the local storage
export const loginUser = (userData, history) => (dispatch) => {
  console.log("Login user here");
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
        console.log("docoded===========>", decoded);

        //Set the user
        dispatch(setCurrentUser(decoded));
        /* Checking if the user is seller or not */
        if (decoded.isSeller) {
          history.push("/profile");
        } else {
          history.push("/sellerlist");
        }
      })
      .catch((err) => {
        console.log("ERORR", err);
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data,
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data,
    });
  }
};

export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  //Remove the current user from localstorga
  localStorage.removeItem("jwtToken");
  //Remvoe auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
