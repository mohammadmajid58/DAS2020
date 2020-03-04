import React from "react";
import "./HomepageContent.css";
import { Timeline } from "react-twitter-widgets";

interface Props {
  date: String;
  username: String;
}

class HomepageContent extends React.Component<Props> {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="left">
          <div className="pt-5">
            <p className="home-text">
              {this.props.date}
              <br />
              <br />
              Hello {this.props.username},
              <br />
              Welcome to DAS 2020.
              <br />
              <br />
              Use the navigation options above to upload or view student data.
              <br />
            </p>
            <p className="home-text">
              For guidance on how to use the system, view the documentation{" "}
              <u>here</u>.<br />
              To report a problem, contact your <u>system administrator</u>.
            </p>
          </div>
        </div>
        <div className="right">
          <Timeline
            dataSource={{ sourceType: "profile", screenName: "UofGChem" }}
            options={{
              userName: "UofGChem",
              height: "400",
              width: "350",
              margin: 0.25
            }}
          />
        </div>
      </div>
    );
  }
}

export default HomepageContent;
