import React, { Component } from "react";
import Login from "../LoginPage/Login";

class LoginPage extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <div className="d-flex justify-content-center">
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginPage;
