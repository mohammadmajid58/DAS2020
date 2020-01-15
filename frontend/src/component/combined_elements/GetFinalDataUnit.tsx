import React, { Component } from "react";
import FinalDataTable from "../tables/FinalDataTable";
import GetFinalDataButton from "../buttons/GetFinalDataButton";

type FinalData = {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward: string;
  mcAward: string;
};

export default class GetFinalDataUnit extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.setState({ data: [] });
  }

  getDataHandler = (returnData: FinalData[]) => {
    this.setState({ data: returnData });
  };

  render() {
    return (
      <div className="col-md-8 mx-auto">
        <GetFinalDataButton returnData={this.getDataHandler.bind(this)} />
        <FinalDataTable data={this.state.data} />
      </div>
    );
  }
}
