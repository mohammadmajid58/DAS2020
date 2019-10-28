import React from "react";
import DropZone from "../DropZone/DropZone";

const CSVDropZone: React.FC = () => {
  const filesHandler = (files: File[]) => {
    const file = files[0];
    const fileName = file.name;
    const isCSVFile = fileName.endsWith(".csv");

    if (!isCSVFile) {
      alert("Expected a CSV file");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const csvFile = reader.result;
      // Handle CSV file here (remember the delimiter can vary)
      console.log(csvFile);

      // Maybe pass the processed CSV file as an argument to an API call here?
    };
  };
  return <DropZone filesHandler={filesHandler} />;
};

export default CSVDropZone;
