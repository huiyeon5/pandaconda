import React from "react";
import VisChartSidebarSelection from "./VisChartSidebarSelection";
import VisChartSidebarButton from "./VisChartSidebarButton";
import VisChartSidebarFilter from "./VisChartSidebarFilter";

export default class VisChartSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterChildren: []
    };
    this.appendFilter = this.appendFilter.bind(this);
  }

  appendFilter() {
    this.props.addFilterObject();
    this.setState((prevState, props) => ({
      filterChildren: [
        ...prevState.filterChildren,
        <VisChartSidebarFilter
          columns={this.props.headers}
          //   updateSelectedFilter={this.props.updateSelectedFilter}
          updateSpecificFilterObject={this.props.updateSpecificFilterObject}
          key={prevState.filterChildren.length}
          filterIndex={prevState.filterChildren.length}
        //   filterValueSelection={this.props.filterValueSelection}
         uniqueValues={this.props.uniqueValues}
        />
      ]
    }));
  }

  render() {
    return (
      <div className="vis-display-sidebar vis-card-grid-config">
        <div className="vis-card-title">CONFIGURATION</div>
        <div>
          <VisChartSidebarSelection
            selectionTitle="X-Axis: "
            dropdownValues={this.props.headers}
            update={this.props.updateSelectedXAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Y-Axis: "
            dropdownValues={this.props.headers}
            update={this.props.updateSelectedYAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Aggregate Method: "
            dropdownValues={["SUM", "AVG", "COUNT"]}
            update={this.props.updateSelectedAggregate}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <button
            onClick={() => this.appendFilter()}
            style={{ margin: "25px" }}
          >
            Add Filter
          </button>
          {this.state.filterChildren.map(filterChild => filterChild)}
        </div>
        <VisChartSidebarButton onClick={this.props.runQuery} />
      </div>
    );
  }
}
