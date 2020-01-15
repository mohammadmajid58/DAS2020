import React from "react";
import GetModuleMarkUnit from "../component/combined_elements/GetModuleMarkUnit";
import GetFinalDataUnit from "../component/combined_elements/GetFinalDataUnit";
import Toggle from "../component/buttons/Toggle";
import StudentModuleMarkDropZone from "../component/upload_csv_files/StudentModuleMarkDropZone/StudentModuleMarkDropZone";

interface myState {
  showStudentModule: boolean;
}
class ViewAllData extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props);

    this.state = { showStudentModule: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    const result = !this.state.showStudentModule;
    this.setState({ showStudentModule: result });
  };

  render() {
    const { showStudentModule } = this.state;
    const textCaption = showStudentModule
      ? "Get Student Module Grades"
      : "Get Student Final Grades";
    return (
      <div className="d-flex-inline">
        <div className="d-flex justify-content-center">
          <StudentModuleMarkDropZone />
        </div>
        <div className="mt-2 custom">
          <Toggle textCaption={textCaption} onClick={this.onClick} />
          <div className="mt-2"></div>
          {this.state.showStudentModule ? <GetFinalDataUnit /> : null}
          {!this.state.showStudentModule ? <GetModuleMarkUnit /> : null}
        </div>
      </div>
    );
  }
}

export default ViewAllData;
