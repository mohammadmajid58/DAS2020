import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TestAPI from "./component/TestAPI";
import CSVDropZone from "./component/CSVDropZone/CSVDropZone";

const App: React.FC = () => {
  return (
    <div>
      <TestAPI />
      <CSVDropZone />
    </div>
  );
};

export default App;
