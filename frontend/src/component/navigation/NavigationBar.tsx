import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Axios, { AxiosResponse } from "axios";
import API_URL from "./../../index";
import "./NavigationBar.css";

import { Link } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";

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
        className="navbar navbar-expand-lg navbar-dark static-top"
        style={{
          backgroundColor: "#567aa8"
        }}
      >
        {!this.props.isLoggedIn && (
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src={require("./uog_logo.jpg")}
                alt="University of Glasgow Logo"
                width={160}
                height={44}
              />
            </a>
          </div>
        )}
        {this.props.isLoggedIn && (
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src={require("./uog_logo.jpg")}
                alt="University of Glasgow Logo"
                width={160}
                height={44}
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto mx-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbardrop"
                    data-toggle="dropdown"
                    data-cy="upload-data-dropdown"
                  >
                    Upload CSV
                  </a>
                  <div className="dropdown-menu">
                    <ButtonBase
                      to="/upload-student-roster"
                      component={Link}
                      className="dropdown-item"
                      data-cy="upload-student-roster"
                    >
                      Student Roster
                    </ButtonBase>
                    <ButtonBase
                      to="/upload-module-marks"
                      component={Link}
                      className="dropdown-item"
                      data-cy="upload-module-marks"
                    >
                      Module Marks
                    </ButtonBase>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbardrop"
                    data-toggle="dropdown"
                    data-cy="view-data-dropdown"
                  >
                    View Data
                  </a>
                  <div className="dropdown-menu">
                    <ButtonBase
                      to="/view-module-mark"
                      component={Link}
                      className="dropdown-item"
                      data-cy="view-module-marks"
                    >
                      Module Marks
                    </ButtonBase>
                    <ButtonBase
                      to="/view-final-mark"
                      component={Link}
                      className="dropdown-item"
                      data-cy="view-final-awards"
                    >
                      Final Awards
                    </ButtonBase>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-0">
                <li className="nav-item">
                  <a className="nav-link" href="/admin/">
                    Admin Tools
                  </a>
                </li>

                <li className="nav-item">
                  <a onClick={this.handleLogout} className="nav-link" href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
