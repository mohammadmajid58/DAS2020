import React, { Component } from "react";
import DatabaseTable from "../tables/DatabaseTable";
import axios from "axios";
import API_URL from "../../index";
import PageTitle from "../usability_components/PageTitle";
import { convertAlphanumTo22pt } from "../../abstract_functions";

type ModuleMark = {
  courseCode: string;
  student: string;
  alphanum: string;
  twentyTwoPoint: string;
};

type Props = {
  showOverlay: () => void;
  hideOverlay: () => void;
};

class GetModuleMarkUnit extends Component<Props> {
  state = {
    data: []
  };

  componentDidMount() {
    this.props.showOverlay();
    const REQUEST_URL = API_URL + "/api/grades/";
    var moduleMarks: ModuleMark[] = [];

    axios.get(`${REQUEST_URL}`).then(r => {
      r.data.map((item: ModuleMark) => {
        item.twentyTwoPoint = convertAlphanumTo22pt(item.alphanum);
        moduleMarks.push(item);
      });

      this.props.hideOverlay();
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
