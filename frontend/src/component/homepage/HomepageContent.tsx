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
            For guidance on how to use the system, you can view and download the
            documentation{" "}
            <u>
              <a href="https://github.com/mohammadmajid58/DAS2020/blob/master/DAS2020_User_Guide_V1.pdf">
                here
              </a>
            </u>
            .
          </p>

          <p>To report a problem, contact your system administrator.</p>
        </div>
      </div>
    );
  }
}

export default HomepageContent;
