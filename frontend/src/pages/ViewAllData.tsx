import React, { Component } from "react";
import GetModuleMarkUnit from "../component/combined_elements/GetModuleMarkUnit";
import GetFinalDataUnit from "../component/combined_elements/GetFinalDataUnit";

class ViewAllData extends Component {
  render() {
    return (
      <div className="d-flex-inline">
        <div className="mt-2">
          <GetModuleMarkUnit />
        </div>
        <div className="mt-2">
          <GetFinalDataUnit />
        </div>
      </div>
    );
  }
}

export default ViewAllData;
