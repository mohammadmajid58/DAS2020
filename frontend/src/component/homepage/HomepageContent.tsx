import React from "react";
import "./HomepageContent.css";

interface Props {
  date: String;
  username: String;
}

class HomepageContent extends React.Component<Props> {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="pt-5">
          <p>{this.props.date}</p>
          <p>Hello {this.props.username},</p>
          <p>Welcome to DAS 2020.</p>
          <p>
            Use the navigation options above to upload or view student data.
          </p>

          <p>
            For guidance on how to use the system, view the documentation{" "}
            <u>here</u>.
          </p>

          <p>
            To report a problem, contact your <u>system administrator</u>.
          </p>
        </div>
      </div>
    );
  }
}

export default HomepageContent;
