import React from "react";
import MaterialTable, {
  MaterialTableProps,
  Column,
  MTablePagination
} from "material-table";
import Select from "react-select";

interface Props extends MaterialTableProps<Object> {
  handleRowData?: (rowData: Object) => Object;
}

export class Table extends React.Component<Props> {
  state = { pageSize: 10 };
  render() {
    const options = this.props.options!;
    if (this.props.handleRowData && options) {
      const handleRowData = this.props.handleRowData;
      options.rowStyle = (rowData: Object) => {
        let colCount = this.props.columns.length;
        this.props.columns.map((col: Column<Object>) => {
          if (col.hidden === true) {
            colCount -= 1;
          }
        });
        return colCount > 0 ? handleRowData(rowData) : {};
      };
    }
    const components = this.props.components ? this.props.components : {};
    components.Pagination = props => {
      const pageSizeOptions = [] as any[];
      const tableOptions = this.props.options!;
      tableOptions.pageSizeOptions!.map((option: number) => {
        pageSizeOptions.push({
          label: option,
          value: option.toString()
        });
      });
      pageSizeOptions.push({
        label: "All Rows",
        value: this.props.data.length.toString()
      });
      const currentPageSize = this.state.pageSize;
      var placeholder = "All Rows";
      if (tableOptions.pageSizeOptions!.includes(currentPageSize)) {
        placeholder = currentPageSize.toString() + " Row";
        if (currentPageSize !== 1) {
          placeholder += "s";
        }
      }
      return (
        <div className="justify-content-end d-flex">
          <div className="col-2 my-auto">
            <Select
              options={pageSizeOptions}
              value={this.state.pageSize}
              onChange={select => {
                props.onChangeRowsPerPage({
                  target: { value: select.value }
                });
                this.setState({ pageSize: parseInt(select.value) });
              }}
              placeholder={placeholder}
              className="multi-select"
              menuPlacement="top"
            />
          </div>
          <div>
            <MTablePagination {...props} />
          </div>
        </div>
      );
    };
    return (
      <MaterialTable
        {...this.props}
        columns={this.props.columns}
        options={options}
        components={components}
      />
    );
  }
}

export default Table;
