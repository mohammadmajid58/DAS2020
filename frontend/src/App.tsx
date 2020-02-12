import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import UploadStudentRoster from "./pages/UploadStudentRoster";
import UploadModuleMarks from "./pages/UploadModuleMarks";
import ViewAllData from "./pages/ViewAllData";
import Home from "./pages/Home";
import LoginPage from "./component/LoginPage/LoginPage";
import NavigationBar from "./component/navigation/NavigationBar";
import Footer from "./component/navigation/Footer";
import PrivateRoute from "./component/helperComponents/PrivateRoute";
import { isLoggedIn } from "./abstract_functions";

interface State {
  isAuthenticated: boolean;
}

class App extends Component<{}, State> {
  state = { isAuthenticated: false };

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

  render() {
    return (
      <Router>
        <NavigationBar isLoggedIn={this.state.isAuthenticated} />
        <Switch>
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
          />
          <PrivateRoute
            exact
            path="/upload-module-marks"
            component={UploadModuleMarks}
            isAuthenticated={this.state.isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/view-all-data"
            component={ViewAllData}
            isAuthenticated={this.state.isAuthenticated}
          />
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
    );
  }
}

export default App;
