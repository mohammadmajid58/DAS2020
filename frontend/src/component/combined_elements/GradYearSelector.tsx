import React, { Component } from "react";
import Select from "react-select";
import { Button } from "@material-ui/core";
import API_URL from "../..";
import Axios from "axios";
import "./GradYearSelector.css";

type Props = {
  getSelectedYears: (selectedYears: string[]) => void;
};

export default class GradYearSelector extends Component<Props> {
  state = {
    allGradYears: [] as any[],
    selectedOption: null,
    yearsToGet: []
  };

  componentDidMount() {
    if (this.state.allGradYears.length === 0) {
      Axios.get(API_URL + "/api/get_grad_years/").then(r => {
        const gradYears = r.data.map((year: string) => {
          return { value: year, label: year };
        });
        gradYears.push({ value: "all", label: "All Years" });
        this.setState({ allGradYears: gradYears });
      });
    }
  }

  handleChange = (selectedOption: any) => {
    const result = selectedOption.map((option: any) => option.value);
    if (result.indexOf("all") >= 0) {
      var yearsToGet = [];
      if (result.indexOf("all") === 0) {
        yearsToGet.push(result.pop());
      }
      const newOption = selectedOption.pop();
      this.setState({
        selectedOption: newOption,
        yearsToGet: yearsToGet
      });
    } else if (selectedOption) {
      this.setState({
        selectedOption: selectedOption,
        yearsToGet: result
      });
    }
  };

  getStudentsHandler = () => {
    this.props.getSelectedYears(this.state.yearsToGet);
  };

  render() {
    return (
      <div>
        <Select
          options={this.state.allGradYears}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          isMulti
          className="multi-select mx-auto col-md-6 col-lg-5"
          classNamePrefix="select"
          placeholder="Select Academic Year(s)..."
        />
        <Button
          variant="contained"
          color="primary"
          className="mt-2"
          size="small"
          onClick={this.getStudentsHandler}
        >
          Get Students
        </Button>
      </div>
    );
  }
}
