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
        <div style={{display: `flex`, justifyContent: `center`}}>
          <button style={{marginLeft: `15px`, position:`absolute`, left:`0%`}} onClick={() => this.props.handler("selection")}>
            Back
          </button>
          <div style={{fontSize:`30px`, fontWeight:`900`, textShadow:`rgb(255, 127, 80) 0.5px 1px 0.5px`, textTransform:`uppercase`, color: `#ff7f50`}}>RECOMMENDED ANALYSIS</div>
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
