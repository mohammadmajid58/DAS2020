import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navigationBar px-0">
        <div className="navLogo col-3 pr-0">
          <img
            src={require("./uog_logo.png")}
            alt="University of Glasgow Logo"
            width={250}
            height={70}
          />
        </div>

        <ul className="d-flex justify-content-between col-6">
          <li className="nav-item rosterUploadLink">
            <Button
              to="/upload-student-roster"
              component={Link}
              className="navButton"
            >
              Upload Student Roster
            </Button>
          </li>
          <li className="mx-10 nav-item marksUploadLink">
            <Button
              to="/upload-module-marks"
              component={Link}
              className="navButton"
            >
              Upload Module Marks
            </Button>
          </li>

          <li className="nav-item allDataUploadLink">
            <Button to="/view-all-data" component={Link} className="navButton">
              View All Data
            </Button>
          </li>
        </ul>

        <div className="col-3"></div>
      </nav>
    );
  }
}
