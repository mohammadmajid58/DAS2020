import React, { Component } from "react";
import StudentRosterDropzone from "../component/upload_csv_files/StudentRosterDropzone/StudentRosterDropzone";

class UploadStudentRoster extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <div className="d-flex justify-content-center">
          <StudentRosterDropzone />
        </div>
      </div>
    );
  }
}

export default UploadStudentRoster;
