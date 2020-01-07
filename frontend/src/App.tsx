import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadStudentRoster from "./pages/UploadStudentRoster";
import UploadModuleMarks from "./pages/UploadModuleMarks";
import ViewAllData from "./pages/ViewAllData";

class App extends Component {
  render() {
    return (
      <Router>
        <Link to={"/upload-student-roster"} className="nav-link">
          Upload Student Roster
        </Link>

        <Link to={"/upload-module-marks"} className="nav-link">
          Upload Module Marks
        </Link>

        <Link to={"/view-all-data"} className="nav-link">
          View All Data
        </Link>

        <Switch>
          <Route
            exact
            path="/upload-student-roster"
            component={UploadStudentRoster}
          />
          <Route path="/upload-module-marks" component={UploadModuleMarks} />
          <Route path="/view-all-data" component={ViewAllData} />
        </Switch>
      </Router>
    );
  }
}

export default App;
