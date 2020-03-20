import React, { Component } from "react";
import StudentRosterDropzone from "../component/upload_csv_files/StudentRosterDropzone/StudentRosterDropzone";
import PageTitle from "../component/usability_components/PageTitle";
import "../component/DesignElements/CentreContents.css";

type Props = {
  showOverlay: () => void;
  hideOverlay: () => void;
};

class UploadStudentRoster extends Component<Props> {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Upload Student Roster" />
        <div className="d-flex justify-content-center">
          <div className="center w-75 mx-auto">
            <StudentRosterDropzone
              showOverlay={this.props.showOverlay}
              hideOverlay={this.props.hideOverlay}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadStudentRoster;
