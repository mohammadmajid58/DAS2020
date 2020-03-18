import React, { Component } from "react";
import "./DropZone.css";
import Dropzone from "react-dropzone";
import Alert from "../../alerts/Alert";
import Box from "@material-ui/core/Box";
import AddedFile from "../AddedFile/AddedFile";
import { Divider } from "@material-ui/core";

interface DropZoneProps {
  validFileExtensions: string[];
  filesHandler: (files: File[]) => void;
}

interface DropZoneState {
  files: File[];
  newFileState?: newFileState;
  showAlert: boolean;
  showAlertTimestamp: number;
  fileName: string;
}

enum newFileState {
  accepted,
  alreadyUploaded,
  invalidFormat,
  deleted
}

class DropZone extends Component<DropZoneProps, DropZoneState> {
  constructor(props: DropZoneProps) {
    super(props);
    this.state = {
      files: [],
      newFileState: undefined,
      showAlert: false,
      showAlertTimestamp: Date.now(),
      fileName: ""
    };
  }

  updateStateForInvalidFilenameExtensions = (invalidFileNames: string[]) => {
    const names: string = invalidFileNames.join(", ");
    this.setState({
      newFileState: newFileState.invalidFormat,
      showAlert: true,
      showAlertTimestamp: Date.now(),
      fileName: "The following files: " + names
    });
  };

  updateStateForFileAlreadyExists = (fileName: string) => {
    this.setState({
      newFileState: newFileState.alreadyUploaded,
      showAlertTimestamp: Date.now(),
      fileName: fileName
    });
  };

  updateStateForFileAddedSuccessfully = (newFiles: File[]) => {
    this.setState({
      files: newFiles,
      newFileState: newFileState.accepted,
      showAlert: true,
      showAlertTimestamp: Date.now(),
      fileName: newFiles[newFiles.length - 1].name
    });
  };

  updateStateforFileBeingRemoved = (newFiles: File[], fileName: string) => {
    this.setState({
      files: newFiles,
      newFileState: newFileState.deleted,
      showAlertTimestamp: Date.now(),
      fileName: fileName
    });
  };

  onDrop = (files: File[]) => {
    const validFileExtensions = this.props.validFileExtensions;
    const filesHandler = this.props.filesHandler;

    const filesWithInvalidExtension = [];
    for (var file of files) {
      var hasValidFileExtension = false;
      for (var extension of validFileExtensions) {
        if (file.name.endsWith(extension)) {
          hasValidFileExtension = true;
        }
      }
      if (!hasValidFileExtension) {
        filesWithInvalidExtension.push(file.name);
      }
    }

    if (filesWithInvalidExtension.length > 0) {
      this.updateStateForInvalidFilenameExtensions(filesWithInvalidExtension);
      return;
    }

    const existingFileNames: String[] = this.state.files.map(
      (file: File) => file.name
    );
    const newlyUpdatedFileNames = files.map((file: File) => file.name);
    let foundBadFile = false;

    for (var f of newlyUpdatedFileNames) {
      const alreadyExists = existingFileNames.includes(f);
      if (alreadyExists) {
        foundBadFile = true;
        this.updateStateForFileAlreadyExists(
          f +
            " is already waiting to be uploaded, as a result, none of the files that were selecteddropped are ready to be uploaded"
        );
      }
    }

    if (!foundBadFile) {
      const newFiles = this.state.files.concat(files);
      filesHandler(newFiles);
      this.updateStateForFileAddedSuccessfully(newFiles);
    }
  };

  removeAddedFile = (fileName: string) => {
    const newFiles = this.state.files.filter((file: File) => {
      return file.name !== fileName;
    });
    this.props.filesHandler(newFiles);
    this.updateStateforFileBeingRemoved(newFiles, fileName);
  };

  render() {
    const files = this.state.files.map((file: File) => (
      <div key={file.name}>
        <Divider />
        <AddedFile name={file.name} removeAddedFile={this.removeAddedFile} />
      </div>
    ));

    const showAlert = this.state.showAlert;
    const showAlertTimestamp = this.state.showAlertTimestamp;

    let alert;
    let msg;
    const fileName = this.state.fileName;

    if (this.state.newFileState === newFileState.accepted) {
      msg = fileName + " is ready to be uploaded";
      alert = <Alert key={showAlertTimestamp} message={msg} type="success" />;
    } else if (this.state.newFileState === newFileState.alreadyUploaded) {
      msg = fileName + " is already waiting to be uploaded";
      alert = <Alert key={showAlertTimestamp} message={msg} type="warning" />;
    } else if (this.state.newFileState === newFileState.invalidFormat) {
      msg = fileName + " are of invalid format";
      alert = <Alert key={showAlertTimestamp} message={msg} type="error" />;
    } else if (this.state.newFileState === newFileState.deleted) {
      msg = fileName + " will not be uploaded";
      alert = <Alert key={showAlertTimestamp} message={msg} type="info" />;
    }

    return (
      <div>
        <Box boxShadow={1} className="drop-zone-box">
          <Dropzone onDrop={this.onDrop} multiple>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div className="drop-zone-container">
                <section className="">
                  <div {...getRootProps({ className: "drop-zone-element" })}>
                    <input data-cy="drop-zone-input" {...getInputProps()} />
                    {isDragActive && <p>Drop files here</p>}
                    {!isDragActive && (
                      <p>Drag and drop files here, or click to select files</p>
                    )}
                  </div>
                  {this.state.files.length > 0 && (
                    <p className="files-ready-to-be-uploaded">
                      Files ready to be uploaded:
                    </p>
                  )}
                </section>
              </div>
            )}
          </Dropzone>
          {files}
          {showAlert ? alert : null}
        </Box>
      </div>
    );
  }
}

export default DropZone;
