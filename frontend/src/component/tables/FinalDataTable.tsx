import React, { Component } from "react";
import Table from "./Table";
import { MTableToolbar, Column, Options } from "material-table";
import Axios from "axios";
import API_URL from "../../index";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import GradeSubTable from "./GradeSubTable";
import GradYearSelector from "../combined_elements/GradYearSelector";

import "./FinalDataTable.css";

interface CustomColumn extends Column<Object> {
  lookup?: { [key: string]: string };
}

interface Row extends Object {
  matricNo: string;
  academicPlan: string;
  givenNames: string;
  surname: string;
  finalAward1: string;
  finalAward2: string;
  finalAward3: string;
  initialAward: string;
  updatedAward: string;
  isMissingGrades: string;
  hasSpecialCode: string;
  gradYear: string;
}

type Props = {
  data: Row[];
  updateData: (oldData: Object, newData: Object) => void;
  updateStudent: (index: number) => void;
  getSelectedYears: (selectedYears: string[]) => void;
};

const uniqueData = (inData: string[]) => {
  return inData
    .filter((val, index, arr) => {
      return arr.indexOf(val) === index;
    })
    .sort();
};

const columns: CustomColumn[] = [
  {
    title: "Grad Year",
    field: "gradYear",
    editable: "never",
    lookup: {},
    hidden: true
  },
  { title: "EMPLID", field: "matricNo", editable: "never" },
  {
    title: "Academic Plan",
    field: "academicPlan",
    lookup: {},
    editable: "never"
  },
  { title: "Given Names", field: "givenNames", lookup: {}, editable: "never" },
  { title: "Surname", field: "surname", lookup: {}, editable: "never" },
  {
    title: "Final Degree GPA (1 d.p)",
    field: "finalAward1",
    lookup: {},
    editable: "never"
  },
  {
    title: "Final Degree GPA (2 d.p)",
    field: "finalAward2",
    lookup: {},
    editable: "never",
    hidden: true
  },
  {
    title: "Final Degree GPA (3 d.p)",
    field: "finalAward3",
    lookup: {},
    editable: "never",
    hidden: true
  },
  {
    title: "Initial Award",
    field: "initialAward",
    lookup: {},
    editable: "never"
  },
  {
    title: "Overridden Award",
    field: "updatedAward",
    lookup: {},
    editable: "onUpdate"
  }
];

const downloadCSV = (planList: string[], csvData: string[]) => {
  const filename = planList.pop() + ".csv";
  const hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=utf-8," + encodeURI(csvData.pop()!);
  hiddenElement.target = "_blank";
  hiddenElement.download = filename;
  hiddenElement.click();
  if (planList.length > 0) {
    setTimeout(downloadCSV, 300, planList, csvData);
  }
};

