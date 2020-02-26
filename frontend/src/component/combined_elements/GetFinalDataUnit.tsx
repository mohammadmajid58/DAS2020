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
  { value: "finalAward", label: "Final Degree GPA" },
  { value: "academicPlan", label: "Academic Plan" },
  { value: "mcAward", label: "MC Award" }
];

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
    data: [],
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

  componentDidMount() {
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
              finalAward
            } = dataRow;

            let mcAward = "";

            if (finalAward > 17) {
              mcAward = "1";
            } else if (finalAward > 14) {
              mcAward = "2:1";
            } else if (finalAward > 11) {
              mcAward = "2:2";
            } else if (finalAward > 8) {
              mcAward = "3";
            } else if (finalAward <= 8) {
              mcAward = "Fail";
            }

            return {
              matricNo: matricNo,
              givenNames: givenNames,
              surname: surname,
              academicPlan: academicPlan,
              finalAward: finalAward,
              mcAward: mcAward
            };
          });
          this.setState({ data: finalData });
        });
      } else {
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
        <div className="col-md-8 mx-auto">
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
          />
        </div>
      </div>
    );
  }
}
