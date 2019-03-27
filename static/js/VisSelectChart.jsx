import React from "react";
import "../css/VisualisationPage";
import VisSelectChartItem from "./VisSelectChartItem";
import VisSelectRecItem from "./VisSelectRecItem";
import VisChartSidebarSelection from "./VisChartSidebarSelection";

export default class VisSelectChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analysisType: "",
      data: []
    };
    
    this.updateAnalysisType = this.updateAnalysisType.bind(this);
  }

  updateAnalysisType(value) {
    this.props.selectChartTypeHandler(null);
    this.props.selectEntityHandler(null, null);
    console.log("value: " + value);
    this.setState({ analysisType: value });
  }

  render() {
    /* Select Chart */
    const selectChartTypeHandler = this.props.selectChartTypeHandler;
    let chartTypeComponents = undefined
    if (this.state.analysisType === "Customised Visualisation") {
      chartTypeComponents = this.props.chartTypes.map(function(chartType) {
        return (
          <VisSelectChartItem
            key={chartType.id}
            id={chartType.id}
            mode={chartType.mode}
            name={chartType.name}
            selectChartTypeHandler={selectChartTypeHandler}
          />
        );
      });
    }

    /* Select entity */
    const selectEntityHandler = this.props.selectEntityHandler
    let prebuiltAnalysisComponents = undefined
    if (this.state.analysisType === "Reccommended Analysis") {
      console.log(this.props.selectedDatasetEntities)
      prebuiltAnalysisComponents = this.props.selectedDatasetEntities.map(function(entity, i) {
        i = i + 10000;
        return (
          <VisSelectRecItem
            key={i}
            id={i}
            entity={entity}
            selectEntityHandler={selectEntityHandler}
          />
        );
      });
    }

    return (
      <div className="vis-select-chart vis-card-grid" style={{ display: "grid", gridTemplateRows: "80px auto 1fr" }}>
        <div className="vis-card-title">
          Select Your Visualisation
        </div>
        <div style={{ width: `100%`, display: `flex`, justifyContent: `center` }}>
          <VisChartSidebarSelection
              selectionTitle="Please choose the analysis you want to perform: "
              dropdownValues={["Customised Visualisation", "Reccommended Analysis"]}
              default="-"
              update={this.updateAnalysisType}
          />
        </div>

        <form className="form" style={{display: `flex`, flexDirection: `column`}}>
          {
            (this.state.analysisType === "" || 
            this.state.analysisType == "Customised Visualisation") ? 
            chartTypeComponents : prebuiltAnalysisComponents
          }
        </form>
      </div>
    );
  }
}
