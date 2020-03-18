import React, { Component } from "react";
import Table from "./Table";
import { Options, Column } from "material-table";
import { convertAlphanumTo22pt } from "../../abstract_functions";

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
      // Custom Export Function for Module Data
      exportCsv: (columns: CustomColumn[], renderData: Row[]) => {
        interface courseObject {
          [courseName: string]: string;
        }
        interface allStudents {
          [matricNo: string]: courseObject;
        }

        const students: allStudents = {};
        const csvData: string[][] = [];

        const allCourses = Object.keys(columns[0].lookup!);
        const matricList: string[] = [];

        renderData.map(data => {
          if (!matricList.includes(data.matricNo)) {
            students[data.matricNo] = {};
            matricList.push(data.matricNo);
          }
          students[data.matricNo][data.courseCode] = data.alphanum;
        });

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
      },
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
        />
      </div>
    );
  }
}
export default DatabaseTable;
