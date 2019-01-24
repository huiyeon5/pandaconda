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
        {console.log(this.props.plotlyType)}
        {this.props.plotlyType ? (
          this.props.xaxis && this.props.yaxis ? (
            <Visual
              plotlyType={this.props.plotlyType}
              x={this.props.xaxis}
              y={this.props.yaxis}
            />
          ) : null
        ) : null}
      </div>
    );
  }
}
