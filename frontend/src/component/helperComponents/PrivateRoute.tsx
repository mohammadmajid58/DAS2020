import React, { Component } from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

const isLoginComponent = (path: string | string[]) => {
  return path === "/login";
};

interface Props extends RouteProps {
  isAuthenticated: boolean;
}

export default class PrivateRoute extends Component<Props> {
  render() {
    const { component, isAuthenticated, ...rest } = this.props;

    if (!isAuthenticated) {
      return isLoginComponent(rest.path!) ? (
        <Route {...rest} component={component} />
      ) : (
        <Redirect to="/login" />
      );
    } else {
      return isLoginComponent(rest.path!) ? (
        <Redirect to="/" />
      ) : (
        <Route {...rest} component={component} />
      );
    }
  }
}
