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
          datasetNames={this.props.datasetNames}
          selectDatasetHandler={this.props.selectDatasetHandler}
        />
        <VisSelectChart
          chartTypes={this.props.chartTypes}
          selectChartTypeHandler={this.props.selectChartTypeHandler}
          selectedDatasetEntities={this.props.selectedDatasetEntities}
          selectEntityHandler={this.props.selectEntityHandler}
        />
        <VisNavNextButton 
          handler={this.props.handler} 
          selectedDataset={this.props.selectedDataset}
          selectedChartType={this.props.selectedChartType}
          selectedAnalysis={this.props.selectedAnalysis}
          selectedEntity={this.props.selectedEntity}
          selectedEntityVariableData={this.props.selectedEntityVariableData}
          selectedNextPage={this.props.selectedNextPage}
        />
      </div>
    );
  }
}
