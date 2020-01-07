import React, { Component } from "react";
import StudentModuleMarkDropZone from "../component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";

class UploadModuleMarks extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <div className="d-flex justify-content-center">
          <StudentModuleMarkDropZone />
        </div>
      </div>
    );
  }
}

export default UploadModuleMarks;
