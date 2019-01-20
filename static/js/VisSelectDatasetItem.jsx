import React from "react";
import "../css/VisualisationPage";

export default class VisSelectDataSetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-card-item">
        <input id={this.props.id} name="radio" type="radio" />
        <label htmlFor={this.props.id}>{this.props.name} </label>
      </div>
    );
  }
}
