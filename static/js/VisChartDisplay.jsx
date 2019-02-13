import React from "react";
import Visual from "./Visual";

export default class VisChartDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-display-chart vis-card-grid">
        <div className="vis-card-title">
          {this.props.chartTitle} ({this.props.dataset})
        </div>
        {this.props.plotlyType ? (
          this.props.data ? (
            <Visual
              plotlyType={this.props.plotlyType}
              x={this.props.data.xaxis}
              y={this.props.data.yaxis}
            />
          ) : null
        ) : null}
      </div>
    );
  }
}
