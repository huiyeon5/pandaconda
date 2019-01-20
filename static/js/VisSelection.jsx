import React from "react";
import "../css/VisualisationPage";
import VisNavBackButton from "./VisNavBackButton";
import VisNavNextButton from "./VisNavNextButton";
import VisSelectDataset from "./VisSelectDataset";
import VisSelectChart from "./VisSelectChart";

export default class VisSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-select-container">
        <VisSelectDataset
          datasetItems={this.props.datasetItems}
          selectDatasetHandler={this.props.selectDatasetHandler}
        />
        <VisSelectChart
          chartTypes={this.props.chartTypes}
          selectChartTypeHandler={this.props.selectChartTypeHandler}
        />
        <VisNavBackButton handler={this.props.handler} />
        <VisNavNextButton handler={this.props.handler} />
      </div>
    );
  }
}
