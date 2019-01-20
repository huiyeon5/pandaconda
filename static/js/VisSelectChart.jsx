import React from "react";
import "../css/VisualisationPage";

export default class VisSelectDataChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-select-chart vis-card-grid">
        <div className="vis-card-title">Select Your Visualisation</div>
        <div>Content</div>
      </div>
    );
  }
}
