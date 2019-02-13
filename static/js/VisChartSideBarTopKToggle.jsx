import React from "react";
import "../css/VisualisationPage";
import VisChartSidebarTopKFilter from "./VisChartSidebarTopKFilter";

export default class VisChartSidebarTopKToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.plotlyType === "bar") {
      console.log(this.props.topKTog);
      return (
        <div>
          <button
            onClick={() => this.props.toggleTopK()}
            style={{ margin: "25px" }}
          >
            Toggle Top-K
          </button>
          <VisChartSidebarTopKFilter
            topKTog={this.props.topKTog}
            updateTopKSort={this.props.updateTopKSort}
            updateTopKLimit={this.props.updateTopKLimit}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
