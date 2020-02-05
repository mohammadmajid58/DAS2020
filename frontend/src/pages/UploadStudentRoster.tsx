import React, { Component } from "react";
import StudentRosterDropzone from "../component/upload_csv_files/StudentRosterDropzone/StudentRosterDropzone";
import PageTitle from "../component/usability_components/PageTitle";
import "../component/DesignElements/CentreContents.css";
class UploadStudentRoster extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Upload Student Roster" />
        <div className="d-flex justify-content-center">
          <div className="center">
            <StudentRosterDropzone />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadStudentRoster;
