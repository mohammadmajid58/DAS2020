import React, { Component } from "react";
import Table from "./Table";
import { Options, Column } from "material-table";

type Row = {
  courseCode: string;
  matricNo: string;
  alphanum: string;
};

type Props = {
  data: Row[];
};

interface CustomColumn extends Column<Object> {
  lookup?: { [key: string]: string };
}

const columns: CustomColumn[] = [
  { title: "Course Code", field: "courseCode", lookup: {} },
  { title: "Matric No.", field: "matricNo" },
  { title: "Grade", field: "alphanum", lookup: {} }
];

class DatabaseTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "All Module Grade Data";

  render() {
    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSize: 10,
      exportButton: true,
      exportAllData: true,
      exportFileName: "Module Grades",
      pageSizeOptions: [5, 10, 20, this.props.data.length]
    };

    this.rows = this.props.data;

    const courseCodeData = this.rows
      .map(row => {
        return row.courseCode;
      })
      .filter((val, index, arr) => {
        return arr.indexOf(val) === index;
      })
      .sort();

    const gradeData = this.rows
      .map(row => {
        return row.alphanum;
      })
      .filter((val, index, arr) => {
        return arr.indexOf(val) === index;
      })
      .sort();

    // Add Lookup keys for the discrete file
    columns.forEach(col => {
      if (col.field === "courseCode") {
        courseCodeData.forEach((courseCode: string) => {
          col.lookup![courseCode] = courseCode;
        });
      } else if (col.field === "alphanum") {
        gradeData.forEach((grade: string) => {
          col.lookup![grade] = grade;
        });
      }
    });

    return (
      <div className="mx-md-auto databaseTable">
        <Table
          columns={columns}
          data={this.rows}
          options={tableOptions}
          title={this.title}
        />
      </div>
    );
  }
}
export default DatabaseTable;
