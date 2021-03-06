import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Plot from "react-plotly.js";

export default class VisRecAnalysisItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6 py-2">
        <div className="card h-100 text-center">
          <div className="card-header text-white font-weight-bold bg-warning" style={{fontSize: `20px`}}>
            Top {this.props.xTitle} by {this.props.yTitle} (Limit 10)
          </div>
          <div className="card-body" style= {{height: "400px"}}>
            <Plot 
              data={[{
                type: 'bar', 
                x: this.props.xAxis, 
                y: this.props.yAxis, 
                marker: { color: "#ff7f50" }
              }]} 
              layout={{
                xaxis: { type: "category", title: this.props.xTitle }, 
                yaxis: { title: this.props.yTitle },
                autosize: true,
              }}
              useResizeHandler= {true}
              style= {{width: "100%", height: "100%"}}
            />
          </div>
          <p className="card-text" style= {{height: "40px"}}>
            <small className="text-muted font-italic">
              Dataset Name  :  {this.props.selectedDataset}
            </small>
          </p>
        </div>
      </div>
    );
  }
}
