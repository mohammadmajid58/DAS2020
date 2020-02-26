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
  columnsToHide?: string[];
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
  { title: "Final Degree GPA", field: "finalAward", lookup: {}, export: false },
  { title: "MC Award", field: "mcAward", lookup: {} }
];

export default class FinalDataTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "Final Award Data";

  handleRowData(rowData: any) {
    const awardsToHighlightRed = [
      8, // E1
      11, // D1
      14, // C1
      17 // B1
    ];
    if (awardsToHighlightRed.includes(rowData.finalAward)) {
      return { backgroundColor: "pink" };
    }
    return {};
  }

  handleHiddenColumns = (columns: CustomColumn[]) => {
    const colsToHide = this.props.columnsToHide;
    if (colsToHide) {
      columns.forEach(col => {
        if (col.field !== undefined) {
          if (colsToHide.includes(col.field)) {
            col.hidden = true;
            return col;
          } else {
            col.hidden = false;
          }
        }
      });
    }
    return columns;
  };

  render() {
    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 20, this.props.data.length],
      exportButton: true,
      exportAllData: true,
      exportFileName: "Final Award"
    };

    this.rows = this.props.data;

    // Get a unique list of data entries for each column, used as lookup keys
    const academicPlanData = uniqueData(
      this.rows.map(row => {
        return row.academicPlan;
      })
    );
    const givenNameData = uniqueData(
      this.rows.map(row => {
        return row.givenNames;
      })
    );
    const surnameData = uniqueData(
      this.rows.map(row => {
        return row.surname;
      })
    );
    const finalAwardData = uniqueData(
      this.rows.map(row => {
        return row.finalAward;
      })
    );
    const mcAwardData = uniqueData(
      this.rows.map(row => {
        return row.mcAward;
      })
    );

    // Assigns lookup keys for each field
    columns.forEach(col => {
      if (col.field === "academicPlan") {
        academicPlanData.forEach(academicPlan => {
          col.lookup![academicPlan] = academicPlan;
        });
      } else if (col.field === "givenNames") {
        givenNameData.forEach(givenName => {
          col.lookup![givenName] = givenName;
        });
      } else if (col.field === "surname") {
        surnameData.forEach(surname => {
          col.lookup![surname] = surname;
        });
      } else if (col.field === "finalAward") {
        finalAwardData.forEach(finalAward => {
          col.lookup![finalAward] = finalAward;
        });
      } else if (col.field === "mcAward") {
        mcAwardData.forEach(mcAward => {
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
          handleRowData={this.handleRowData}
          handleHiddenColumns={this.handleHiddenColumns}
        />
      </div>
    );
  }
}
