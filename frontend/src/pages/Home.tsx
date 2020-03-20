import React, { Component } from "react";
import PageTitle from "../component/usability_components/PageTitle";
import HomepageContent from "../component/homepage/HomepageContent";
import { getDate, getUsername } from "../abstract_functions";

interface State {
  date: String;
  username: String;
}

class Home extends Component<{}, State> {
  state = { date: "", username: "" };

  componentDidMount() {
    const currentDate = getDate();
    getUsername().then(username => {
      this.setState({ date: currentDate, username: username });
    });
  }

  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Home" />
        <HomepageContent
          date={this.state.date}
          username={this.state.username}
        />
      </div>
    );
  }
}

export default Home;
