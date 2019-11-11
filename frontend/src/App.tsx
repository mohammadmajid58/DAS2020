import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TestAPI from "./component/TestAPI";
import CSVDropZone from "./component/CSVDropZone/CSVDropZone";
import GetModuleMarkUnit from "./component/combined_elements/GetModuleMarkUnit";

const App: React.FC = () => {
  return (
    <div className="d-flex-inline">
      <div className="d-flex justify-content-center">
        <TestAPI />
      </div>
      <div className="d-flex justify-content-center">
        <CSVDropZone />
      </div>
      <div className="mt-2">
        <GetModuleMarkUnit />
      </div>
    </div>
  );
};

export default App;
