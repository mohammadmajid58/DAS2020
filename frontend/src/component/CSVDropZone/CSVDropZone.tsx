import React from "react";
import DropZone from "../DropZone/DropZone";
import Papa, { ParseResult } from "papaparse";

type StudentModuleMark = {
  matricNo: string;
  moduleGrade: string;
};

type AllModuleMarks = {
  moduleName: string;
  moduleData: StudentModuleMark[];
};

const papaParseHandler = (results: ParseResult, inputFile: File) => {
  var csvData = results.data;

  //Removes any empty columns
  csvData = csvData.map((dataRow: []) => {
    return dataRow.filter((columnData: string) => {
      return columnData.length > 0;
    });
  });

  //Removes any empty rows
  csvData = csvData.filter((dataRow: []) => {
    return dataRow.length > 0;
  });

  //CSV Data first row has a single entry, the module name
  //Thus we slice the remaining rows to get module data
  const moduleName = csvData[0][0];
  const studentGrades = csvData.slice(1);

  //Construct array of StudentModuleMark objects
  var moduleData = studentGrades.map((dataRow) => {
    const [matricNo, grade] = dataRow;
    return { matricNo: matricNo, moduleGrade: grade };
  });

  var apiGradeData: AllModuleMarks[] = [
    { moduleName: moduleName, moduleData: moduleData }
  ];

  console.log(apiGradeData);
};

const papaConfig = {
  //Oncomplete callback function
  complete: papaParseHandler
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

    const formattedCSV = Papa.parse(file, papaConfig);
    console.log(formattedCSV);
  };
  return <DropZone filesHandler={filesHandler} />;
};

export default CSVDropZone;
