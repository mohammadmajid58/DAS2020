import React from "react";
import StudentDropZone from "../DropZone/StudentDropZone";
import { getDropZoneUtils, handleFileUpload } from "../DropZone/dropUtils";

interface State {
  numOfFilesUploaded: number;
  uploading: boolean;
  files: File[];
  errorMessage: string;
}

type Props = {
  showOverlay: () => void;
  hideOverlay: () => void;
};

class StudentModuleMarkDropZone extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      numOfFilesUploaded: 0,
      uploading: false,
      files: [],
      errorMessage: ""
    };
  }

  uploadFiles() {
    const files = this.state.files;
    const hideOverlay = this.props.hideOverlay;

    if (files.length === 0) {
      this.setState({
        errorMessage: "No files to upload"
      });
      return;
    }
    this.props.showOverlay();

    handleFileUpload(
      files,
      true,
      () => {
        this.setState(state => {
          return {
            uploading: true,
            numOfFilesUploaded: state.numOfFilesUploaded + 1
          };
        });
      },
      this.props.hideOverlay
    )
      .then((response: boolean) => {
        console.log({ response });
        hideOverlay();
      })
      .catch(function(error) {
        hideOverlay();
        alert("Error occured");
        console.log(error);
      });
  }

  filesHandler = (files: File[]) => {
    this.setState({
      files: files
    });
  };

  render() {
    const {
      uploadComplete,
      uploadStarted,
      numOfFilesUploaded,
      errorOccured,
      fileUploaded,
      totalNumOfFiles
    } = getDropZoneUtils(this.state);
    return (
      <StudentDropZone
        uploadStarted={uploadStarted}
        uploadComplete={uploadComplete}
        numOfFilesUploaded={numOfFilesUploaded}
        fileUploaded={fileUploaded}
        errorOccured={errorOccured}
        uploading={this.state.uploading}
        filesHandler={this.filesHandler}
        totalNumOfFiles={totalNumOfFiles}
        errorMessage={this.state.errorMessage}
        uploadFiles={this.uploadFiles.bind(this)}
      />
    );
  }
}

export default StudentModuleMarkDropZone;
