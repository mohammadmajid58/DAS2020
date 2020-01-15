import React, { Component } from "react";

type FinalData = {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward: string;
  mcAward: string;
};

const sampleData: FinalData[] = [
  {
    matricNo: "1234567",
    academicPlan: "F100-2208",
    givenNames: "Scrooge",
    surname: "McDuck",
    finalAward: "2.1",
    mcAward: "0U"
  },
  {
    matricNo: "1234568",
    academicPlan: "F103-2208",
    givenNames: "John Fitzgerald",
    surname: "Kennedy",
    finalAward: "1",
    mcAward: "01"
  },
  {
    matricNo: "1234569",
    academicPlan: "F101-2207",
    givenNames: "Captain",
    surname: "Ahab",
    finalAward: "2.2",
    mcAward: "0L"
  },
  {
    matricNo: "1234570",
    academicPlan: "F102-2207",
    givenNames: "F. Scott",
    surname: "Fitzgerald",
    finalAward: "3",
    mcAward: "33"
  }
];

type Props = {
  returnData: (data: FinalData[]) => void;
};

export default class GetFinalDataButton extends Component<Props> {
  returnDataHandler = () => {
    this.props.returnData(sampleData);
  };

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
