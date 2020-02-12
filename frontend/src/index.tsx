import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
import { getCookie } from "./abstract_functions";

Axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

// let API_URL = "http://teamdas123.pythonanywhere.com";
// if (process.env.NODE_ENV === "development") {
const API_URL = "http://127.0.0.1:8000";
// }

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
