import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

interface Props {
  isLoggedIn: boolean;
}
export default class NavigationBar extends Component<Props> {
  render() {
    return (
      <nav
        className="navbar navbar-dark navbar-expand-lg"
        style={{
          backgroundColor: "#567aa8"
        }}
      >
        <div className="navLogo col-3 pr-0">
          <a href="/">
            <img
              src={require("./uog_logo.jpg")}
              alt="University of Glasgow Logo"
              width={160}
              height={44}
            />
          </a>
        </div>
        {this.props.isLoggedIn && (
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
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
              <Button
                to="/view-all-data"
                component={Link}
                className="navButton"
              >
                View All Data
              </Button>
            </li>
            <li className="nav-item adminSiteLink">
              <button>
                <a href="/admin/">Admin Tools</a>
              </button>
            </li>
          </ul>
        </div>
        )}
      </nav>
    );
  }
}
