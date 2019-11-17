import React from "react";
import MaterialTable, { MaterialTableProps } from "material-table";

export class Table extends React.Component<MaterialTableProps<Object>> {
  render() {
    return <MaterialTable {...this.props} />;
  }
}

export default Table;
