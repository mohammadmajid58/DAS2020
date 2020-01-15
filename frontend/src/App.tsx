import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentModuleMarkDropZone from "./component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";
import GetModuleMarkUnit from "./component/combined_elements/GetModuleMarkUnit";
import GetFinalDataUnit from "./component/combined_elements/GetFinalDataUnit";

const App: React.FC = () => {
  return (
    <div className="d-flex-inline">
      <div className="d-flex justify-content-center">
        <StudentModuleMarkDropZone />
      </div>
      <div className="mt-2">
        <GetModuleMarkUnit />
      </div>
      <div className="mt-2">
        <GetFinalDataUnit />
      </div>
    </div>
  );
};

export default App;
