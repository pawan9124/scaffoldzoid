import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import profileReducers from "./profileReducers";
import rateReducers from "./rateReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  profile: profileReducers,
  rates: rateReducers,
});
