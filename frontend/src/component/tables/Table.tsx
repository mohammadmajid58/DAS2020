import React from "react";
import MaterialTable, { MaterialTableProps } from "material-table";

interface Props extends MaterialTableProps<Object> {
  handleRowData?: (rowData: Object) => Object;
  handleHiddenColumns?: (columns: any) => Object;
}

export class Table extends React.Component<Props> {
  render() {
    let columns: any = this.props.columns;
    if (this.props.handleHiddenColumns) {
      const handleHiddenColumns = this.props.handleHiddenColumns;
      columns = handleHiddenColumns(columns);
    }

    const options = this.props.options;
    if (this.props.handleRowData && options) {
      const handleRowData = this.props.handleRowData;
      options.rowStyle = (rowData: Object) => {
        return handleRowData(rowData);
      };
    }
    return (
      <MaterialTable {...this.props} columns={columns} options={options} />
    );
  }
}

export default Table;
