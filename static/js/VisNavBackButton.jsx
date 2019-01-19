import React from "react";
import "../css/VisualisationPage";

export default class VisNavBackButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="back vis-back"
        onClick={() => this.props.handler("selection")}
      >
        Back
      </button>
    );
  }
}
