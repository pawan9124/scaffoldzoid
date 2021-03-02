import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import profileReducers from "./profileReducers";
import rateReducers from "./rateReducers";
import alertReducers from "./alertReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  profile: profileReducers,
  rates: rateReducers,
  alert: alertReducers,
});
