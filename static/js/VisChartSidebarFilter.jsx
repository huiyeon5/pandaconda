import React from "react";
import "../css/VisualisationPage";
import VisChartSidebarSelection from "./VisChartSidebarSelection";

export default class VisChartSidebarFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      condition: null,
      value: null
    };
    this.updateColumn = this.updateColumn.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidUpdate() {
    console.log(
      "update filter: ",
      this.state.column && this.state.condition && this.state.value
    );
    if (this.state.column && this.state.condition && this.state.value) {
      this.props.updateSelectedFilter(this.state);
    }
  }

  updateColumn(value) {
    this.setState({ column: value });
  }

  updateCondition(value) {
    this.setState({ condition: value });
  }

  updateValue(value) {
    this.setState({ value: value });
  }

  render() {
    return (
      <div className="vis-select-filter-box">
        <VisChartSidebarSelection
          selectionTitle="Column: "
          dropdownValues={this.props.columns}
          update={this.updateColumn}
        />
        <VisChartSidebarSelection
          selectionTitle="Condition: "
          dropdownValues={["=", ">", "<"]}
          update={this.updateCondition}
        />
        <VisChartSidebarSelection
          selectionTitle="Value: "
          dropdownValues={["a", "b", "c"]}
          update={this.updateValue}
        />
      </div>
    );
  }
}