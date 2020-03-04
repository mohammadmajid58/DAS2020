import React from "react";
import DropZone from "../DropZone/DropZone";
import Papa, { ParseResult } from "papaparse";
import Axios, { AxiosResponse } from "axios";
import Button from "@material-ui/core/Button";
import Alert from "../../alerts/Alert";
import API_URL from "../../../index";

type AllModuleMarks = {
  courseCode: string;
  matricNo: string;
  alphanum: string;
};

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

    for (var i = 0; i < files.length; i++) {
      const file: File = files[i];
      const filename: string = file.name;

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
        const studentGrades = csvData.slice(1);

        const regexp = new RegExp(
          "^Grade roster ([A-Z]+_[0-9]+\\w?)_([0-9]+).csv$"
        );

        // We expect three matches, the string itself, course code and year group
        const matches: any = filename.match(regexp);
        if (matches === null || matches.length !== 3) {
          alert(
            "Error attempting to upload file with invalid file name. Received filename: " +
              filename
          );
        } else {
          const moduleName = matches[1];
          // const yearGroup = matches[2];

          // Construct array of StudentModuleMark objects
          const moduleData = studentGrades.map(dataRow => {
            // eslint-disable-next-line no-unused-vars
            const [matricNo, fullName, grade] = dataRow; // eslint-disable-line @typescript-eslint/no-unused-vars

            return {
              courseCode: moduleName,
              matricNo: matricNo,
              alphanum: grade
            };
          });

          Axios.post(`${API_URL}/api/grades/`, moduleData)
            .then((response: AxiosResponse) => {
              if (response.status === 200 || response.status === 201) {
                hideOverlay();
                this.setState({
                  uploading: true,
                  numOfFilesUploaded: this.state.numOfFilesUploaded + 1
                });
              } else {
                hideOverlay();
                this.setState({
                  errorMessage: "Error occured"
                });
                console.log("error!");
              }
            })
            .catch(function(error) {
              hideOverlay();
              alert("Error occured");
              console.log(error);
            });
        }
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
