import React from "react";
import Visual from './Visual';

export default class VisChartDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-display-chart vis-card-grid">
        <div className="vis-card-title">
          {this.props.chart} ({this.props.dataset})
        </div>
        {this.props.chart ? this.props.x && this.props.y ? <Visual chartName={this.props.chart} x={this.props.x} y={this.props.y}/> : null : null}
      </div>
    );
  }
}