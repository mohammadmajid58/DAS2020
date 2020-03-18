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

class StudentRosterDropzone extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      numOfFilesUploaded: 0,
      uploading: false,
      files: [],
      errorMessage: ""
    };
    this.uploadFiles = this.uploadFiles.bind(this);
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
      false,
      () => {
        this.setState({
          uploading: true,
          numOfFilesUploaded: this.state.numOfFilesUploaded + 1
        });
      },
      this.props.hideOverlay
    )
      .then(() => {
        hideOverlay();
      })
      .catch(error => {
        hideOverlay();

        const responseErrors = error.response.data;
        let errorOccurred = false;
        let errorMessage = "";

        for (var studentError of responseErrors) {
          if ("matricNo" in studentError) {
            let studentAlreadyExists = "";
            if (studentError.matricNo[0].includes("already exists")) {
              studentAlreadyExists =
                "This is because this student already exists in the system. \n\n";
            }
            errorMessage =
              "A file you are trying to upload contains an invalid matriculation number. \n" +
              studentAlreadyExists +
              "The matriculation number is required, it must be numeric with exactly 7 digits.";
            errorOccurred = true;
            break;
          }

          if ("givenNames" in studentError || "surname" in studentError) {
            errorMessage =
              "A file you are trying to upload contains an invalid student name. \n" +
              'The student name is required, it must be of the following format: "surname, givenNames"'; // eslint-disable-line quotes
            errorOccurred = true;
            break;
          }

          if ("academicPlan" in studentError) {
            errorMessage =
              "A file you are trying to upload contains a student on an academic plan that does not exist. \n" +
              "You must first create the academic plan on the admin site.";
            errorOccurred = true;
            break;
          }

          if ("gradYear" in studentError) {
            errorMessage =
              "A file you are trying to upload contains a student on a graduation year that does not exist. \n" +
              "You must first create the graduation year on the admin site.";
            errorOccurred = true;
            break;
          }
        }
        if (errorOccurred) {
          alert(
            "An error has occurred, no CSV files have been uploaded, please see below for details. \n \n" +
              errorMessage
          );
        }
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
      errorOccured,
      fileUploaded,
      totalNumOfFiles
    } = getDropZoneUtils(this.state);

    return (
      <StudentDropZone
        uploadStarted={uploadStarted}
        uploadComplete={uploadComplete}
        numOfFilesUploaded={this.state.numOfFilesUploaded}
        fileUploaded={fileUploaded}
        errorOccured={errorOccured}
        uploading={this.state.uploading}
        filesHandler={this.filesHandler}
        totalNumOfFiles={totalNumOfFiles}
        errorMessage={this.state.errorMessage}
        uploadFiles={this.uploadFiles}
      />
    );
  }
}

export default StudentRosterDropzone;
