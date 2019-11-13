import React, { Component } from "react";
import Table from "./Table";
import { Options, Column } from "material-table";

type Row = {
  courseCode: string;
  student: string;
  alphanum: string;
};

type Props = {
  data: Row[];
};

const columns: Column<Object>[] = [
  { title: "Course Code", field: "courseCode" },
  { title: "Matric No.", field: "student" },
  { title: "Grade", field: "alphanum" }
];

class DatabaseTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "All Module Grade Data";

  render() {
    const tableOptions: Options = {
      search: false,
      pageSize: 10
    };

    this.rows = this.props.data;

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