export default class FinalDataTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "Final Award Data";
  state = { mcExport: false, anonymizeData: false, pageSize: 10 };

  handleMCExportChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    this.setState({ mcExport: checked });
  }

  handleAnonymizeDataChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    this.setState({ anonymizeData: checked });
  }

  handleCustomCsvExport = (columns: CustomColumn[], renderData: Row[]) => {
    interface Student {
      [studentID: string]: { name: string; degreeHonor: string };
    }
    interface AcadPlan {
      [plan: string]: { rowData: string[]; lastAnonCount: number };
    }
    interface ColMap {
      [col: string]: string;
    }

    const allPlans: AcadPlan = {};
    const planList: string[] = [];
    const hiddenColumns = [] as any[];
    const usedColumns = [] as any[];
    const colFieldNames = [] as any[];
    const nonAnonCols = ["matricNo", "givenNames", "surname"];
    columns.map(col => {
      if (!col.hidden) {
        usedColumns.push(col.field!);
        colFieldNames.push(col.title!);
      } else {
        hiddenColumns.push(col.field!);
      }
    });

    if (usedColumns.length === 0) {
      alert("No Columns Selected. No CSV File Created.");
      return;
    }
    var nonAnonColCount = 0;
    nonAnonCols.map(col => {
      if (usedColumns.includes(col)) {
        nonAnonColCount += 1;
      }
    });

    if (nonAnonColCount === usedColumns.length && this.state.anonymizeData) {
      alert(
        "Not Enough Columns Selected. To Anonymize Data columns other than: EMPLID, Given Names or Surname must be chosen."
      );
      return;
    }
    if (renderData.length === 0) {
      alert(
        "No Data to Export. Make sure there is at least 1 row visible in the table."
      );
      return;
    }

    if (this.state.mcExport) {
      renderData.map(row => {
        if (!planList.includes(row.academicPlan)) {
          allPlans[row.academicPlan] = { rowData: [], lastAnonCount: 1 };
          planList.push(row.academicPlan);
        }

        if (this.state.anonymizeData) {
          if (!planList.includes(row.academicPlan + "_ANON")) {
            allPlans[row.academicPlan + "_ANON"] = {
              rowData: [],
              lastAnonCount: 1
            };
            planList.push(row.academicPlan + "_ANON");
          }
          allPlans[row.academicPlan].rowData.push(
            allPlans[row.academicPlan].lastAnonCount +
              // eslint-disable-next-line quotes
              "," +
              row.matricNo +
              // eslint-disable-next-line quotes
              ',"' +
              row.surname +
              "," +
              row.givenNames +
              // eslint-disable-next-line quotes
              '",' +
              row.academicPlan +
              "," +
              row.updatedAward
          );
          allPlans[row.academicPlan + "_ANON"].rowData.push(
            allPlans[row.academicPlan].lastAnonCount++ +
              // eslint-disable-next-line quotes
              "," +
              row.updatedAward
          );
        } else {
          allPlans[row.academicPlan].rowData.push(
            row.matricNo +
              // eslint-disable-next-line quotes
              ',"' +
              row.surname +
              "," +
              row.givenNames +
              // eslint-disable-next-line quotes
              '",' +
              row.academicPlan +
              "," +
              row.updatedAward
          );
        }
      });
    } else {
      const academicPlan = "Final_Data_Table";
      allPlans[academicPlan] = { rowData: [], lastAnonCount: 1 };
      planList.push(academicPlan);
      if (this.state.anonymizeData) {
        allPlans[academicPlan + "_ANON"] = { rowData: [], lastAnonCount: 1 };
        planList.push(academicPlan + "_ANON");
        renderData.map(row => {
          var rowData: ColMap = {};

          for (const [key, value] of Object.entries(row)) {
            if (usedColumns.includes(key)) {
              rowData[key] = value;
            }
          }
          let anonString = allPlans[
            academicPlan + "_ANON"
          ].lastAnonCount.toString();
          let nonAnonString = allPlans[
            academicPlan + "_ANON"
          ].lastAnonCount.toString();
          allPlans[academicPlan + "_ANON"].lastAnonCount += 1;
          usedColumns.map(col => {
            nonAnonString = nonAnonString + "," + rowData[col];
            if (!nonAnonCols.includes(col)) {
              anonString = anonString + "," + rowData[col];
            }
          });
          allPlans[academicPlan + "_ANON"].rowData.push(anonString);
          allPlans[academicPlan].rowData.push(nonAnonString);
        });
      } else {
        renderData.map(row => {
          var rowData: ColMap = {};

          for (const [key, value] of Object.entries(row)) {
            if (usedColumns.includes(key)) {
              rowData[key] = value;
            }
          }
          let rowString = rowData[usedColumns[0]];
          usedColumns.slice(1).map(col => {
            rowString = rowString + "," + rowData[col];
          });
          allPlans[academicPlan].rowData.push(rowString);
        });
      }
    }

    const csvData: string[] = [];

    planList.map((plan: string) => {
      var csvString = "";
      if (this.state.mcExport) {
        if (plan.endsWith("_ANON")) {
          csvString = "ANON Name,Degree Honors\n";
        } else if (this.state.anonymizeData) {
          csvString = "ANON Name,StudentID,Name,Acad Plan,Degree Honors\n";
        } else {
          csvString = "StudentID,Name,Acad Plan,Degree Honors\n";
        }
      } else {
        if (plan.endsWith("_ANON")) {
          const anonCols: string[] = [];
          usedColumns.map((col, index) => {
            if (!nonAnonCols.includes(col)) {
              anonCols.push(colFieldNames[index]);
            }
          });
          csvString = "ANON Name," + anonCols.join(",") + "\n";
        } else if (this.state.anonymizeData) {
          csvString = "ANON Name," + colFieldNames.join(",") + "\n";
        } else {
          csvString = colFieldNames.join(",") + "\n";
        }
      }
      allPlans[plan].rowData.map(row => {
        csvString += row;
        csvString += "\n";
      });

      csvData.push(csvString);
    });

    downloadCSV(planList, csvData);
  };

  handleRowData(rowData: any) {
    const awardsToHighlightRed = [
      8, // E1
      11, // D1
      14, // C1
      17 // B1
    ];
    if (rowData.isMissingGrades || rowData.hasSpecialCode) {
      return { backgroundColor: "pink" };
    } else if (rowData.initialAward !== rowData.updatedAward) {
      return { backgroundColor: "lightgreen" };
    } else if (awardsToHighlightRed.includes(parseInt(rowData.finalAward2))) {
      return { backgroundColor: "orange" };
    }
    return {};
  }

  render() {
    const title = "Final Award Data";

    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSizeOptions: [5, 10, 20, 50, 100],
      pageSize: this.state.pageSize,
      columnsButton: true,
      exportButton: true,
      exportAllData: true,
      exportFileName: "Final_Award_Data",
      emptyRowsWhenPaging: false,
      detailPanelType: "single",
      defaultExpanded: true
    };

    tableOptions.exportCsv = this.handleCustomCsvExport;

    const rows = this.props.data;

    // Get a unique list of data entries for each column, used as lookup keys
    const gradYearData = uniqueData(
      rows.map(row => {
        return row.gradYear;
      })
    );

    const academicPlanData = uniqueData(
      rows.map(row => {
        return row.academicPlan;
      })
    );
    const givenNameData = uniqueData(
      rows.map(row => {
        return row.givenNames;
      })
    );
    const surnameData = uniqueData(
      rows.map(row => {
        return row.surname;
      })
    );
    const finalAwardData1 = uniqueData(
      rows.map(row => {
        return row.finalAward1;
      })
    );
    const finalAwardData2 = uniqueData(
      rows.map(row => {
        return row.finalAward2;
      })
    );
    const finalAwardData3 = uniqueData(
      rows.map(row => {
        return row.finalAward3;
      })
    );

    const mcAwards = [
      "01",
      "0U",
      "0L",
      "33",
      "TBC",
      "GC",
      "DD-UD",
      "DD-UM",
      "DD-UQ",
      "Fail"
    ];

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
      } else if (col.field === "finalAward1") {
        finalAwardData1.forEach(finalAward1 => {
          col.lookup![finalAward1] = finalAward1;
        });
      } else if (col.field === "finalAward2") {
        finalAwardData2.forEach(finalAward2 => {
          col.lookup![finalAward2] = finalAward2;
        });
      } else if (col.field === "finalAward3") {
        finalAwardData3.forEach(finalAward3 => {
          col.lookup![finalAward3] = finalAward3;
        });
      } else if (col.field === "initialAward") {
        mcAwards.forEach(initialAward => {
          col.lookup![initialAward] = initialAward;
        });
      } else if (col.field === "updatedAward") {
        mcAwards.forEach(mcAward => {
          col.lookup![mcAward] = mcAward;
        });
      } else if (col.field === "gradYear") {
        gradYearData.forEach(gradYear => {
          col.lookup![gradYear] = gradYear;
        });
      }
    });

    var green = {
      backgroundColor: "lightgreen",
      padding: "0.35em",
      borderRadius: "0.4em"
    };
    var pink = {
      backgroundColor: "pink",
      padding: "0.35em",
      borderRadius: "0.4em"
    };
    var orange = {
      backgroundColor: "orange",
      padding: "0.35em",
      borderRadius: "0.4em"
    };

    return (
      <div className="mx-md-auto finalDataTable">
        <Table
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  Axios.post(API_URL + "/api/override_award/", newData)
                    .then(() => {
                      this.props.updateData(oldData!, newData);
                      resolve();
                    })
                    .catch(err => {
                      console.error(err);
                      reject(err);
                    });
                }, 2000);
              })
          }}
          columns={columns}
          data={this.props.data}
          options={tableOptions}
          title={title}
          handleRowData={this.handleRowData}
          components={{
            Toolbar: props => (
              <div>
                <div className="center mx-auto">
                  <GradYearSelector
                    getSelectedYears={this.props.getSelectedYears}
                  />

                  <div className="d-flex-inline mt-4">
                    <div className="d-inline-block mr-md-6 mr-sm-5 mr-3">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={this.handleMCExportChange.bind(this)}
                            value="EnableMCExport"
                            checked={this.state.mcExport}
                          />
                        }
                        label="MyCampus Export"
                        labelPlacement="start"
                      />
                    </div>
                    <div className="d-inline-block mr-md-6 mr-3">
                      <FormControlLabel
                        className="ml-auto"
                        control={
                          <Checkbox
                            onChange={this.handleAnonymizeDataChange.bind(this)}
                            value="AnonymizeData"
                            checked={this.state.anonymizeData}
                          />
                        }
                        label="Anonymized Export"
                        labelPlacement="start"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <hr />
                    <p>Table Row Colour Key</p>
                    <span className="d-inline-block mr-3" style={pink}>
                      Missing grades or special codes
                    </span>
                    <span className="d-inline-block mr-3" style={orange}>
                      Discretionary zones
                    </span>
                    <span className="d-inline-block" style={green}>
                      Overridden final award
                    </span>
                    <hr />
                  </div>
                </div>

                <MTableToolbar {...props} />
              </div>
            )
          }}
          detailPanel={[
            {
              tooltip: "Show Module Grades",
              render: (rowData: any) => {
                return (
                  <div className="col-12">
                    <GradeSubTable
                      matricNo={rowData.matricNo}
                      tableID={rowData.tableData.id}
                      updateStudent={this.props.updateStudent}
                    />
                  </div>
                );
              }
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => {
            togglePanel!();
          }}
        />
      </div>
    );
  }
}
