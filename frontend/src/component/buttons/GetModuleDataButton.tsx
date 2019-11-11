import React from "react";
import axios from "axios";

type ModuleMark = {
  courseCode: string;
  student: string;
  alphanum: string;
};

type Props = {
  returnData: (data: ModuleMark[]) => void;
};

//Since data might be across multiple API pages, asynchronously make multiple api calls to get all data
async function getAllData() {
  const BASE_URL = "http://127.0.0.1:8000";
  var currentAddress = BASE_URL + "/grades/";
  var tempModuleMarks: ModuleMark[] = [];

  while (currentAddress != null) {
    await axios.get(`${currentAddress}`).then((r) => {
      tempModuleMarks.push(r.data.results);
      console.log("In GetAllData: " + tempModuleMarks);
      currentAddress = r.data.next;
    });
  }

  return tempModuleMarks.flat();
}

class GetMarksButton extends React.Component<Props> {
  allModuleData: ModuleMark[] = [];

  returnDataHandler = () => {
    console.log("Button Clicked");
    getAllData().then((r) => {
      console.log(r);
    });

    getAllData().then((r) => {
      console.log("After GetAllData: " + r);
      this.props.returnData(r);
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-light border border-dark"
          onClick={this.returnDataHandler}
        >
          Get All Grades
        </button>
      </div>
    );
  }
}
export default GetMarksButton;
