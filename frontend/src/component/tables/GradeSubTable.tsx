import React, { Component } from "react";
import { Table } from "./Table";
import { Options, Column } from "material-table";
import Axios from "axios";
import API_URL from "../..";
import { convertAlphanumTo22pt } from "../../abstract_functions";

type Row = {
  courseCode: string;
  alphanum: string;
  twentyTwoPoint: string;
};
type State = {
  data: Row[];
};
type Props = {
  matricNo: string;
  tableID: number;
  updateStudent: (index: number) => void;
};
interface CustomColumn extends Column<Object> {
  lookup?: { [key: string]: string };
}
export default class GradeSubTable extends Component<Props, State> {
  state = {
    data: [] as any[]
  };

  componentWillUnmount() {
    this.props.updateStudent(this.props.tableID);
  }

  handleRowData(rowData: any) {
    const gradesToHighlight = ["MV", "CW", "CR", "NA"];

    if (gradesToHighlight.includes(rowData.alphanum)) {
      return { backgroundColor: "pink" };
    }
    return {};
  }

  componentDidMount() {
    Axios.get(
      API_URL + "/api/student_grades/?matricNo=" + this.props.matricNo
    ).then(r => {
      this.setState({ data: r.data });
    });
  }

  render() {
    const tableOptions: Options = {
      search: false,
      filtering: false,
      pageSize: 10,
      exportButton: false,
      emptyRowsWhenPaging: false,
      paging: false
    };
    const alphaNumGrades = [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "B1",
      "B2",
      "B3",
      "C1",
      "C2",
      "C3",
      "D1",
      "D2",
      "D3",
      "E1",
      "E2",
      "E3",
      "F1",
      "F2",
      "F3",
      "G1",
      "G2",
      "H",
      "MV",
      "CR",
      "CW",
      "NA"
    ];
    const cols: CustomColumn[] = [
      { title: "Course Code", field: "courseCode", editable: "never" },
      {
        title: "Alphanumeric Grade",
        field: "alphanum",
        editable: "onUpdate",
        lookup: {}
      },
      { title: "22pt Grade", field: "twentyTwoPoint", editable: "never" }
    ];

    cols.map(col => {
      if (col.field === "alphanum") {
        alphaNumGrades.map(grade => {
          col.lookup![grade] = grade;
        });
      }
    });

    return (
      <Table
        columns={cols}
        data={this.state.data}
        options={tableOptions}
        title={"Student " + this.props.matricNo + " - Grades"}
        handleRowData={this.handleRowData}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                Axios.post(API_URL + "/api/override_grade/", {
                  matricNo: this.props.matricNo,
                  ...newData
                })
                  .then(() => {
                    const updatedData = this.state.data;
                    const { alphanum } = newData as Row;
                    const index = updatedData.indexOf(oldData!);
                    const { courseCode } = updatedData[index];
                    const twentyTwoPoint = convertAlphanumTo22pt(alphanum);
                    updatedData[index] = {
                      alphanum: alphanum,
                      courseCode: courseCode,
                      twentyTwoPoint: twentyTwoPoint
                    };
                    this.setState({ data: [] }); // To force re-render without page refresh
                    this.setState({ data: updatedData });
                    resolve();
                  })
                  .catch(err => {
                    console.error(err);
                    reject(err);
                  });
              }, 2000);
            })
        }}
      />
    );
  }
}
