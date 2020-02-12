import React, { Component } from "react";

type FinalData = {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward: string;
  mcAward: string;
};

type Props = {
  returnData: (data: FinalData[]) => void;
};

export default class GetFinalDataButton extends Component<Props> {
  returnDataHandler = () => {};

  render() {
    return (
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-light border border-dark getFinalDataButton"
          type="button"
          onClick={this.returnDataHandler}
        >
          Get Final Award Data
        </button>
      </div>
    );
  }
}
