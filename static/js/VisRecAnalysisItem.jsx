import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Plot from "react-plotly.js";

export default class VisRecAnalysisItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="col-sm-6 py-2">
        <div class="card h-100 text-center">
          <div class="card-header text-white font-weight-bold bg-warning" style={{fontSize: `20px`}}>Top {this.props.xTitle} by {this.props.yTitle} (Limit 10)</div>
          <div class="card-body">
            <Plot 
              data={[{type: 'bar', x: this.props.xAxis, y: this.props.yAxis, marker: { color: "orange" }}]} 
              layout={{
                xaxis: { type: "category", title: this.props.xTitle }, yaxis: { title: this.props.yTitle },
                width: 530, height: 400,
              }} 
            />
            <p class="card-text"><small class="text-muted font-italic">Dataset Name  :  {this.props.selectedDataset}</small></p>
          </div>
        </div>
      </div>
    );
  }
}
