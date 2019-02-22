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
            marker: { color: "red" }
          }
          //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{
          xaxis: { 
              type: "category",
              title: this.props.xtitle
          },
          yaxis: {
            title: this.props.ytitle
          },
          width: 800,
          height: 500,
          title: "Visualisation"
        }}
      />
    );
  }
}

export default Visual;
