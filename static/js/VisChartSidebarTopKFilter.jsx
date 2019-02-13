import React from "react";
import "../css/VisualisationPage";
import VisChartSidebarSelection from "./VisChartSidebarSelection";

export default class VisChartSidebarTopKFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.topKTog) {
      return (
        <div className="vis-select-filter-box">
          <VisChartSidebarSelection
            selectionTitle="Sort: "
            dropdownValues={["ascending", "descending"]}
            update={this.props.updateTopKSort}
          />
          <VisChartSidebarSelection
            selectionTitle="Limit: "
            dropdownValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            update={this.props.updateTopKLimit}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
