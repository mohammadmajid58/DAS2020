import React from "react";
import DropZone from "../DropZone/DropZone";
import Papa, { ParseResult } from "papaparse";
import Axios, { AxiosResponse } from "axios";
import Button from "@material-ui/core/Button";
import Alert from "../../alerts/Alert";

type AllModuleMarks = {
  courseCode: string;
  student: string;
  alphanum: string;
};

interface State {
  numOfFilesUploaded: number;
  uploading: boolean;
  files: File[];
  errorMessage: string;
}

class StudentModuleMarkDropZone extends React.Component<{}, State> {
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
    if (files.length === 0) {
      this.setState({
        errorMessage: "No files to upload"
      });
      return;
    }

    for (var file of files) {
      const papaParseHandler = (results: ParseResult) => {
        var csvData = results.data;

        // Removes any empty columns
        csvData = csvData.map((dataRow: []) => {
          return dataRow.filter((columnData: string) => {
            return columnData.length > 0;
          });
        });

        // Removes any empty rows
        csvData = csvData.filter((dataRow: []) => {
          return dataRow.length > 0;
        });

        // Separate Module Name and array of grades
        const moduleName = csvData[0][0];
        const studentGrades = csvData.slice(1);

        // Construct array of StudentModuleMark objects

        const moduleData = studentGrades.map(dataRow => {
          const [matricNo, grade] = dataRow;
          return { courseCode: moduleName, student: matricNo, alphanum: grade };
        });

        const BASE_URL = "http://127.0.0.1:8000";

        Axios.post(`${BASE_URL}/grades/`, moduleData)
          .then((response: AxiosResponse) => {
            if (response.status === 200 || response.status === 201) {
              this.setState({
                uploading: true,
                numOfFilesUploaded: this.state.numOfFilesUploaded + 1
              });
            } else {
              this.setState({
                errorMessage: "Error occured"
              });
              console.log("error!");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      };
      const papaConfig = {
        complete: papaParseHandler
      };
      Papa.parse(file, papaConfig);
    }
  }

  filesHandler = (files: File[]) => {
    this.setState({
      files: files
    });
  };

  render() {
    const fileNamesToUpload = this.state.files.map((file: File) => file.name);

    const numOfFilesUploaded = this.state.numOfFilesUploaded;
    const totalNumOfFiles = this.state.files.length;

    const fileUploaded = fileNamesToUpload[numOfFilesUploaded - 1];
    const errorOccured = this.state.errorMessage.length > 0;

    const uploadStarted = numOfFilesUploaded > 0;
    const uploadComplete = totalNumOfFiles === numOfFilesUploaded;

    return (
      <div>
        {uploadStarted && !uploadComplete && (
          <div>
            Uploaded {fileUploaded} (file {numOfFilesUploaded} of{" "}
            {totalNumOfFiles})
          </div>
        )}
        {uploadStarted && uploadComplete && (
          <div>
            All files successfully uploaded
            <Alert type="success" message="All files successfully uploaded" />
          </div>
        )}
        {!this.state.uploading && (
          <div>
            <DropZone
              filesHandler={this.filesHandler}
              validFileExtensions={["csv"]}
            />
            <Button
              onClick={() => this.uploadFiles()}
              variant="contained"
              color="primary"
              data-cy="upload-csv-files"
            >
              Upload CSV Files to Database
            </Button>
          </div>
        )}
        {errorOccured && (
          <Alert type="error" message={this.state.errorMessage} />
        )}
      </div>
    );
  }
}

export default StudentModuleMarkDropZone;