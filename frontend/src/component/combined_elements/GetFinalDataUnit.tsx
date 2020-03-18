import React, { Component } from "react";
import FinalDataTable from "../tables/FinalDataTable";
import Axios, { AxiosResponse } from "axios";
import API_URL from "../../index";
import PageTitle from "../usability_components/PageTitle";
import "./GetFinalDataUnit.css";

type FinalData = {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward1: string;
  finalAward2: string;
  finalAward3: string;
  updatedAward: string;
  mcAward: string;
  isMissingGrades: string;
  hasSpecialCode: string;
  gradYear: string;
};

const convertAlphaToMC = (award: string) => {
  const alphanum = parseFloat(award);
  if (alphanum >= 18) {
    return "01";
  } else if (alphanum >= 15) {
    return "0U";
  } else if (alphanum >= 12) {
    return "0L";
  } else if (alphanum >= 9) {
    return "33";
  } else {
    return "Fail";
  }
};

type Props = {
  showOverlay: () => void;
  hideOverlay: () => void;
};

export default class GetFinalDataUnit extends Component<Props> {
  state = {
    data: [] as any[], // Needed since Object cannot be cast to the required type
    selectedOption: null,
    columnsToHide: []
  };

  updateData = (oldData: Object, newData: Object) => {
    const updatedData = this.state.data;
    const index = updatedData.indexOf(oldData);
    updatedData[index] = newData;
    this.setState({ data: [] }); // To force re-render without page refresh
    this.setState({ data: updatedData });
  };

  updateStudentData = (index: number) => {
    const currentState = this.state.data;
    const currentStudent = currentState[index].matricNo;
    Axios.post(API_URL + "/api/calculate/").then(() => {
      Axios.get(API_URL + "/api/students/?matricNo=" + currentStudent).then(
        r => {
          const {
            matricNo,
            givenNames,
            surname,
            academicPlan,
            finalAward1,
            finalAward2,
            finalAward3,
            updatedAward,
            isMissingGrades,
            hasSpecialCode,
            gradYear
          } = r.data;
          let initialAward = "";
          if (hasSpecialCode === true) {
            initialAward = "TBC";
          } else {
            initialAward = convertAlphaToMC(finalAward3);
          }
          let changedAward = updatedAward;
          if (updatedAward === "-1") {
            changedAward = initialAward;
          }
          currentState[index] = {
            matricNo: matricNo,
            givenNames: givenNames,
            surname: surname,
            academicPlan: academicPlan,
            finalAward1: finalAward1,
            finalAward2: finalAward2,
            finalAward3: finalAward3,
            initialAward: initialAward,
            updatedAward: changedAward,
            isMissingGrades: isMissingGrades,
            hasSpecialCode: hasSpecialCode,
            gradYear: gradYear
          };
          this.setState({ data: currentState });
        }
      );
    });
  };

  getSelectedData = (selectedYears: string[]) => {
    this.props.showOverlay();

    const POST_URL = API_URL + "/api/calculate/";

    var queryParameter = "";
    if (selectedYears[0] === "all") {
      selectedYears = [];
    }

    if (selectedYears.length > 0) {
      queryParameter += "?";
      const parameterList = selectedYears.map(year => {
        return "years=" + year;
      });
      queryParameter += parameterList.pop();
      parameterList.map(param => {
        queryParameter += "&" + param;
      });
    }

    const GET_URL = API_URL + "/api/students/" + queryParameter;

    Axios.post(`${POST_URL}`, selectedYears).then((response: AxiosResponse) => {
      if (response.status === 201) {
        Axios.get(`${GET_URL}`).then(r => {
          const data = r.data;

          const finalData = data.map((dataRow: any) => {
            const {
              matricNo,
              givenNames,
              surname,
              academicPlan,
              finalAward1,
              finalAward2,
              finalAward3,
              updatedAward,
              isMissingGrades,
              hasSpecialCode,
              gradYear
            } = dataRow;

            let initialAward = "";
            if (hasSpecialCode === true) {
              initialAward = "TBC";
            } else {
              initialAward = convertAlphaToMC(finalAward3);
            }

            let changedAward = updatedAward;
            if (updatedAward === "-1") {
              changedAward = initialAward;
            }

            return {
              matricNo: matricNo,
              givenNames: givenNames,
              surname: surname,
              academicPlan: academicPlan,
              finalAward1: finalAward1,
              finalAward2: finalAward2,
              finalAward3: finalAward3,
              initialAward: initialAward,
              updatedAward: changedAward,
              isMissingGrades: isMissingGrades,
              hasSpecialCode: hasSpecialCode,
              gradYear: gradYear
            };
          });
          this.props.hideOverlay();
          this.setState({ data: finalData });
        });
      } else {
        this.props.hideOverlay();
        this.setState({
          errorMessage: "Error Occurred"
        });
      }
    });
  };

  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Final Degree GPA" />
        <div className="col-11 mx-auto">
          <FinalDataTable
            data={this.state.data}
            updateData={this.updateData.bind(this)}
            updateStudent={this.updateStudentData.bind(this)}
            getSelectedYears={this.getSelectedData.bind(this)}
          />
        </div>
      </div>
    );
  }
}
