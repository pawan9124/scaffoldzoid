import axios from "axios";
axios.defaults.baseURL = "https://scaffoldzoidasignment.herokuapp.com/";
if (localStorage.jwtToken) {
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
} else {
  delete axios.defaults.headers.common["Authorization"];
}
export default axios;
