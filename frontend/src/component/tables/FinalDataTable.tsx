import React, { Component } from "react";
import Table from "./Table";
import { MTableToolbar, Column, Options } from "material-table";
import Axios from "axios";
import API_URL from "../../index";
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import GradeSubTable from "./GradeSubTable";
import GradYearSelector from "../combined_elements/GradYearSelector";

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
  columnsToHide?: string[];
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
  { title: "Grad Year", field: "gradYear", editable: "never", lookup: {} },
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
    editable: "never"
  },
  {
    title: "Final Degree GPA (3 d.p)",
    field: "finalAward3",
    lookup: {},
    editable: "never"
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

const handleCustomCsvExport = (columns: CustomColumn[], renderData: Row[]) => {
  interface Student {
    [studentID: string]: { name: string; degreeHonor: string };
  }
  interface AcadPlan {
    [plan: string]: string[];
  }

  const allPlans: AcadPlan = {};
  const planList: string[] = [];

  renderData.map(row => {
    if (!planList.includes(row.academicPlan)) {
      allPlans[row.academicPlan] = [];
      planList.push(row.academicPlan);
    }

    allPlans[row.academicPlan].push(
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
  });

  const csvData: string[] = [];

  planList.map(plan => {
    let csvString = "StudentID,Name,Acad Plan,Degree Honors\n";
    allPlans[plan].map(row => {
      csvString += row;
      csvString += "\n";
    });

    csvData.push(csvString);
  });

  downloadCSV(planList, csvData);
};

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
  state = { mcExport: false };

  handleMCExportChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    this.setState({ mcExport: checked });
  }

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
    const title = "Final Award Data";

    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 20, this.props.data.length],
      exportButton: true,
      exportAllData: true,
      exportFileName: "Final_Award_Data",
      emptyRowsWhenPaging: false,
      detailPanelType: "single",
      defaultExpanded: true
    };
    if (this.state.mcExport === true) {
      tableOptions.exportCsv = handleCustomCsvExport;
    }

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
          handleHiddenColumns={this.handleHiddenColumns}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div>
                  <FormGroup row className="pr-3">
                    <GradYearSelector
                      getSelectedYears={this.props.getSelectedYears}
                    />
                    <FormControlLabel
                      className="ml-auto"
                      control={
                        <Checkbox
                          onChange={this.handleMCExportChange.bind(this)}
                          value="EnableMCExport"
                          checked={this.state.mcExport}
                        />
                      }
                      label="Enable MyCampus Export"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </div>
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
