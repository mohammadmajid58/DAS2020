import React, { Component } from "react";
import PageTitle from "../component/usability_components/PageTitle";
import TempResetDatabase from "../component/temp_reset_database/TempResetDatabase";

class Home extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Home" />
        <TempResetDatabase />
      </div>
    );
  }
}

export default Home;
