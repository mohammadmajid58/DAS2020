import React, { Component } from "react";
import PageTitle from "../component/usability_components/PageTitle";
import TempResetDatabase from "../component/temp_reset_database/TempResetDatabase";
import HomepageContent from "../component/homepage/HomepageContent";

class Home extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Home" />
        <HomepageContent/>
        <TempResetDatabase />
      </div>
    );
  }
}

export default Home;
