import React, { Component } from "react";
import Login from "../LoginPage/Login";
import "./RequestPasswordReset.css";

interface Props {
  authenticateUser: () => void;
}

class LoginPage extends Component<Props> {
  render() {
    return (
      <div className="d-flex-inline">
        <div className="d-flex justify-content-center">
          <Login {...this.props} />
        </div>

        <div className="d-flex justify-content-center forgotten-your-password">
          <a href="/request_password_reset">Forgotten your password?</a>
        </div>
        <br />
      </div>
    );
  }
}

export default LoginPage;
