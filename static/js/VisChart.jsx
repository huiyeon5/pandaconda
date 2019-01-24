import React from "react";
import "../css/VisualisationPage";
import VisNavBackButton from "./VisNavBackButton";
import VisNavNextButton from "./VisNavNextButton";
import VisChartSidebar from "./VisChartSidebar";
import VisChartDisplay from "./VisChartDisplay";

export default class VisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xaxis: null,
      yaxis: null
    };
    this.updateSelectedXAxis = this.updateSelectedXAxis.bind(this);
    this.updateSelectedYAxis = this.updateSelectedYAxis.bind(this);
  }

  updateSelectedXAxis(value) {
    this.setState({ xaxis: value });
  }

  updateSelectedYAxis(value) {
    this.setState({ yaxis: value });
  }

  render() {
    return (
      <div className="vis-display-container">
        <VisChartSidebar
          dataset={this.props.dataset}
          chart={this.props.chart}
          updateSelectedXAxis={this.updateSelectedXAxis}
          updateSelectedYAxis={this.updateSelectedYAxis}
        />
        <VisChartDisplay
          dataset={this.props.dataset}
          plotlyType={this.props.chart.id}
          chartTitle={this.props.chart.chartName}
          xaxis={this.state.xaxis}
          yaxis={this.state.yaxis}
        />
        <VisNavBackButton handler={this.props.handler} />
        <VisNavNextButton handler={this.props.handler} />
      </div>
    );
  }
}
