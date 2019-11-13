import React, { Component } from "react";

import MaterialTable from "material-table";

type Row = {
  courseCode: string;
  student: string;
  alphanum: string;
};

type Props = {
  data: Row[];
};

const columns = [
  { title: "Course Code", field: "courseCode" },
  { title: "Matric No.", field: "student" },
  { title: "Grade", field: "alphanum" }
];

class DatabaseTable extends Component<Props> {
  rows: Row[] = [];

  render() {
    const tableOptions = {
      search: false,
      pageSize: 10
    };
    this.rows = this.props.data;

    return (
      <div className="mx-md-auto">
        <MaterialTable
          title="Module Grades"
          columns={columns}
          data={this.rows}
          options={tableOptions}
        />
      </div>
    );
  }
}
export default DatabaseTable;
