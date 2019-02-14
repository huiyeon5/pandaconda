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
          <option selected disabled hidden style={{ color: `gray` }}>
            {this.props.default}
          </option>
          {this.props.dropdownValues.map(function(value, i) {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
