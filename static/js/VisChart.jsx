import React from "react";
import "../css/VisualisationPage";
import VisNavBackButton from "./VisNavBackButton";
import VisNavNextButton from "./VisNavNextButton";
import VisChartSidebar from "./VisChartSidebar";
import VisChartDisplay from "./VisChartDisplay";

export default class VisChart extends React.Component {
  constructor(props) {
    super(props);
  }

  // HERE HAVE THE FUNCTION TO UPDATE STATE WHICH IS THE SELECTED DATASET, selected Chart,

  render() {
    return (
      <div className="vis-display-container">
        <VisChartSidebar
          dataset={this.props.dataset}
          chart={this.props.chart}
        />
        <VisChartDisplay
          dataset={this.props.dataset}
          chart={this.props.chart}
        />
        <VisNavBackButton handler={this.props.handler} />
        <VisNavNextButton handler={this.props.handler} />
      </div>
    );
  }
}
