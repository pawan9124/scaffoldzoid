import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
// import Profile from './Components/Profile/Profile';

function App() {
  useEffect(() => {
    //check the authetication of the user
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      //Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);

      //set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));

      //check if the token expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //logout user
        store.dispatch(logoutUser());
        //Redirect to login
        window.location.href = "/";
      }
    }
  }, [localStorage.jwtToken]);
  return (
    //BEM convention
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {/* <Route path="/profile/:id">
              <Profile />
            </Route> */}
            <Route path="/">
              {" "}
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
