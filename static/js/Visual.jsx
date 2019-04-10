import React from "react";
import Plot from "react-plotly.js";

class Visual extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            x: this.props.x,
            y: this.props.y,
            mode: this.props.mode,
            type: this.props.plotlyType,
            // mode: "lines+markers",
            marker: { color: "#ff7f50" }
          }
          //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{
          xaxis: { 
              type: "category",
              title: (this.props.xtitle != "ActivityDate") ? this.props.xtitle : null
          },
          yaxis: {
            title: this.props.aggregate + "(" + this.props.ytitle + ")"
          },
          title: "Visualisation of " + this.props.aggregate + "(" +this.props.ytitle + ") by " + this.props.xtitle,
          autosize: true,
        }}
        useResizeHandler= {true}
        style= {{width: "100%", height: "100%"}}
      />
    );
  }
}

export default Visual;
