import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
import { getCookie } from "./abstract_functions";

Axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

const DEV_URL = "http://127.0.0.1:8000";
const STAGING_URL = "http://teamdas123.pythonanywhere.com";

const ENVIRONMENT = process.env.REACT_APP_STAGE;

let API_URL: string;
if (ENVIRONMENT === "dev") {
  API_URL = DEV_URL;
} else {
  API_URL = STAGING_URL;
}

export default API_URL;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
