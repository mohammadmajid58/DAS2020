import React, { Component } from "react";
import FinalDataTable from "../tables/FinalDataTable";
import Axios, { AxiosResponse } from "axios";
import API_URL from "../../index";
import PageTitle from "../usability_components/PageTitle";
import Select from "react-select";
import "./GetFinalDataUnit.css";

const options = [
  { value: "matricNo", label: "Matric No" },
  { value: "givenNames", label: "Given Names" },
  { value: "surname", label: "Surname" },
  { value: "finalAward1", label: "Final Degree GPA 1 d.p." },
  { value: "finalAward2", label: "Final Degree GPA 2 d.p." },
  { value: "finalAward3", label: "Final Degree GPA 3 d.p." },
  { value: "academicPlan", label: "Academic Plan" },
  { value: "initialAward", label: "Initial Award" },
  { value: "updatedAward", label: "Overridden Award" }
];

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

  handleChange = (selectedOption: any) => {
    if (selectedOption) {
      const result = selectedOption.map((option: any) => option.value);
      this.setState({
        columnsToHide: result,
        selectedOption: selectedOption
      });
    }
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
      Axios.get(API_URL + "/api/students/?q=" + currentStudent).then(r => {
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
          hasSpecialCode
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
          hasSpecialCode: hasSpecialCode
        };
        this.setState(currentState);
      });
    });
  };

  componentDidMount() {
    this.props.showOverlay();

    const POST_URL = API_URL + "/api/calculate/";
    const GET_URL = API_URL + "/api/students/";

    var studentData: FinalData[] = [];

    Axios.post(`${POST_URL}`, studentData).then((response: AxiosResponse) => {
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
              hasSpecialCode
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
              isMissingGrades: isMissingGrades
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
  }

  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Final Degree GPA" />
        <div className="col-11 mx-auto">
          <div>
            <h5>Hide single or multiple columns by choosing them here</h5>
          </div>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={options}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <FinalDataTable
            data={this.state.data}
            columnsToHide={this.state.columnsToHide}
            updateData={this.updateData.bind(this)}
            updateStudent={this.updateStudentData.bind(this)}
          />
        </div>
      </div>
    );
  }
}
