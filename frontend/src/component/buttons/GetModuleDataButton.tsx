import React from "react";
import axios from "axios";
import API_URL from "../../index";

type ModuleMark = {
  courseCode: string;
  student: string;
  alphanum: string;
};

type Props = {
  returnData: (data: ModuleMark[]) => void;
};

class GetMarksButton extends React.Component<Props> {
  returnDataHandler = () => {
    const REQUEST_URL = API_URL + "/api/grades/";
    var moduleMarks: ModuleMark[] = [];

    axios.get(`${REQUEST_URL}`).then(r => {
      moduleMarks.push(r.data);
      this.props.returnData(moduleMarks.flat());
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          data-cy-getdata-button
          className="btn btn-light border border-dark getModuleDataButton"
          onClick={this.returnDataHandler}
        >
          Get All Grades
        </button>
      </div>
    );
  }
}
export default GetMarksButton;
