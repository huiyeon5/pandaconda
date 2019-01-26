import React from "react";
import VisChartSidebarSelection from "./VisChartSidebarSelection";
import VisChartSidebarButton from "./VisChartSidebarButton";

export default class VisChartSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vis-display-sidebar vis-card-grid">
        <div className="vis-card-title">PARAMETERS</div>
        <div>
          <VisChartSidebarSelection
            selectionTitle="X-Axis: "
            headers={this.props.headers}
            update={this.props.updateSelectedXAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Y-Axis: "
            headers={this.props.headers}
            update={this.props.updateSelectedYAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Aggregate Method: "
            headers={["SUM", "AVG", "COUNT"]}
            update={this.props.updateSelectedAggregate}
          />
        </div>
        <VisChartSidebarButton onClick={this.props.runQuery}/>
      </div>
    );
  }
}
