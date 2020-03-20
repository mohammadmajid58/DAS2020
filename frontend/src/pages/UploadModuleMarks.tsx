import React, { Component } from "react";
import StudentModuleMarkDropZone from "../component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";
import PageTitle from "../component/usability_components/PageTitle";
import "../component/DesignElements/CentreContents.css";

type Props = {
  showOverlay: () => void;
  hideOverlay: () => void;
};

class UploadModuleMarks extends Component<Props> {
  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Upload Module Marks" />
        <div className="d-flex justify-content-center">
          <div className="center w-75 mx-auto">
            <StudentModuleMarkDropZone
              showOverlay={this.props.showOverlay}
              hideOverlay={this.props.hideOverlay}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadModuleMarks;
