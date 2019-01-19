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
      >
        Next
      </button>
    );
  }
}
