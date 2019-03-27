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
        onClick={() => this.props.handler(this.props.selectedNextPage)}
        disabled={(this.props.selectedDataset && this.props.selectedNextPage &&
          (this.props.selectedChartType || ( this.props.selectedAnalysis && this.props.selectedEntity && this.props.selectedEntityVariableData))) ? false : true }
      >
        Next
      </button>
    );
  }
}
