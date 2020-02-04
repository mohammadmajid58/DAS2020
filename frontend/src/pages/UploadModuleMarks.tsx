import React, { Component } from "react";
import StudentModuleMarkDropZone from "../component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";
import PageTitle from "../component/usability_components/PageTitle";
import "../component/DesignElements/CentreContents.css";

class UploadModuleMarks extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Upload Module Marks" />
        <div className="d-flex justify-content-center">
          <div className="center">
            <StudentModuleMarkDropZone />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadModuleMarks;
