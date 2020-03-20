import React from "react";
import Button from "@material-ui/core/Button";
import Alert from "../../alerts/Alert";
import DropZone from "./DropZone";

interface DropZoneProps {
  uploadStarted: boolean;
  uploadComplete: boolean;
  numOfFilesUploaded: number;
  totalNumOfFiles: number;
  uploading: boolean;
  errorMessage: string;
  errorOccured: boolean;
  fileUploaded: string;
  uploadFiles: () => void;
  filesHandler: (file: File[]) => void;
}
var uploadCSVButtonStyle = {
  marginLeft: "1em !important",
  marginTop: "2em"
};

const StudentDropZone: React.SFC<DropZoneProps> = ({
  uploadStarted,
  uploadComplete,
  numOfFilesUploaded,
  uploading,
  totalNumOfFiles,
  errorMessage,
  errorOccured,
  uploadFiles,
  filesHandler,
  fileUploaded
}) => {
  return (
    <div>
      {!uploading && (
        <div>
          <DropZone filesHandler={filesHandler} validFileExtensions={["csv"]} />
          <Button
            onClick={() => uploadFiles()}
            variant="contained"
            color="primary"
            data-cy="upload-csv-files"
            style={uploadCSVButtonStyle}
          >
            Upload CSV Files to Database
          </Button>
        </div>
      )}
      {errorOccured && <Alert type="error" message={errorMessage} />}
    </div>
  );
};
export default StudentDropZone;
