import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Axios, { AxiosResponse } from "axios";
import API_URL from "./../../index";

interface Props {
  isLoggedIn: boolean;
}
type ModuleMark = {
  courseCode: string;
  student: string;
  alphanum: string;
};
export default class NavigationBar extends Component<Props> {
  handleLogout = () => {
    const POST_URL = API_URL + "/auth/logout/";
    Axios.post(`${POST_URL}`).then((response: AxiosResponse) => {
      if (response.status === 200) {
        localStorage.setItem("login", "no");
        document.location.href = "/";
      }
    });
  };

  handleAdminRedirect = () => {
    document.location.href = "/admin/";
  };

  render() {
    return (
      <nav
        className="navbar navbar-dark navbar-expand-lg"
        style={{
          backgroundColor: "#567aa8"
        }}
      >
        <div className="navLogo col-4 pr-0">
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
          <div className="col-8">
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
              <ul className="navbar-nav col-11">
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
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    View All Data
                  </a>
                  <div className="dropdown-menu">
                    <Button
                      to="/view-module-mark"
                      component={Link}
                      className="dropdown-item-module"
                    >
                      View Module Marks
                    </Button>
                    <Button
                      to="/view-final-mark"
                      component={Link}
                      className="dropdown-item-final"
                    >
                      View Final Awards
                    </Button>
                  </div>
                </li>
                <li className="nav-item adminSiteLink">
                  <Button
                    onClick={this.handleAdminRedirect}
                    className="navButton"
                  >
                    Admin Tools
                  </Button>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item logout">
                  <Button onClick={this.handleLogout} className="navButton">
                    Log Out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
