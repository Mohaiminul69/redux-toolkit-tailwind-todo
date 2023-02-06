import axios from "axios";

let URL;

switch (process.env.REACT_APP_ENVIORNMENT) {
  case "DEVELOPMENT":
    URL = "https://jsonplaceholder.typicode.com";
    break;
  case "PRODUCTION":
    URL = "production.com";
    break;
  default:
    URL = "https://jsonplaceholder.typicode.com";
}

const instance = axios.create({
  baseURL: URL,
});

export default instance;
