import React from "react";
import "../css/VisualisationPage";

export default class VisSelectRecItem extends React.Component {
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
          onChange={() => this.props.selectEntityHandler(this.props.entity, "top")}
        />
        <label htmlFor={this.props.id}>Top {this.props.entity} Analysis</label>
      </div>
    );
  }
}
