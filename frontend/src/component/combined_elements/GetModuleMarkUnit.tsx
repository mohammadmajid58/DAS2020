import React, { Component } from "react";
import DatabaseTable from "../tables/DatabaseTable";
import axios from "axios";
import API_URL from "../../index";
import PageTitle from "../usability_components/PageTitle";

type ModuleMark = {
  courseCode: string;
  student: string;
  alphanum: string;
};

class GetModuleMarkUnit extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const REQUEST_URL = API_URL + "/api/grades/";
    var moduleMarks: ModuleMark[] = [];

    axios.get(`${REQUEST_URL}`).then(r => {
      moduleMarks.push(r.data);
      this.setState({ data: moduleMarks.flat() });
    });
  }

  render() {
    return (
      <div className="d-flex-inline">
        <PageTitle title="Student Course Grades" />
        <div className="col-md-8 mx-auto">
          <DatabaseTable data={this.state.data} />
        </div>
      </div>
    );
  }
}
export default GetModuleMarkUnit;
