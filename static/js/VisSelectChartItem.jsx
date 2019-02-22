import React from "react";
import "../css/VisualisationPage";

export default class VisSelectChartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inputGroup">
        <input
          id={this.props.id}
          name="radio"
          type="radio"
          onChange={() =>
            this.props.selectChartTypeHandler({
              id: this.props.id,
              mode: this.props.mode,
              chartName: this.props.name,
            })
          }
        />
        <label htmlFor={this.props.id}>{this.props.name}</label>
      </div>
    );
  }
}
