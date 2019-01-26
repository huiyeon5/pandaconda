import React from "react";

export default class VisChartSidebarButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`
        }}
      >
        Run
      </button>
    );
  }
}
