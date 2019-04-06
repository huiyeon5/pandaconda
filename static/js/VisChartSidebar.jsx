import React from "react";
import VisChartSidebarSelection from "./VisChartSidebarSelection";
import VisChartSidebarButton from "./VisChartSidebarButton";
import VisChartSidebarFilter from "./VisChartSidebarFilter";
import VisChartSidebarTopKToggle from "./VisChartSidebarTopKToggle";

export default class VisChartSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterChildren: [],
      xaxis: null,
      yaxis: null,
    };
    this.appendFilter = this.appendFilter.bind(this);
    this.updateSelectedXAxis = this.updateSelectedXAxis.bind(this);
    this.updateSelectedYAxis = this.updateSelectedYAxis.bind(this);
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

  removeAllFilters() {
    this.setState({ filterChildren: [] });
    this.props.removeFilterObjects();
  }

  updateSelectedXAxis(value) {
    this.setState({ xaxis: value });
  }

  updateSelectedYAxis(value) {
    this.setState({ yaxis: value });
  }

  render() {
    return (
      <div className="vis-display-sidebar vis-card-grid-config">
        <div className="vis-card-title">CONFIGURATION</div>
        <div>
          <VisChartSidebarSelection
            selectionTitle="X-Axis: "
            dropdownValues={this.props.headers}
            update={this.updateSelectedXAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Y-Axis: "
            dropdownValues={this.props.headers}
            update={this.updateSelectedYAxis}
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
          <VisChartSidebarTopKToggle
            topKTog={this.props.topKTog}
            plotlyType={this.props.plotlyType}
            toggleTopK={this.props.toggleTopK}
            updateTopKSort={this.props.updateTopKSort}
            updateTopKLimit={this.props.updateTopKLimit}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <button
              onClick={() => this.appendFilter()}
              style={{ margin: "25px", textAlign: "center", fontSize: "12px" }}
            >
              Add Filter
            </button>
            <button
              onClick={() => this.removeAllFilters()}
              style={{ margin: "25px", textAlign: "center", fontSize: "12px" }}
            >
              Remove All Filters
            </button>
          </div>
          {this.state.filterChildren.map(filterChild => filterChild)}
        </div>
        <VisChartSidebarButton onClick={() => this.props.runQuery(this.state.xaxis, this.state.yaxis)} />
      </div>
    );
  }
}
