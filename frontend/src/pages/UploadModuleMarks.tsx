import React, { Component } from "react";
import StudentModuleMarkDropZone from "../component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";
import PageTitle from "../component/usability_components/PageTitle";

class UploadModuleMarks extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Upload Module Marks" />
        <div className="d-flex justify-content-center">
          <StudentModuleMarkDropZone />
        </div>
      </div>
    );
  }
}

export default UploadModuleMarks;
