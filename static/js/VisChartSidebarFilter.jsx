import React from "react";
import "../css/VisualisationPage";
import VisChartSidebarSelection from "./VisChartSidebarSelection";

export default class VisChartSidebarFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      condition: null,
      value: null,
      filterValues: null
    };
    this.updateColumn = this.updateColumn.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateFilterValues = this.updateFilterValues.bind(this);
  }

  //   componentDidUpdate() {
  //     console.log(`Column: ${this.state.column} condition: ${this.state.condition} value: ${this.state.value}`)
  //     if (this.state.column && this.state.condition && this.state.value) {
  //       this.props.updateSelectedFilter(this.state);
  //     }
  //   }

  updateColumn(value) {
    this.props.updateSpecificFilterObject(
      this.props.filterIndex,
      "column",
      value
    );
    this.setState({column: value})
  }

  updateCondition(value) {
    this.props.updateSpecificFilterObject(
      this.props.filterIndex,
      "condition",
      value
    );
    this.setState({condition: value})
  }

  updateValue(value) {
    this.props.updateSpecificFilterObject(
      this.props.filterIndex,
      "value",
      value
    );
    this.setState({value: value})
  }

  updateFilterValues(value) {
    this.setState({ filterValues: value });
  }

  render() {
    return (
      <div className="vis-select-filter-box">
        <VisChartSidebarSelection
          selectionTitle="Column: "
          dropdownValues={this.props.columns}
          update={this.updateColumn}
          defaultValue={this.props.prevFilter ? this.props.prevFilter['column'] : null}
          />
        <VisChartSidebarSelection
          selectionTitle="Condition: "
          dropdownValues={["=", ">", "<", ">=", "<="]}
          update={this.updateCondition}
          defaultValue={this.props.prevFilter ? this.props.prevFilter['condition'] : null}
          />
        <VisChartSidebarSelection
          selectionTitle="Value: "
          dropdownValues={this.state.column ? this.props.uniqueValues[this.state.column] : []}
          update={this.updateValue}
          defaultValue={this.props.prevFilter ? this.props.prevFilter['value'] : null}
        />
      </div>
    );
  }
}
