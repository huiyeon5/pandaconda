import React from "react";
import "../css/VisualisationPage";

export default class VisNavNextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="next vis-next"
        onClick={() => this.props.handler("chart")}
        disabled={(this.props.selectedDataset && this.props.selectedChartType) ? false : true }
      >
        Next
      </button>
    );
  }
}
