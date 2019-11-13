import React from "react";
import DropZone from "../DropZone/DropZone";
import Papa, { ParseResult } from "papaparse";
import Axios, { AxiosResponse } from "axios";

type AllModuleMarks = {
  courseCode: string;
  student: string;
  alphanum: string;
};

const CSVDropZone: React.FC = () => {
  const filesHandler = (files: File[]) => {
    const file = files[0];
    const fileName = file.name;
    const isCSVFile = fileName.endsWith(".csv");

    if (!isCSVFile) {
      alert("Expected a CSV file");
      return;
    }

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

      // Convert data to JSON format?

      const BASE_URL = "http://127.0.0.1:8000";

      Axios.post(`${BASE_URL}/grades/`, moduleData)
        .then((response: AxiosResponse) => {
          if (response.status === 200 || response.status === 201) {
            console.log("success!");
          } else {
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
  };
  return <DropZone filesHandler={filesHandler} />;
};

export default CSVDropZone;
