import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadStudentRoster from "./pages/UploadStudentRoster";
import UploadModuleMarks from "./pages/UploadModuleMarks";
import ViewAllData from "./pages/ViewAllData";
import Home from "./pages/Home";
import NavigationBar from "./component/navigation/NavigationBar";
import Footer from "./component/navigation/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/upload-student-roster"
            component={UploadStudentRoster}
          />
          <Route path="/upload-module-marks" component={UploadModuleMarks} />
          <Route path="/view-all-data" component={ViewAllData} />
        </Switch>
        <Footer/>
      </Router>
    );
  }
}

export default App;
