import React, { Component } from "react";
import Table from "./Table";
import { Options, Column } from "material-table";

interface CustomColumn extends Column<Object> {
  lookup?: { [key: string]: string };
}

type Row = {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward: string;
  mcAward: string;
};

type Props = {
  data: Row[];
};

const uniqueData = (inData: string[]) => {
  return inData
    .filter((val, index, arr) => {
      return arr.indexOf(val) === index;
    })
    .sort();
};

const columns: CustomColumn[] = [
  { title: "EMPLID", field: "matricNo" },
  { title: "Academic Plan", field: "academicPlan", lookup: {}, export: false },
  { title: "Given Names", field: "givenNames", lookup: {}, export: false },
  { title: "Surname", field: "surname", lookup: {}, export: false },
  { title: "Final Award", field: "finalAward", lookup: {}, export: false },
  { title: "MC Award", field: "mcAward", lookup: {} }
];

export default class FinalDataTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "Final Award Data";

  render() {
    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSize: 10,
      exportButton: true,
      exportAllData: true,
      exportFileName: "Final Award"
    };

    this.rows = this.props.data;

    // Get a unique list of data entries for each column, used as lookup keys
    const academicPlanData = uniqueData(
      this.rows.map((row) => {
        return row.academicPlan;
      })
    );
    const givenNameData = uniqueData(
      this.rows.map((row) => {
        return row.givenNames;
      })
    );
    const surnameData = uniqueData(
      this.rows.map((row) => {
        return row.surname;
      })
    );
    const finalAwardData = uniqueData(
      this.rows.map((row) => {
        return row.finalAward;
      })
    );
    const mcAwardData = uniqueData(
      this.rows.map((row) => {
        return row.mcAward;
      })
    );

    // Assigns lookup keys for each field
    columns.forEach((col) => {
      if (col.field === "academicPlan") {
        academicPlanData.forEach((academicPlan) => {
          col.lookup![academicPlan] = academicPlan;
        });
      } else if (col.field === "givenNames") {
        givenNameData.forEach((givenName) => {
          col.lookup![givenName] = givenName;
        });
      } else if (col.field === "surname") {
        surnameData.forEach((surname) => {
          col.lookup![surname] = surname;
        });
      } else if (col.field === "finalAward") {
        finalAwardData.forEach((finalAward) => {
          col.lookup![finalAward] = finalAward;
        });
      } else if (col.field === "mcAward") {
        mcAwardData.forEach((mcAward) => {
          col.lookup![mcAward] = mcAward;
        });
      }
    });

    return (
      <div className="mx-md-auto finalDataTable">
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
