import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // THE API {Cloud function url} URL
});

export default instance;
