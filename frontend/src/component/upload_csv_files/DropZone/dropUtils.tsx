import Papa, { ParseResult } from "papaparse";
import Axios from "axios";
import API_URL from "../../../index";

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
  callbackFn: Function
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const filename: string = file.name;

      const papaParseHandler = async (results: ParseResult) => {
        var csvData = results.data;

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
          alert(
            "Error attempting to upload file with invalid file name. Received filename: " +
              filename
          );
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
              const [matricNo, fullName, academicPlan] = dataRow; // eslint-disable-line @typescript-eslint/no-unused-vars

              // Parse and Split the full name into givenNames and surname
              const nameArray = fullName.split(",");
              const surname = nameArray[0];
              const givenNames = nameArray[1];

              return {
                matricNo: matricNo,
                givenNames: givenNames,
                surname: surname,
                academicPlan: academicPlan,
                finalAward: 0
              };
            }
          });

          const requestUrl = isModule
            ? `${API_URL}/api/grades/`
            : `${API_URL}/api/students/`;
          try {
            const result = await Axios.post(requestUrl, requestData);
            callbackFn({ i, result });

            if (i === files.length - 1) resolve(true);
          } catch (e) {
            reject(e);
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
