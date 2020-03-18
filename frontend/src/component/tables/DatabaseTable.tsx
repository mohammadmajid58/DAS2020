import React, { Component } from "react";
import Table from "./Table";
import { Options, Column, MTableToolbar } from "material-table";
import { convertAlphanumTo22pt } from "../../abstract_functions";
import { FormControlLabel, Checkbox, FormGroup } from "@material-ui/core";

type Row = {
  courseCode: string;
  matricNo: string;
  alphanum: string;
  twentyTwoPoint: string;
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
  { title: "Alphanumeric Grade", field: "alphanum", lookup: {} },
  { title: "22pt Grade", field: "twentyTwoPoint", lookup: {} }
];

const anonDownloadCsv = (csvData: string[][]) => {
  let csvString = "";
  csvData.map(row => {
    csvString += row.join(",");
    csvString += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
  hiddenElement.target = "_blank";
  hiddenElement.download = "all_module_data_ANON.csv";
  hiddenElement.click();
};

class DatabaseTable extends Component<Props> {
  rows: Row[] = [];
  title: string = "All Module Grade Data";
  state = { anonymizeData: false };

  handleAnonymizeDataChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    this.setState({ anonymizeData: checked });
  }

  handleRowData(rowData: any) {
    const gradesToHighlight = ["MV", "CW", "CR", "NA"];

    if (gradesToHighlight.includes(rowData.alphanum)) {
      return { backgroundColor: "pink" };
    }
    return {};
  }

  render() {
    const tableOptions: Options = {
      search: false,
      filtering: true,
      pageSize: 10,
      exportButton: true,
      exportAllData: true,
      emptyRowsWhenPaging: false,
      // Custom Export Function for Module Data
      exportCsv: (columns: CustomColumn[], renderData: Row[]) => {
        interface courseObject {
          [courseName: string]: string;
        }
        interface allStudents {
          [matricNo: string]: courseObject;
        }

        if (renderData.length === 0) {
          alert(
            "No Data to Export. Make sure there is at least 1 row visible in the table."
          );
          return;
        }

        const students: allStudents = {};
        const csvData: string[][] = [];
        const anonCsvData: string[][] = [];
        let anonCount = 1;

        const allCourses = Object.keys(columns[0].lookup!);
        const matricList: string[] = [];

        renderData.map(data => {
          if (!matricList.includes(data.matricNo)) {
            students[data.matricNo] = {};
            matricList.push(data.matricNo);
          }
          students[data.matricNo][data.courseCode] = data.alphanum;
        });

        if (this.state.anonymizeData) {
          csvData.push(["ANON Name", "Student", ...allCourses]);
          anonCsvData.push(["ANON Name", ...allCourses]);
          matricList.map(student => {
            const row = [anonCount.toString(), student];
            const anonRow = [anonCount.toString()];
            anonCount += 1;
            allCourses.map(course => {
              const studentCourseList = Object.keys(students[student]);
              if (studentCourseList.includes(course)) {
                row.push(students[student][course]);
                anonRow.push(students[student][course]);
              } else {
                row.push("N/A");
                anonRow.push("N/A");
              }
            });
            csvData.push(row);
            anonCsvData.push(anonRow);
          });
        } else {
          csvData.push(["Student", ...allCourses]);
          matricList.map(student => {
            const row = [student];
            allCourses.map(course => {
              const studentCourseList = Object.keys(students[student]);
              if (studentCourseList.includes(course)) {
                row.push(students[student][course]);
              } else {
                row.push("N/A");
              }
            });
            csvData.push(row);
          });
        }

        let csvString = "";
        csvData.map(row => {
          csvString += row.join(",");
          csvString += "\n";
        });

        var hiddenElement = document.createElement("a");
        hiddenElement.href =
          "data:text/csv;charset=utf-8," + encodeURI(csvString);
        hiddenElement.target = "_blank";
        hiddenElement.download = "all_module_data.csv";
        hiddenElement.click();

        if (this.state.anonymizeData) {
          setTimeout(anonDownloadCsv, 300, anonCsvData);
        }
      },
      exportFileName: "Module Grades",
      pageSizeOptions: [5, 10, 20, 50, 100]
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
      } else if (col.field === "twentyTwoPoint") {
        gradeData.forEach((grade: string) => {
          const twentyTwoPoint = convertAlphanumTo22pt(grade);
          col.lookup![twentyTwoPoint] = twentyTwoPoint;
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
          handleRowData={this.handleRowData}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div>
                  <FormGroup row className="pr-3">
                    <FormControlLabel
                      className="ml-auto"
                      control={
                        <Checkbox
                          onChange={this.handleAnonymizeDataChange.bind(this)}
                          value="AnonymizeData"
                          checked={this.state.anonymizeData}
                        />
                      }
                      label="Anonymized Output"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </div>
              </div>
            )
          }}
        />
      </div>
    );
  }
}
export default DatabaseTable;
