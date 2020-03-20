import Papa, { ParseResult } from "papaparse";
import Axios from "axios";
import API_URL from "../../../index";
import { getErrorReason } from "./DropZoneErrorHandler";

function stringArraysEqual(a: Array<String>, b: Array<String>) {
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function getDropZoneUtils(stateValue: any): any {
  const fileNamesToUpload = stateValue.files.map((file: File) => file.name);

  const numOfFilesUploaded = stateValue.numOfFilesUploaded;
  const totalNumOfFiles = stateValue.files.length;

  const fileUploaded = fileNamesToUpload[numOfFilesUploaded - 1];
  const errorOccured = stateValue.errorMessage.length > 0;

  const uploadStarted = numOfFilesUploaded > 0;
  const uploadComplete = totalNumOfFiles === numOfFilesUploaded;

  return {
    fileNamesToUpload,
    numOfFilesUploaded,
    totalNumOfFiles,
    fileUploaded,
    errorOccured,
    uploadComplete,
    uploadStarted
  };
}

export function handleFileUpload(
  files: any[],
  isModule: boolean,
  callbackFn: Function,
  hideOverlay: Function,
  storeSuccessfullyUploadedFile: Function,
  storeFailedToUploadFile: Function
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const filename: string = file.name;

      const papaParseHandler = async (results: ParseResult) => {
        var csvData = results.data;

        if (csvData.length === 0) {
          hideOverlay();
          storeFailedToUploadFile(filename, "It is empty");
          return;
        }

        // Removes any empty columns
        csvData = csvData.map((dataRow: []) => {
          return dataRow.filter((columnData: string) => {
            return columnData.length > 0;
          });
        });

        // Removes empty rows
        csvData = csvData.filter((dataRow: []) => {
          return dataRow.length > 0;
        });

        const actualFileHeader = csvData[0].map((header: string) =>
          header.trim()
        );
        if (!isModule) {
          const expectedFileHeader = [
            "EMPLID",
            "Name",
            "AcademicPlan",
            "GradYear"
          ];
          if (!stringArraysEqual(actualFileHeader, expectedFileHeader)) {
            hideOverlay();
            storeFailedToUploadFile(
              filename,
              "It has an invalid header. The header must be: EMPLID, Name, AcademicPlan, GradYear"
            );
            return;
          }
        } else {
          const expectedFileHeader = ["EMPLID", "Name", "Grade"];
          if (!stringArraysEqual(actualFileHeader, expectedFileHeader)) {
            hideOverlay();
            storeFailedToUploadFile(
              filename,
              "It has an invalid header. The header must be: EMPLID, Name, Grade"
            );
            return;
          }
        }

        // Separate Module Name and array of grades
        const studentFile = csvData.slice(1);
        const regexText = isModule
          ? "^Grade roster ([A-Z]+_[0-9]+\\w?)_([0-9]+).csv$"
          : "^.+.csv$";
        const regexp = new RegExp(regexText);

        // We expect one match, the string itself
        const matches: any = filename.match(regexp);
        const matchesLength = isModule ? 3 : 1;
        if (matches === null || matches.length !== matchesLength) {
          hideOverlay();
          storeFailedToUploadFile(filename, "It has an invalid file name");
        } else {
          // Construct array of Student objects
          const requestData = studentFile.map(dataRow => {
            if (isModule) {
              const moduleName = matches[1];
              // eslint-disable-next-line no-unused-vars
              const [matricNo, fullName, grade] = dataRow; // eslint-disable-line @typescript-eslint/no-unused-vars

              return {
                courseCode: moduleName,
                matricNo: matricNo,
                alphanum: grade
              };
            } else {
              // eslint-disable-next-line no-unused-vars
              const [matricNo, fullName, academicPlan, gradYear] = dataRow; // eslint-disable-line @typescript-eslint/no-unused-vars

              // Parse and Split the full name into givenNames and surname
              if (!fullName) {
                hideOverlay();
                storeFailedToUploadFile(
                  filename,
                  "It contains a row that does not have the name field"
                );
                return;
              }
              const nameArray = fullName.split(",");
              const surname = nameArray[0];
              const givenNames = nameArray[1];

              return {
                matricNo: matricNo,
                givenNames: givenNames,
                surname: surname,
                academicPlan: academicPlan,
                finalAward: 0,
                gradYear: gradYear
              };
            }
          });

          const requestUrl = isModule
            ? `${API_URL}/api/grades/`
            : `${API_URL}/api/students/`;
          try {
            const result = await Axios.post(requestUrl, requestData);
            callbackFn({ i, result });
            storeSuccessfullyUploadedFile(filename);
            if (i === files.length - 1) resolve(true);
          } catch (e) {
            reject(e);
            const reason = getErrorReason(e);
            storeFailedToUploadFile(filename, reason);
          }
        }
      };
      const papaConfig = {
        complete: papaParseHandler
      };
      Papa.parse(file, papaConfig);
    }
  });
}
