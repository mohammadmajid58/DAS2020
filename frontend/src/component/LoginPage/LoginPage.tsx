import React, { Component } from "react";
import Login from "../LoginPage/Login";

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
      </div>
    );
  }
}

export default LoginPage;
