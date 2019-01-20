import React from "react";
import "../css/VisualisationPage";
import VisSelectChartItem from "./VisSelectChartItem";

export default class VisSelectChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectChartTypeHandler = this.props.selectChartTypeHandler;
    const chartTypeComponents = this.props.chartTypes.map(function(chartType) {
      return (
        <VisSelectChartItem
          key={chartType.id}
          id={chartType.id}
          name={chartType.name}
          selectChartTypeHandler={selectChartTypeHandler}
        />
      );
    });

    return (
      <div className="vis-select-chart vis-card-grid">
        <div className="vis-card-title">Select Your Visualisation</div>
        <form className="form">{chartTypeComponents}</form>
      </div>
    );
  }
}
