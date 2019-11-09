import React, { Component } from "react";

import MaterialTable from "material-table";

type StudentModuleMark = {
  matricNo: string;
  moduleGrade: string;
};

type AllModuleMarks = {
  moduleName: string;
  moduleData: StudentModuleMark[];
};

type Row = {
  moduleName: string;
  matricNo: string;
  moduleGrade: string;
};

type Props = {
  data: AllModuleMarks[];
};

const columns = [
  { title: "Course Code", field: "moduleName" },
  { title: "Matric No.", field: "matricNo" },
  { title: "Grade", field: "moduleGrade" }
];

function createData(moduleName: string, matricNo: string, moduleGrade: string) {
  return { moduleName, matricNo, moduleGrade };
}

class DatabaseTable extends Component<Props> {
  rows: Row[] = [];

  componentDidMount() {
    const tempRows = this.props.data.map((module: AllModuleMarks) => {
      const moduleName = module.moduleName;
      return module.moduleData.map((student: StudentModuleMark) => {
        return createData(moduleName, student.matricNo, student.moduleGrade);
      });
    });

    const allRows = tempRows.flat();
    this.rows = allRows;
  }

  render() {
    const tableOptions = {
      search: false
    };
    return (
      <div className="col-md-6 mx-md-auto">
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
