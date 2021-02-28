import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";
if (localStorage.jwtToken) {
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
} else {
  delete axios.defaults.headers.common["Authorization"];
}
export default axios;
