import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import UploadStudentRoster from "./pages/UploadStudentRoster";
import UploadModuleMarks from "./pages/UploadModuleMarks";
import Home from "./pages/Home";
import LoginPage from "./component/LoginPage/LoginPage";
import NavigationBar from "./component/navigation/NavigationBar";
import Footer from "./component/navigation/Footer";
import GetModuleMarkUnit from "./component/combined_elements/GetModuleMarkUnit";
import GetFinalDataUnit from "./component/combined_elements/GetFinalDataUnit";
import PrivateRoute from "./component/helperComponents/PrivateRoute";
import { isLoggedIn } from "./abstract_functions";
import PasswordReset from "./component/PasswordReset/PasswordReset";
import RequestPasswordReset from "./component/PasswordReset/RequestPasswordReset";
import { FadeLoader } from "react-spinners";

interface State {
  isAuthenticated: boolean;
  showOverlay: boolean;
}

class App extends Component<{}, State> {
  state = { isAuthenticated: false, showOverlay: false };

  componentDidMount() {
    isLoggedIn().then(response => {
      if (response === true) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  authenticateUser = () => {
    this.setState({ isAuthenticated: true });
  };

  showOverlay = () => {
    this.setState({ showOverlay: true });
  };

  hideOverlay = () => {
    this.setState({ showOverlay: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showOverlay && (
          <div className="overlay">
            <div className="inner-overlay d-flex justify-content-center">
              <FadeLoader color={"#fcad03"} loading={true} height={"20px"} />
            </div>
          </div>
        )}

        <Router>
          <NavigationBar isLoggedIn={this.state.isAuthenticated} />
          <Switch>
            <Route
              path="/password/reset/:uid/:token"
              component={PasswordReset}
              isAuthenticated={this.state.isAuthenticated}
            />
            <Route
              path="/request_password_reset"
              component={RequestPasswordReset}
              isAuthenticated={this.state.isAuthenticated}
            />
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={this.state.isAuthenticated}
            />
            <PrivateRoute
              exact
              path="/upload-student-roster"
              component={UploadStudentRoster}
              isAuthenticated={this.state.isAuthenticated}
            >
              <UploadStudentRoster
                showOverlay={this.showOverlay.bind(this)}
                hideOverlay={this.hideOverlay.bind(this)}
              />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/upload-module-marks"
              isAuthenticated={this.state.isAuthenticated}
            >
              <UploadModuleMarks
                showOverlay={this.showOverlay.bind(this)}
                hideOverlay={this.hideOverlay.bind(this)}
              />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/view-final-mark"
              isAuthenticated={this.state.isAuthenticated}
            >
              <GetFinalDataUnit
                showOverlay={this.showOverlay.bind(this)}
                hideOverlay={this.hideOverlay.bind(this)}
              />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/view-module-mark"
              isAuthenticated={this.state.isAuthenticated}
            >
              <GetModuleMarkUnit
                showOverlay={this.showOverlay.bind(this)}
                hideOverlay={this.hideOverlay.bind(this)}
              />
            </PrivateRoute>

            <PrivateRoute
              exact
              path="/login"
              isAuthenticated={this.state.isAuthenticated}
            >
              <LoginPage authenticateUser={this.authenticateUser.bind(this)} />
            </PrivateRoute>
            <PrivateRoute
              path="/"
              component={Home}
              isAuthenticated={this.state.isAuthenticated}
            />
          </Switch>
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
