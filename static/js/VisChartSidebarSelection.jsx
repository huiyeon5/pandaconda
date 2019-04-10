import React from "react";

class VisChartSidebarSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
    if(this.props.defaultValue) {
        return (
          <div>
            {this.props.selectionTitle}
            <select onChange={e => this.props.update(e.target.value)}>
              {this.props.dropdownValues.map(function(value, i) {
                if(value == self.props.defaultValue) {
                    return (
                        <option key={i} value={value} selected>
                            {value}
                        </option>
                    )
                } else {
                    return (
                      <option key={i} value={value}>
                        {value}
                      </option>
                    );
                }
              })}
            </select>
          </div>
        );
    } else {
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
}

export default VisChartSidebarSelection