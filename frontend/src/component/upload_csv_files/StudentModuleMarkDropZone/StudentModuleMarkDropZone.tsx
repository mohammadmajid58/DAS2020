import React from "react";
import StudentDropZone from "../DropZone/StudentDropZone";
import { getDropZoneUtils, handleFileUpload } from "../DropZone/dropUtils";

type FailedFile = {
  filename: string;
  reason: string;
};

interface State {
  numOfFilesUploaded: number;
  uploading: boolean;
  files: File[];
  errorMessage: string;
  fileNamesUploadedSuccessfully: string[];
  filesFailedToUpload: FailedFile[];
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
      errorMessage: "",
      fileNamesUploadedSuccessfully: [],
      filesFailedToUpload: []
    };
  }

  storeSuccessfullyUploadedFile(filename: string) {
    this.setState({
      fileNamesUploadedSuccessfully: this.state.fileNamesUploadedSuccessfully.concat(
        [filename]
      )
    });
  }

  storeFailedToUploadFile(filename: string, reason: string) {
    const invalidFileNames = this.state.filesFailedToUpload.map(file => {
      return file.filename;
    });
    const invalidFileReasons = this.state.filesFailedToUpload.map(file => {
      return file.reason;
    });
    const alreadyExists = invalidFileNames.includes(filename);
    const sameReason = invalidFileReasons.includes(reason);

    if (!alreadyExists || (alreadyExists && !sameReason && reason.length > 0)) {
      this.setState({
        filesFailedToUpload: this.state.filesFailedToUpload.concat([
          {
            filename: filename,
            reason: reason
          }
        ])
      });
    }
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
      this.props.hideOverlay,
      this.storeSuccessfullyUploadedFile.bind(this),
      this.storeFailedToUploadFile.bind(this)
    )
      .then(() => {
        hideOverlay();
      })
      .catch(() => {
        hideOverlay();
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

    const successfullyUploadedMessage = this.state.fileNamesUploadedSuccessfully.map(
      name => {
        return <p>{name}</p>;
      }
    );

    const failedToUploadMessage = this.state.filesFailedToUpload.map(file => {
      return (
        <p>
          <strong>{file.filename}</strong> - {file.reason}
        </p>
      );
    });

    return (
      <div>
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
        <br />

        <div>
          {this.state.fileNamesUploadedSuccessfully.length > 0 && (
            <div>
              <h5>Files Successfully Uploaded:</h5>
              {successfullyUploadedMessage}
            </div>
          )}
          <br />
          {this.state.filesFailedToUpload.length > 0 && (
            <div>
              <h5>Files Failed to Upload:</h5>
              {failedToUploadMessage}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StudentModuleMarkDropZone;
