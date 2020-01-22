import React, { Component } from "react";
import Axios, { AxiosResponse } from "axios";
import API_URL from "../../index";

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
  returnDataHandler = () => {
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

          this.props.returnData(finalData);
        });
      } else {
        this.setState({
          errorMessage: "Error Occurred"
        });
      }
    });
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
