import React from "react";
import "../css/VisualisationPage";

export default class VisSaveButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        style={{width: `350px`, position:`absolute`, top:`95%`, left:`65%`, transform:`translate(-50%, -50%)`, display:`flex`, justifyContent:`center`, alignItems:`center`}}
        onClick={this.props.onClick}
      >
        Save Visualisation
      </button>
    );
  }
}
