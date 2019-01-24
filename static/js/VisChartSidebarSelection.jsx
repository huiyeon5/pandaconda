import React from "react";

export default class VisChartSidebarSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.selectionTitle}
        <select onChange={e => this.props.update(e.target.value)}>
          {this.props.headers.map(function(header, i) {
            return (
              <option key={i} value={header}>
                {header}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
