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

//   componentDidUpdate() {
//     console.log(`Column: ${this.state.column} condition: ${this.state.condition} value: ${this.state.value}`)
//     if (this.state.column && this.state.condition && this.state.value) {
//       this.props.updateSelectedFilter(this.state);
//     }
//   }

  updateColumn(value) {
    this.props.updateSpecificFilterObject(this.props.filterIndex, "column", value)
  }

  updateCondition(value) {
    this.props.updateSpecificFilterObject(this.props.filterIndex, "condition", value)
  }

  updateValue(value) {
    this.props.updateSpecificFilterObject(this.props.filterIndex, "value", value)
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
