import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Plot from "react-plotly.js";
import VisRecAnalysisItem from "./VisRecAnalysisItem";
import VisNavBackButton from "./VisNavBackButton";

export default class VisRecAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("In VisRecAnalysis")
    let headers = this.props.selectedEntityVariableData["headers"];
    let values = this.props.selectedEntityVariableData["values"];
    let visRecAnalysisComponents = [];
    // console.log(headers)
    // console.log(values)
    for(let i = 0; i < headers.length; i++) {
      let variable = headers[i];
      let data = values[variable];
      // console.log(variable)
      // console.log(data)
      visRecAnalysisComponents.push(
        <VisRecAnalysisItem 
          selectedDataset={this.props.selectedDataset}
          xAxis={data["xaxis"]}
          yAxis={data["yaxis"]}
          xTitle={this.props.selectedEntity}
          yTitle={variable}
        />
      )
    }
    console.log(visRecAnalysisComponents)
    return (
      <div style={{display: `flex`, flexDirection:`column`}}>
        <div style={{display: `flex`, justifyContent: `flex-start`}}>
          <button style={{marginLeft: `15px`}} onClick={() => this.props.handler("selection")}>
            Back
          </button>
          <div style={{marginLeft: `370px`, fontSize: `25px`, fontWeight: `bolder`, color: `#ff7f50`}}>RECOMMENDED ANALYSIS</div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {visRecAnalysisComponents.map(component => component)}
          </div>
        </div>
      </div>
    );
  }
}
