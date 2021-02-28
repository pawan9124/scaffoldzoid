import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile";
import Chart from "./Components/Chart";
import SellerList from "./Components/SellerList";
import PrivateRoute from "./validations/PrivateRoute";
import NotFound from "./Components/Reusable/NotFound";

//This check runs before the useEffect or compoent did mount to set token and currentUser store contains isAuthenticated to check the private route
if (localStorage.jwtToken) {
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //set the token if localstorage present
  setAuthToken(localStorage.jwtToken);

  //set user and isAuthenticated to check if the user is authenticated accessing the priavate route
  //
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/register" component={Register} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/profile/:id" comp={Profile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/chart/:id" comp={Chart} />
            <PrivateRoute exact path="/sellers" comp={SellerList} />
          </Switch>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
